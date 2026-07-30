import { Lock } from "lucide-react";
import { useEditMode } from "@/hooks/use-edit-mode";

export function LockButton() {
  const { isEditMode, openPasswordModal } = useEditMode();

  if (isEditMode) return null;

  return (
    <button
      type="button"
      onClick={openPasswordModal}
      aria-label="Entrar no modo de edição"
      className="hidden lg:flex fixed top-4 right-4 z-40 h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-700 shadow-md ring-1 ring-black/10 transition-transform hover:scale-105"
    >
      <Lock size={16} />
    </button>
  );
}
