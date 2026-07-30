import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useEditMode } from "@/hooks/use-edit-mode";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function PasswordModal() {
  const { isPasswordModalOpen, closePasswordModal, login } = useEditMode();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await login(password);
    setSubmitting(false);

    if (!result.success) {
      setError(result.error ?? "Senha incorreta.");
      return;
    }

    setPassword("");
    toast.success("Modo de edição ativado.");
  }

  return (
    <Dialog
      open={isPasswordModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          setPassword("");
          setError(null);
          closePasswordModal();
        }
      }}
    >
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Entrar no modo de edição</DialogTitle>
          <DialogDescription>
            Digite a senha para editar os links e fotos da página.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Senha"
            className="rounded border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <Button type="submit" disabled={submitting || !password}>
            {submitting ? "Entrando…" : "Entrar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
