import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Instagram } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import gmAssetUrl from "@/assets/gm.png";
import topRightAssetUrl from "@/assets/top-right.png";
import cajuAssetUrl from "@/assets/caju-glenda.png";
import eyeAssetUrl from "@/assets/eye-mentoria.png";

const gmAsset = { url: gmAssetUrl };
const topRightAsset = { url: topRightAssetUrl };
const cajuAsset = { url: cajuAssetUrl };
const eyeAsset = { url: eyeAssetUrl };

export const Route = createFileRoute("/")({
  component: Index,
});

const PHRASES = [
  "Crie memórias com as pessoas certa.",
  "Lembre-se sempre de onde veio.",
  "Acreditar que meu ritmo me levará aos meus sonhos.",
  "Coragem para ser ruim em algo novo.",
];

// Lateral-margin slots for the floating quote: each pairs a vertical zone
// (top/middle/bottom of the page) with a side (left or right of the centered
// content column). The left/right offset formula matches the content column's
// own math (max-w-[480px] + px-6 padding), so the quote can never drift into
// the column regardless of which slot is picked.
const POSITION_VARIANTS = [
  "top-[10%] right-[max(1.5rem,calc(50%-520px))]",
  "top-1/2 -translate-y-1/2 right-[max(1.5rem,calc(50%-520px))]",
  "bottom-[10%] right-[max(1.5rem,calc(50%-520px))]",
  "top-[10%] left-[max(1.5rem,calc(50%-520px))]",
  "top-1/2 -translate-y-1/2 left-[max(1.5rem,calc(50%-520px))]",
  "bottom-[10%] left-[max(1.5rem,calc(50%-520px))]",
];

function pickRandomVariantIndex(excludeIndex?: number) {
  if (POSITION_VARIANTS.length <= 1) return 0;
  let index = Math.floor(Math.random() * POSITION_VARIANTS.length);
  while (index === excludeIndex) {
    index = Math.floor(Math.random() * POSITION_VARIANTS.length);
  }
  return index;
}

function TypewriterQuotes({
  randomizePosition,
}: {
  randomizePosition?: boolean;
}) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pause, setPause] = useState(false);
  const [variantIndex, setVariantIndex] = useState(() =>
    pickRandomVariantIndex(),
  );

  useEffect(() => {
    const current = PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (pause) {
      timeout = setTimeout(() => {
        setPause(false);
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % PHRASES.length);
      } else {
        timeout = setTimeout(() => {
          setText((t) => t.slice(0, -1));
        }, 45);
      }
    } else if (text === current) {
      setPause(true);
    } else {
      timeout = setTimeout(() => {
        setText(current.slice(0, text.length + 1));
      }, 90);
    }

    return () => clearTimeout(timeout);
  }, [text, phraseIndex, isDeleting, pause]);

  // Re-roll the lateral position each time a new phrase starts.
  useEffect(() => {
    if (!randomizePosition) return;
    setVariantIndex((previous) => pickRandomVariantIndex(previous));
  }, [phraseIndex, randomizePosition]);

  const quote = (
    <div className="font-hand text-[color:var(--brand-red)] text-2xl lg:text-3xl xl:text-4xl leading-snug">
      <span>{text}</span>
      <span
        className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle animate-pulse"
        aria-hidden="true"
      />
    </div>
  );

  if (!randomizePosition) {
    return quote;
  }

  return (
    <div className={`absolute w-56 xl:w-72 ${POSITION_VARIANTS[variantIndex]}`}>
      {quote}
    </div>
  );
}

function ServiceCard({
  href,
  external,
  background,
  eyebrow,
  title,
  description,
  secondary,
  price,
  list,
  cta,
}: {
  href: string;
  external?: boolean;
  background: string;
  eyebrow?: string;
  title: string;
  description: string;
  secondary?: string;
  price?: string;
  list?: string[];
  cta: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{ backgroundColor: background }}
      className="block rounded-[22px] overflow-hidden shadow-[0_15px_40px_-15px_rgba(120,20,20,0.55)] transition-transform hover:-translate-y-0.5 px-6 py-6 text-white"
    >
      {eyebrow && (
        <span className="inline-block mb-2 rounded-full bg-white/15 px-3 py-1 text-[9px] tracking-[0.18em] uppercase text-white/90">
          {eyebrow}
        </span>
      )}
      <h3
        className="font-serif-display leading-[1.15]"
        style={{ fontSize: "clamp(18px, 5vw, 24px)" }}
      >
        {title}
      </h3>
      <p className="mt-3 text-[13px] leading-[1.5] text-white/90">
        {description}
      </p>
      {secondary && (
        <p className="mt-2 text-[13px] leading-[1.5] text-white/80">
          {secondary}
        </p>
      )}
      {list && (
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-white/85">
          {list.map((item) => (
            <li
              key={item}
              className="before:content-['•'] before:mr-1 before:text-white/50"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {price && (
        <p className="mt-2 text-[11px] tracking-[0.08em] uppercase text-white/70">
          {price}
        </p>
      )}
      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="text-[10px] tracking-[0.22em] uppercase text-white/85">
          {cta}
        </span>
        <ArrowUpRight className="shrink-0" strokeWidth={1.5} size={20} />
      </div>
    </a>
  );
}

function ProjectLinkCard({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-[22px] bg-white border border-neutral-200 px-6 py-5 shadow-[0_10px_25px_-15px_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between gap-4">
        <span
          className="font-serif-display text-[color:var(--brand-red)]"
          style={{ fontSize: "18px" }}
        >
          {children}
        </span>
        <ArrowUpRight
          className="shrink-0 text-[color:var(--brand-red)]"
          strokeWidth={1.5}
          size={18}
        />
      </div>
    </a>
  );
}

const GALLERY_SLOTS = [
  "#galeria-aulas-1",
  "#galeria-aulas-2",
  "#galeria-aulas-3",
  "#galeria-aulas-4",
  "#galeria-aulas-5",
  "#galeria-aulas-6",
];

function Index() {
  return (
    <main className="relative min-h-screen bg-[color:var(--brand-cream)] flex justify-center overflow-hidden">
      {/* Desktop: typewriter floating at a random spot in the lateral margins */}
      <aside
        className="hidden lg:block absolute inset-0 z-10 pointer-events-none"
        aria-label="Frases em digitação"
      >
        <TypewriterQuotes randomizePosition />
      </aside>

      <div className="w-full max-w-[480px] relative px-6 pt-6 pb-10">
        <img
          src={topRightAsset.url}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 w-24 opacity-90"
        />
        {/* Hero: big GM initials with white circle overlay */}
        <section className="relative flex flex-col items-center">
          <div className="relative w-full flex items-center justify-center pt-4">
            <img
              src={gmAsset.url}
              alt=""
              aria-hidden="true"
              className="w-full h-auto select-none"
            />
            <div
              className="absolute left-1/2 top-1/2 rounded-full bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.18)]"
              style={{
                width: "48%",
                aspectRatio: "1 / 1",
                transform: "translate(-50%, -50%)",
              }}
              aria-hidden="true"
            />
          </div>

          <h1
            className="font-serif-display text-[color:var(--brand-red)] mt-4"
            style={{ fontSize: "clamp(46px, 13vw, 68px)", lineHeight: 1 }}
          >
            Glenda Maria
          </h1>
          <p className="mt-3 text-[10px] tracking-[0.28em] text-neutral-800 uppercase text-center">
            Jornalista | Estrategista de Marcas | Especialista em Marketing
          </p>
          <a
            href="https://www.instagram.com/glendamarialab/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Glenda Maria"
            className="mt-4 flex items-center justify-center rounded-full p-2 text-[color:var(--brand-red)] transition-transform hover:-translate-y-0.5"
          >
            <Instagram strokeWidth={1.5} size={22} />
          </a>
          <p className="mt-6 text-center text-[color:var(--brand-red)] text-[14px] tracking-[0.03em] leading-[1.35] max-w-xs">
            Impulsiono negócios por meio de uma comunicação clara, estratégica e
            intencional, transformando posicionamento em crescimento e
            oportunidades.
          </p>
        </section>

        {/* Consultoria CTA */}
        <Link
          to="/consultoria"
          className="mt-10 block rounded-[22px] bg-[color:var(--brand-orange)] pl-6 pr-8 py-5 text-white shadow-[0_10px_30px_-12px_rgba(224,120,30,0.6)] transition-transform hover:-translate-y-0.5"
        >
          <h2
            className="font-serif-display leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(18px, 5vw, 26px)" }}
          >
            Agende uma conversa gratuita
          </h2>
          <div className="mt-3 flex items-end justify-between gap-4">
            <p className="text-[10px] tracking-[0.18em] uppercase text-white/95 leading-[1.55]">
              Vamos conversar sobre o seu negócio?
            </p>
            <ArrowUpRight className="shrink-0" strokeWidth={1.5} size={20} />
          </div>
        </Link>

        {/* Caju divider */}
        <div className="my-7 flex justify-center" aria-hidden="true">
          <img src={cajuAsset.url} alt="" className="w-8 h-auto" />
        </div>

        {/* Services */}
        <h2
          className="mt-10 text-center font-serif-display text-[color:var(--brand-red)]"
          style={{ fontSize: "clamp(22px, 6vw, 30px)" }}
        >
          Como posso te ajudar
        </h2>

        <div className="mt-6 flex flex-col gap-5">
          {/* Mentoria */}
          <a
            // PLACEHOLDER: Glenda/Ju devem substituir pelo link real de checkout da mentoria
            href="#checkout-mentoria"
            className="block rounded-[22px] overflow-hidden bg-[color:var(--brand-red-deep)] shadow-[0_15px_40px_-15px_rgba(120,20,20,0.55)] transition-transform hover:-translate-y-0.5"
          >
            <img
              src={eyeAsset.url}
              alt="Mentoria com Glenda Maria"
              loading="lazy"
              className="w-full h-auto object-cover block"
            />
            <div className="px-6 pb-6 pt-2 text-white">
              <h3
                className="font-serif-display leading-[1.1]"
                style={{ fontSize: "clamp(18px, 5vw, 26px)" }}
              >
                Mentoria
              </h3>
              <p className="mt-3 text-[13px] leading-[1.5] text-white/90">
                Uma mentoria individual para profissionais e empresários que
                desejam construir uma comunicação estratégica, posicionar sua
                marca e transformar as redes sociais em uma ferramenta de
                crescimento.
              </p>
              <p className="mt-2 text-[13px] leading-[1.5] text-white/80">
                Você terá direcionamentos práticos, personalizados e aplicáveis
                ao seu negócio.
              </p>
              {/* PLACEHOLDER: Glenda deve informar o valor real do investimento */}
              <p className="mt-2 text-[11px] tracking-[0.08em] uppercase text-white/70">
                Investimento: [valor a definir]
              </p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <span className="text-[10px] tracking-[0.22em] uppercase text-white/85">
                  Quero minha mentoria
                </span>
                <ArrowUpRight
                  className="shrink-0"
                  strokeWidth={1.5}
                  size={20}
                />
              </div>
            </div>
          </a>

          <ServiceCard
            href="https://wa.me/5521968893152?text=Oi%2C%20eu%20vim%20do%20biolink.%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20sua%20consultoria"
            external
            background="#634E9A"
            title="Consultoria"
            description="Uma análise profunda do seu posicionamento, da sua comunicação e das oportunidades de crescimento da sua marca. Receba um plano estratégico personalizado com direcionamentos claros para fortalecer sua presença digital."
            cta="Conhecer a consultoria"
          />

          <ServiceCard
            href="https://wa.me/5521968893152?text=Oi%2C%20eu%20vim%20do%20biolink.%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20an%C3%A1lise%20estrat%C3%A9gica%20de%20redes%20sociais"
            external
            background="#304751"
            title="Análise Estratégica das Redes Sociais"
            description="Descubra exatamente o que está impedindo o crescimento do seu perfil da sua marca. Receba uma análise completa da sua comunicação, posicionamento, conteúdo, identidade, oportunidades e próximos passos."
            cta="Quero minha análise"
          />

          <ServiceCard
            href="https://wa.me/5521968893152?text=Oi%2C%20eu%20vim%20do%20biolink.%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20servi%C3%A7o%20de%20gest%C3%A3o%20de%20redes%20sociais"
            external
            background="#7B9AA6"
            eyebrow="Exclusiva para profissionais da saúde."
            title="Gestão de Redes Sociais"
            description="Planejamento, produção de conteúdo, gestão estratégica e tráfego pago para transformar suas redes sociais em uma ferramenta de autoridade e captação de pacientes."
            cta="Falar no WhatsApp"
          />

          <ServiceCard
            href="https://wa.me/5521968893152?text=Ol%C3%A1%2C%20gostaria%20de%20entrar%20em%20contato"
            external
            background="#EA8101"
            title="Podcasts, Eventos, Aulas e Treinamentos"
            description="Disponível para:"
            list={[
              "Palestras",
              "Workshops",
              "Treinamentos corporativos",
              "Podcasts",
              "Eventos",
              "Participações especiais",
              "Collabs",
            ]}
            cta="Entrar em contato"
          />
        </div>

        {/* Projects showcase */}
        <section className="mt-10">
          <h2
            className="text-center font-serif-display text-[color:var(--brand-red)]"
            style={{ fontSize: "clamp(20px, 5.5vw, 26px)" }}
          >
            Projetos que fizeram parte da minha trajetória
          </h2>
          <p className="mt-2 text-center text-[12px] text-neutral-700 leading-[1.5] max-w-xs mx-auto">
            Conheça alguns trabalhos que marcaram minha atuação na comunicação.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <ProjectLinkCard href="https://open.spotify.com/show/0NUG0P5uSY1elOZC94108w?si=82b68c3fc6654237">
              Podcast – Ministério da Saúde
            </ProjectLinkCard>

            <ProjectLinkCard href="https://www.instagram.com/turistandopiaui/">
              Turistando TV
            </ProjectLinkCard>

            <div className="rounded-[22px] bg-white border border-neutral-200 px-6 py-5 shadow-[0_10px_25px_-15px_rgba(0,0,0,0.15)]">
              <span
                className="font-serif-display text-[color:var(--brand-red)]"
                style={{ fontSize: "18px" }}
              >
                Aulas e Treinamentos
              </span>
              {/* PLACEHOLDER: Glenda/Ju devem substituir cada slot abaixo por uma foto real */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                {GALLERY_SLOTS.map((slot) => (
                  <div
                    key={slot}
                    className="aspect-square rounded-[10px] bg-[color:var(--brand-pink)]/40 border border-dashed border-[color:var(--brand-red)]/30 flex items-center justify-center text-[9px] text-center text-[color:var(--brand-red)]/70 px-1"
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Spotify playlist card */}
        <a
          href="https://open.spotify.com/playlist/7sLgLI8178kBjjgxrvHGQP?pi=u-cMxF4pMySoW2&si=rqKuOpJ7QBuQz0BwcRwd2w&utm_medium=share&utm_source=linktree&nd=1&dlsi=ad7a5061f81e489d"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 block rounded-[22px] overflow-hidden bg-[color:var(--brand-red-deep)] shadow-[0_15px_40px_-15px_rgba(120,20,20,0.55)] transition-transform hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-center px-6 pt-8 pb-2">
            <svg
              viewBox="0 0 168 168"
              className="w-16 h-16 text-white/95"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M84 0C37.6 0 0 37.6 0 84s37.6 84 84 84 84-37.6 84-84S130.4 0 84 0zm38.5 121.1c-1.5 2.5-4.7 3.2-7.1 1.7-19.5-11.9-44.1-14.6-73-8.1-2.8.6-5.6-1.1-6.2-3.9-.6-2.8 1.1-5.6 3.9-6.2 31.6-7.2 58.8-4.1 80.6 9.3 2.4 1.5 3.1 4.7 1.8 7.2zm10.3-22.9c-1.9 3-5.9 4-8.9 2.1-22.3-13.7-56.3-17.7-82.8-9.7-3.4 1-7-1-8-4.4-1-3.4 1-7 4.4-8 30.4-9.2 68.2-4.7 93.7 11.3 3.1 1.8 4 5.9 1.6 8.7zm.9-23.8c-26.8-15.9-71-17.4-96.4-9.6-4.1 1.2-8.4-1.1-9.6-5.2-1.2-4.1 1.1-8.4 5.2-9.6 29.3-8.6 78.1-6.9 109.2 11.5 3.7 2.2 4.9 6.9 2.7 10.6-2.2 3.6-7 4.9-10.6 2.7z" />
            </svg>
          </div>
          <div className="px-6 pb-6 pt-2 text-white">
            <h3
              className="font-serif-display leading-[1.1]"
              style={{ fontSize: "clamp(18px, 5vw, 26px)" }}
            >
              Playlist no Spotify
            </h3>
            <div className="mt-3 flex items-end justify-between gap-4">
              <p className="text-[10px] tracking-[0.22em] uppercase text-white/85">
                Ouça agora
              </p>
              <ArrowUpRight className="shrink-0" strokeWidth={1.5} size={20} />
            </div>
          </div>
        </a>

        <footer className="mt-10 text-center text-[9px] tracking-[0.2em] uppercase text-neutral-500">
          © Glenda Maria
        </footer>

        {/* Mobile: typewriter below the content */}
        <div
          className="lg:hidden mt-10 flex justify-center"
          aria-label="Frases em digitação"
        >
          <TypewriterQuotes />
        </div>
      </div>
    </main>
  );
}
