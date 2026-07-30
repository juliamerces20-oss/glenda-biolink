import { useEditMode } from "@/hooks/use-edit-mode";

export function ExitEditBanner() {
  const { isEditMode, exitEditMode } = useEditMode();

  if (!isEditMode) return null;

  return (
    <div className="hidden lg:flex fixed top-0 left-0 right-0 z-40 items-center justify-center gap-4 bg-neutral-900 px-4 py-2 text-white">
      <span className="text-xs tracking-[0.08em] uppercase">
        Modo de edição ativo
      </span>
      <button
        type="button"
        onClick={exitEditMode}
        className="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-900 transition-transform hover:scale-105"
      >
        Sair do modo de edição
      </button>
    </div>
  );
}
