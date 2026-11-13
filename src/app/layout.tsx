import type { Metadata, Viewport } from "next";
import { Barlow_Semi_Condensed, Big_Shoulders, Graduate } from "next/font/google";
import { MotionProvider } from "@/components/motion";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import "./hero.css";

const barlow = Barlow_Semi_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const shoulders = Big_Shoulders({
  variable: "--font-shoulders",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const graduate = Graduate({
  variable: "--font-graduate",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const title = "Barbearia Zero Oito · Experiência além do corte · Freguesia, Jacarepaguá";
const description =
  "Barbearia na Freguesia, Jacarepaguá: corte, barba na toalha quente, acabamento na navalha e lavagem no final. Agende pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Barbearia Zero Oito",
    title,
    description,
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Barbearia Zero Oito" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

const CUT_SCRIPT = `try{var d=document.documentElement,m=window.matchMedia;if(!sessionStorage.getItem("zo-cut")&&!m("(prefers-reduced-motion: reduce)").matches){d.dataset.cut="1";sessionStorage.setItem("zo-cut","1");setTimeout(function(){d.dataset.cut="done"},m("(max-width: 767px)").matches?1600:2300)}}catch(e){}`;

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${barlow.variable} ${graduate.variable} ${shoulders.variable}`} suppressHydrationWarning>
      <body className="min-h-svh">
        {/* first visit of the session: flag the razor-cut intro before first paint */}
        <script dangerouslySetInnerHTML={{ __html: CUT_SCRIPT }} />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
