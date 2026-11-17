import type { Metadata } from 'next';
import Script from 'next/script';
import { Anton, Barlow_Condensed, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { VicePassProvider } from '@/components/VicePassProvider';
import { SiteShell } from '@/components/SiteShell';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vi',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
});

function resolveMetadataBase(): URL | undefined {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.APP_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  if (!raw) return undefined;
  try {
    return new URL(raw);
  } catch {
    return undefined;
  }
}

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: 'VI — GTA VI Launch Hub & Vice City Experience',
  description:
    'An interactive Grand Theft Auto VI launch-week experience in Miami banafsh twilight style featuring Rockstar history, a 10-question fan survey, instant email pass, and 1K/2K/4K Vice City poster studio.',
  openGraph: {
    title: 'VI — GTA VI Launch Hub & Vice City Experience',
    description:
      'Explore Rockstar Games history, take the 10-question GTA VI compatibility survey, join the rotating fan wall, and create 4K Vice City key art.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VI — GTA VI Launch Hub & Vice City Experience',
    description:
      'Explore Rockstar Games history, take the 10-question GTA VI compatibility survey, join the rotating fan wall, and create 4K Vice City key art.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${anton.variable} ${barlowCondensed.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-[#06050A] text-[#FAF9FF]" suppressHydrationWarning>
        <Script id="strip-fdprocessedid" strategy="beforeInteractive">
          {`(function(){try{var clean=function(){var els=document.querySelectorAll('[fdprocessedid]');for(var i=0;i<els.length;i++){els[i].removeAttribute('fdprocessedid');}};clean();if(typeof MutationObserver!=='undefined'){var obs=new MutationObserver(function(muts){for(var i=0;i<muts.length;i++){var t=muts[i].target;if(t&&t.nodeType===1&&t.hasAttribute('fdprocessedid')){t.removeAttribute('fdprocessedid');}}});obs.observe(document.documentElement,{attributes:true,attributeFilter:['fdprocessedid'],subtree:true});window.addEventListener('DOMContentLoaded',clean);window.addEventListener('load',function(){clean();setTimeout(function(){obs.disconnect();},4000);});}}catch(e){}})();`}
        </Script>
        <VicePassProvider>
          <SiteShell>{children}</SiteShell>
        </VicePassProvider>
      </body>
    </html>
  );
}
