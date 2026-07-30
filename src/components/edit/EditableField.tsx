import { useState, type ReactNode } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { useEditMode } from "@/hooks/use-edit-mode";
import type { EditableKey } from "@/lib/edit-content";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function EditableField({
  contentKey,
  defaultValue,
  label,
  multiline,
  children,
}: {
  contentKey: EditableKey;
  defaultValue: string;
  label: string;
  multiline?: boolean;
  children: ReactNode;
}) {
  const { isEditMode, content, saveField } = useEditMode();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(content[contentKey] ?? defaultValue);
  const [saving, setSaving] = useState(false);

  if (!isEditMode) return <>{children}</>;

  async function handleSave() {
    setSaving(true);
    try {
      await saveField(contentKey, value);
      toast.success("Alteração salva.");
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  const InputTag = multiline ? "textarea" : "input";

  return (
    <div className="relative">
      {children}
      <Popover
        open={open}
        onOpenChange={(next) => {
          if (next) setValue(content[contentKey] ?? defaultValue);
          setOpen(next);
        }}
      >
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={`Editar ${label}`}
            className="absolute -top-2 -right-2 z-20 hidden h-7 w-7 items-center justify-center rounded-full bg-white text-neutral-900 shadow-md ring-1 ring-black/10 transition-transform hover:scale-105 lg:flex"
          >
            <Pencil size={13} />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="z-50 w-80"
          onClick={(event) => event.stopPropagation()}
          onOpenAutoFocus={(event) => event.stopPropagation()}
        >
          <p className="mb-2 text-xs font-medium text-neutral-700">{label}</p>
          <InputTag
            className="w-full rounded border border-neutral-300 px-2 py-1.5 text-sm outline-none focus:border-neutral-500"
            value={value}
            rows={multiline ? 3 : undefined}
            onChange={(event) => setValue(event.target.value)}
          />
          <div className="mt-3 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Salvando…" : "Salvar"}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
