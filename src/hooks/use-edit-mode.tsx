import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { EditableContent, EditableKey } from "@/lib/edit-content";

const TOKEN_STORAGE_KEY = "biolink_edit_token";

class SessionExpiredError extends Error {
  constructor() {
    super("Sessão expirada. Faça login novamente.");
  }
}

type EditModeContextValue = {
  content: EditableContent;
  isEditMode: boolean;
  isPasswordModalOpen: boolean;
  openPasswordModal: () => void;
  closePasswordModal: () => void;
  login: (password: string) => Promise<{ success: boolean; error?: string }>;
  exitEditMode: () => void;
  saveField: (key: EditableKey, value: string) => Promise<void>;
  uploadImage: (key: EditableKey, file: File) => Promise<void>;
};

const EditModeContext = createContext<EditModeContextValue | null>(null);

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<EditableContent>({});
  const [token, setToken] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    setToken(sessionStorage.getItem(TOKEN_STORAGE_KEY));
  }, []);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => (res.ok ? res.json() : {}))
      .then((data: EditableContent) => setContent(data))
      .catch(() => {});
  }, []);

  const exitEditMode = useCallback(() => {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
  }, []);

  const login = useCallback(async (password: string) => {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      return { success: false, error: data?.error ?? "Senha incorreta." };
    }

    const data = (await response.json()) as { token: string };
    sessionStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    setToken(data.token);
    setIsPasswordModalOpen(false);
    return { success: true };
  }, []);

  const saveField = useCallback(
    async (key: EditableKey, value: string) => {
      if (!token) throw new SessionExpiredError();

      const response = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "x-edit-token": token,
        },
        body: JSON.stringify({ key, value }),
      });

      if (response.status === 401) {
        exitEditMode();
        throw new SessionExpiredError();
      }

      if (!response.ok) {
        throw new Error("Não foi possível salvar. Tente novamente.");
      }

      const data = (await response.json()) as EditableContent;
      setContent(data);
    },
    [token, exitEditMode],
  );

  const uploadImage = useCallback(
    async (key: EditableKey, file: File) => {
      if (!token) throw new SessionExpiredError();

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-edit-token": token },
        body: formData,
      });

      if (response.status === 401) {
        exitEditMode();
        throw new SessionExpiredError();
      }

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Não foi possível enviar a imagem.");
      }

      const data = (await response.json()) as { url: string };
      await saveField(key, data.url);
    },
    [token, exitEditMode, saveField],
  );

  const value: EditModeContextValue = {
    content,
    isEditMode: token !== null,
    isPasswordModalOpen,
    openPasswordModal: () => setIsPasswordModalOpen(true),
    closePasswordModal: () => setIsPasswordModalOpen(false),
    login,
    exitEditMode,
    saveField,
    uploadImage,
  };

  return (
    <EditModeContext.Provider value={value}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error("useEditMode must be used within an EditModeProvider");
  }
  return context;
}
