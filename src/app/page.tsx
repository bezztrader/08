import Image from "next/image";
import { FloatingWhatsApp, GoldCTA, InstagramButton } from "@/components/cta";
import { type Work, WorkGallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import {
  BoneShift,
  Big08,
  CustomCursor,
  MaskImage,
  ReadingProgress,
  Reveal,
  ScrollMarquee,
  SectionLabel,
  SplitTitle,
} from "@/components/motion";
import { Reel } from "@/components/reel";
import { ServiceMenu } from "@/components/services";
import {
  ADDRESS,
  HOURS,
  INSTAGRAM_URL,
  MAPS_EMBED_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICES,
  SITE_URL,
  WHATSAPP_CLUB_URL,
  WHATSAPP_URL,
} from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: "Barbearia Zero Oito",
  alternateName: "Barbearia 08",
  slogan: "Experiência além do corte",
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  logo: `${SITE_URL}/images/logo-zerooito.png`,
  telephone: PHONE_TEL,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    addressLocality: "Rio de Janeiro",
    addressRegion: "RJ",
    addressCountry: "BR",
  },
  areaServed: "Freguesia, Jacarepaguá, Rio de Janeiro",
  hasMap: MAPS_URL,
  sameAs: [INSTAGRAM_URL],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "16:00" },
  ],
};

// Small originals (360–480px wide): every tile stays at or under native width.
const PHOTOS: Work[] = [
  {
    id: "degrade",
    src: "/images/cortes/corte-01-degrade-infantil.jpg",
    alt: "Menino de perfil com degradê baixo e franja penteada para o lado",
    caption: "Degradê, 1ª cadeira",
    width: 480,
    height: 640,
  },
  {
    id: "atendendo",
    src: "/images/cortes/corte-02-barbeiro-atendendo.jpg",
    alt: "Barbeiro de avental finalizando o corte de um cliente no salão",
    caption: "Acabamento na mão",
    width: 360,
    height: 640,
  },
  {
    id: "barba",
    src: "/images/cortes/corte-03-barba-alinhada.jpg",
    alt: "Cliente com barba alinhada sendo penteada pelo barbeiro",
    caption: "Barba no desenho",
    width: 360,
    height: 640,
  },
  {
    id: "lavagem",
    src: "/images/cortes/corte-04-lavagem.jpg",
    alt: "Cliente no lavatório recebendo a lavagem do cabelo com vapor",
    caption: "Lavagem no final",
    width: 360,
    height: 640,
  },
];

const HOUSE = [
  "Degradê batido no ponto",
  "Contorno na navalha",
  "Toalha quente na barba",
  "Cabelo lavado no final",
];

function Star({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`fill-current ${className}`}>
      <path d="M12 1.5l2.9 6.9 7.4.6-5.6 4.9 1.7 7.3L12 17.3l-6.4 3.9 1.7-7.3L1.7 9l7.4-.6z" />
    </svg>
  );
}


export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <a
        href="#conteudo"
        className="btn-gold sr-only z-[70] rounded-md px-4 py-3 font-bold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <ReadingProgress />
      <CustomCursor />
      <Header />

      <main id="conteudo">
        <Hero />

        <ScrollMarquee items={["Corte", "Barba", "Acabamento", "Experiência além do corte"]} />

        {/* 01 A casa: text left, two reels in an offset editorial pair */}
        <section id="casa" aria-labelledby="casa-title" className="relative">
          <div className="mx-auto grid max-w-[84rem] gap-14 px-4 py-24 sm:px-8 sm:py-32 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex gap-4 sm:gap-6">
                <SectionLabel n={1}>A casa</SectionLabel>
                <SplitTitle id="casa-title" text="Do jeito *certo.*" className="text-[clamp(3rem,9vw,6rem)] leading-[0.88] text-bone" />
              </div>
              <Reveal as="p" className="mt-8 max-w-[44ch] text-lg leading-relaxed text-bone/85">
                Barbearia de bairro, mas sem preguiça. Cada corte leva o tempo que precisa. Você chega, se acomoda e sai
                alinhado, do topo à nuca.
              </Reveal>
              <ul className="mt-10 space-y-4">
                {HOUSE.map((line, i) => (
                  <Reveal as="li" key={line} delay={i * 0.06} className="flex items-center gap-4 text-lg">
                    <Star className="size-3.5 shrink-0 text-gold" />
                    {line}
                  </Reveal>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:col-span-6 lg:col-start-7">
              <div className="col-span-7">
                <Reel
                  src="/videos/video-ambiente-corte.mp4"
                  poster="/videos/video-ambiente-corte-poster.jpg"
                  label="O salão, a toalha quente e o acabamento do degradê"
                  sizes="(min-width: 1024px) 380px, 55vw"
                />
                <p className="label mt-3 text-bone-dim">O salão e o degradê</p>
              </div>
              <div className="col-span-5 mt-24 sm:mt-40">
                <Reel
                  src="/videos/video-ritual-barba.mp4"
                  poster="/videos/video-ritual-barba-poster.jpg"
                  label="O ritual da barba: toalha quente, vapor, navalha e balm"
                  sizes="(min-width: 1024px) 270px, 40vw"
                  radius={14}
                />
                <p className="label mt-3 text-bone-dim">O ritual da barba</p>
              </div>
            </div>
          </div>
        </section>

        {/* 02 Serviços: sticky title left, the board right */}
        <section id="servicos" aria-labelledby="servicos-title" className="pinstripe relative border-y border-[var(--rule)]">
          <div className="mx-auto grid max-w-[84rem] gap-12 px-4 py-24 sm:px-8 sm:py-32 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <div className="flex gap-4 sm:gap-6">
                  <SectionLabel n={2}>Serviços</SectionLabel>
                  <SplitTitle id="servicos-title" text="Na *régua.*" className="text-[clamp(3.4rem,11vw,7rem)] leading-[0.86] text-bone" />
                </div>
                <Reveal as="p" className="mt-6 max-w-[32ch] text-base leading-relaxed text-bone/75">
                  Dúvida sobre qual pedir? Manda no WhatsApp que o barbeiro te fala.
                </Reveal>
              </div>
            </div>
            <div className="lg:col-span-8">
              <ServiceMenu items={SERVICES} />
            </div>
          </div>
        </section>

        {/* 03 Galeria: staggered editorial grid, photos never above native width */}
        <section id="galeria" aria-labelledby="galeria-title" className="relative overflow-hidden">
          <Big08 className="-right-24 top-10" />
          <div className="relative mx-auto max-w-[84rem] px-4 py-24 sm:px-8 sm:py-32">
            <div className="mb-14 grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-6">
                <div className="flex gap-4 sm:gap-6">
                  <SectionLabel n={3}>Galeria</SectionLabel>
                  <SplitTitle id="galeria-title" text="Feito *aqui.*" className="text-[clamp(3rem,9vw,6rem)] leading-[0.88] text-bone" />
                </div>
              </div>
              <Reveal className="flex flex-col items-start gap-4 lg:col-span-5 lg:col-start-8">
                <p className="text-lg text-bone/80">Cliente real, cadeira de verdade. Toque numa foto pra ver grande.</p>
                <InstagramButton />
              </Reveal>
            </div>
            <WorkGallery works={PHOTOS} />
          </div>
        </section>

        {/* 04 Clube: the one bone band; black turns to bone as you scroll in */}
        <BoneShift id="clube" labelledBy="clube-title" className="text-ink">
          <div className="mx-auto grid max-w-[84rem] gap-12 px-4 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex gap-4 sm:gap-6">
                <SectionLabel n={4} tone="light">Clube Zero Oito</SectionLabel>
                <h2 id="clube-title" className="display mt-6 text-[clamp(3.2rem,11vw,7.5rem)] leading-[0.86] text-ink">
                  Cliente <span className="text-gold-deep">de casa.</span>
                </h2>
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className="text-xl leading-relaxed text-ink/85">
                Uma assinatura mensal com vários serviços inclusos. Você mantém o visual em dia sem ficar contando os dias
                pra voltar.
              </p>
              <p className="mt-4 text-base text-ink/70">Os detalhes do plano a gente passa no WhatsApp.</p>
              <div className="mt-8">
                <GoldCTA label="Quero saber mais" href={WHATSAPP_CLUB_URL} variant="dark" />
              </div>
            </div>
          </div>
        </BoneShift>

        {/* 05 Onde: hours as a ledger, map offset right */}
        <section id="onde" aria-labelledby="onde-title" className="relative">
          <div className="mx-auto grid max-w-[84rem] gap-12 px-4 py-24 sm:px-8 sm:py-32 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex gap-4 sm:gap-6">
                <SectionLabel n={5}>Onde fica</SectionLabel>
                <SplitTitle id="onde-title" text="Cola *aqui.*" className="text-[clamp(3rem,9vw,6rem)] leading-[0.88] text-bone" />
              </div>
              <Reveal>
                <dl className="mt-10 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
                  {HOURS.map((h) => (
                    <div key={h.label} className="flex justify-between gap-6 py-4 text-lg">
                      <dt className="label self-center text-bone-dim">{h.label}</dt>
                      <dd className={h.time === "Fechado" ? "text-bone-dim" : "font-semibold text-bone"}>{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
              <Reveal delay={0.08}>
                <address className="mt-8 text-lg leading-relaxed not-italic">
                  {ADDRESS.street}
                  <br />
                  {ADDRESS.district}, {ADDRESS.city} - {ADDRESS.region}
                </address>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline sheen group relative isolate mt-7 inline-flex min-h-12 items-center overflow-hidden rounded-md px-6 font-semibold uppercase tracking-[0.14em]"
                >
                  <span className="lift">Como chegar</span>
                  <span className="sr-only">(abre o Google Maps em nova aba)</span>
                </a>
              </Reveal>
            </div>
            <MaskImage className="map-frame aspect-[4/5] sm:aspect-[16/11] lg:col-span-6 lg:col-start-7 lg:mt-20">
              <iframe
                title="Mapa: Barbearia Zero Oito, Rua Araguaia 897, Freguesia"
                src={MAPS_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
                allowFullScreen
              />
            </MaskImage>
          </div>
        </section>

        {/* Closing band */}
        <section aria-labelledby="cta-title" className="grain relative overflow-hidden border-y border-gold/40 bg-ink-2">
          <Big08 className="-bottom-24 -left-10" />
          <div className="relative mx-auto grid max-w-[84rem] gap-10 px-4 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SplitTitle id="cta-title" text="Bora *marcar?*" className="text-[clamp(3.6rem,14vw,9.5rem)] leading-[0.84] text-bone" />
            </div>
            <Reveal className="lg:col-span-4">
              <p className="text-lg text-bone/85">Manda mensagem, escolhe dia e hora. A cadeira te espera.</p>
              <div className="mt-7">
                <GoldCTA />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="pb-28">
        <div className="mx-auto grid max-w-[84rem] gap-10 px-4 pt-16 sm:px-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <Image src="/images/logo-zerooito.png" alt="Barbearia Zero Oito" width={745} height={774} sizes="112px" className="h-auto w-28" />
            <p className="label mt-5 text-bone-dim">Experiência além do corte</p>
          </div>
          <dl className="grid gap-8 text-base sm:grid-cols-2 md:col-span-9 lg:grid-cols-4">
            <div>
              <dt className="label text-bone-dim">Instagram</dt>
              <dd className="mt-3">
                <InstagramButton />
              </dd>
            </div>
            <div>
              <dt className="label text-bone-dim">WhatsApp</dt>
              <dd className="mt-1 flex flex-col">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 font-semibold underline decoration-gold underline-offset-4">
                  <WhatsAppIcon className="size-5" /> {PHONE_DISPLAY}
                </a>
                <a href={`tel:${PHONE_TEL}`} className="inline-flex min-h-12 items-center gap-2 font-semibold underline decoration-gold underline-offset-4">
                  <PhoneIcon className="size-5" /> Ligar
                </a>
              </dd>
            </div>
            <div>
              <dt className="label text-bone-dim">Endereço</dt>
              <dd className="mt-3 leading-relaxed">
                {ADDRESS.street}, {ADDRESS.district}, {ADDRESS.city} - {ADDRESS.region}
              </dd>
            </div>
            <div>
              <dt className="label text-bone-dim">Horário</dt>
              <dd className="mt-3">
                <ul className="space-y-1">
                  {HOURS.map((h) => (
                    <li key={h.label}>
                      <span className="font-semibold">{h.label}:</span> {h.time}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
        <p className="label mx-auto mt-14 max-w-[84rem] px-4 text-bone-dim sm:px-8">© 2026 Barbearia Zero Oito</p>
      </footer>

      <FloatingWhatsApp />
    </>
  );
}
