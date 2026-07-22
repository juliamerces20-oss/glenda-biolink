import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
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

function TypewriterQuotes() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pause, setPause] = useState(false);

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

  return (
    <div className="font-hand text-[color:var(--brand-red)] text-2xl lg:text-3xl xl:text-4xl leading-snug">
      <span>{text}</span>
      <span
        className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle animate-pulse"
        aria-hidden="true"
      />
    </div>
  );
}

function Index() {
  return (
    <main className="relative min-h-screen bg-[color:var(--brand-cream)] flex justify-center overflow-hidden">
      {/* Desktop: typewriter floating on the right side */}
      <aside
        className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-[max(1.5rem,calc(50%-520px))] w-56 xl:w-72 z-10"
        aria-label="Frases em digitação"
      >
        <TypewriterQuotes />
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
            Jornalista e Estrategista de Marcas
          </p>
          <p className="mt-6 text-center text-[color:var(--brand-red)] text-[14px] tracking-[0.03em] leading-[1.15] max-w-xs">
            <span className="align-top">“</span>Impulsionando negócios através
            <br />
            da produção de conteúdo.<span>”</span>
          </p>
        </section>

        {/* Consultoria CTA */}
        <a
          href="#consultoria"
          className="mt-10 block rounded-[22px] bg-[color:var(--brand-orange)] pl-6 pr-8 py-5 text-white shadow-[0_10px_30px_-12px_rgba(224,120,30,0.6)] transition-transform hover:-translate-y-0.5"
        >
          <h2
            className="font-serif-display leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(18px, 5vw, 26px)" }}
          >
            Vamos marcar um consultoria?
          </h2>
          <div className="mt-3 flex items-end justify-between gap-4">
            <p className="text-[10px] tracking-[0.18em] uppercase text-white/95 leading-[1.55]">
              Responda 4 perguntas rápidas e eu
              <br />
              te aponto o melhor caminho.
            </p>
            <ArrowUpRight className="shrink-0" strokeWidth={1.5} size={20} />
          </div>
        </a>

        {/* Caju divider */}
        <div className="my-7 flex justify-center" aria-hidden="true">
          <img src={cajuAsset.url} alt="" className="w-8 h-auto" />
        </div>

        {/* Mentoria card */}
        <a
          href="#mentoria"
          className="block rounded-[22px] overflow-hidden bg-[color:var(--brand-red-deep)] shadow-[0_15px_40px_-15px_rgba(120,20,20,0.55)] transition-transform hover:-translate-y-0.5"
        >
          <img
            src={eyeAsset.url}
            alt="Comunicação com intencionalidade e beleza"
            loading="lazy"
            className="w-full h-auto object-cover block"
          />
          <div className="px-6 pb-6 pt-2 text-white">
            <h3
              className="font-serif-display leading-[1.1]"
              style={{ fontSize: "clamp(18px, 5vw, 26px)" }}
            >
              Mentoria com Intencionalidade
              <br />e Beleza
            </h3>
            <div className="mt-3 flex items-end justify-between gap-4">
              <p className="text-[10px] tracking-[0.22em] uppercase text-white/85">
                Se cadastre na lista de espera
              </p>
              <ArrowUpRight className="shrink-0" strokeWidth={1.5} size={20} />
            </div>
          </div>
        </a>

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
        <div className="lg:hidden mt-10 flex justify-center" aria-label="Frases em digitação">
          <TypewriterQuotes />
        </div>
      </div>
    </main>
  );
}
