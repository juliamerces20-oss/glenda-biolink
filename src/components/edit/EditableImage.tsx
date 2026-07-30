import {
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEditMode } from "@/hooks/use-edit-mode";
import type { EditableKey } from "@/lib/edit-content";
import { cn } from "@/lib/utils";

export function EditableImage({
  contentKey,
  defaultSrc,
  alt,
  className,
  imgClassName = "w-full h-full object-cover",
  imgStyle,
  placeholder,
}: {
  contentKey: EditableKey;
  defaultSrc?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  imgStyle?: CSSProperties;
  placeholder?: ReactNode;
}) {
  const { isEditMode, content, uploadImage } = useEditMode();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const src = content[contentKey] ?? defaultSrc;

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    try {
      await uploadImage(contentKey, file);
      toast.success("Foto atualizada.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao enviar a foto.",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {src ? (
        <img src={src} alt={alt} className={imgClassName} style={imgStyle} />
      ) : (
        placeholder
      )}
      {isEditMode && (
        <>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            aria-label="Trocar foto"
            className="absolute inset-0 z-20 hidden items-center justify-center bg-black/0 text-transparent transition-colors hover:bg-black/55 hover:text-white focus-visible:bg-black/55 focus-visible:text-white lg:flex"
          >
            <span className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-wide">
              {uploading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Camera size={16} />
              )}
              {uploading ? "Enviando…" : "Trocar foto"}
            </span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
}
