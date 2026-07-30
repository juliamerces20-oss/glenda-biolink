import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AGENDA_LINK_PLACEHOLDER, buildWhatsAppUrl } from "@/lib/contact-links";
import { useEditMode } from "@/hooks/use-edit-mode";
import { EditableField } from "@/components/edit/EditableField";

export const Route = createFileRoute("/consultoria")({
  component: ConsultoriaPage,
});

const fieldClassName =
  "rounded-[14px] border border-neutral-300 bg-white px-4 py-3 text-[16px] text-neutral-900 outline-none focus:border-[color:var(--brand-orange)] transition-colors";
const labelClassName =
  "text-[10px] tracking-[0.18em] uppercase text-neutral-600";

function ConsultoriaPage() {
  const { content, isEditMode } = useEditMode();
  const [nome, setNome] = useState("");
  const [instagram, setInstagram] = useState("");
  const [desafio, setDesafio] = useState("");
  const [objetivo, setObjetivo] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = `Nome: ${nome} / Instagram: ${instagram} / Desafio: ${desafio} / Objetivo: ${objetivo}`;
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");

    window.location.href = content.calendarLink ?? AGENDA_LINK_PLACEHOLDER;
  }

  return (
    <main className="relative min-h-screen bg-[color:var(--brand-cream)] flex justify-center overflow-hidden">
      <div className="w-full max-w-[480px] relative px-6 pt-6 pb-10">
        <Link
          to="/"
          className="inline-block text-[10px] tracking-[0.2em] uppercase text-neutral-600 hover:text-[color:var(--brand-red)] transition-colors"
        >
          ← Voltar
        </Link>

        {isEditMode && (
          <EditableField
            contentKey="calendarLink"
            defaultValue={AGENDA_LINK_PLACEHOLDER}
            label="Link da agenda (Google Calendar)"
          >
            <p className="mt-2 text-[10px] tracking-[0.15em] uppercase text-neutral-500">
              Link da agenda usado após o envio do formulário
            </p>
          </EditableField>
        )}

        <section className="mt-6 text-center">
          <h1
            className="font-serif-display text-[color:var(--brand-red)]"
            style={{ fontSize: "clamp(28px, 8vw, 40px)", lineHeight: 1.1 }}
          >
            Agende uma conversa gratuita
          </h1>
          <p className="mt-2 text-[13px] tracking-[0.02em] text-neutral-700">
            Vamos conversar sobre o seu negócio?
          </p>
        </section>

        <p className="mt-6 text-[13px] leading-[1.5] text-neutral-800 text-center">
          Antes de agendar, responda rapidamente algumas perguntas para que eu
          possa entender o seu momento e tornar nossa reunião muito mais
          produtiva:
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>Qual é o seu nome?</span>
            <input
              required
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>
              Qual é o Instagram da sua empresa ou perfil profissional?
            </span>
            <input
              required
              value={instagram}
              onChange={(event) => setInstagram(event.target.value)}
              className={fieldClassName}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>
              Qual é o seu maior desafio hoje?
            </span>
            <textarea
              required
              rows={3}
              value={desafio}
              onChange={(event) => setDesafio(event.target.value)}
              className={`${fieldClassName} resize-none`}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClassName}>
              O que você busca alcançar com a sua comunicação?
            </span>
            <textarea
              required
              rows={3}
              value={objetivo}
              onChange={(event) => setObjetivo(event.target.value)}
              className={`${fieldClassName} resize-none`}
            />
          </label>

          <button
            type="submit"
            className="mt-2 rounded-[22px] bg-[color:var(--brand-orange)] px-6 py-4 text-white text-[15px] tracking-[0.02em] shadow-[0_10px_30px_-12px_rgba(224,120,30,0.6)] transition-transform hover:-translate-y-0.5"
          >
            → Marcar minha reunião gratuita
          </button>
        </form>
      </div>
    </main>
  );
}
