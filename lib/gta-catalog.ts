export interface RockstarMilestone {
  year: string;
  era: string;
  city: string;
  headline: string;
  summary: string;
  milestoneStat: string;
  image: string;
  imageFocus?: string;
}

export interface GtaGameEntry {
  id: string;
  numberLabel: string;
  title: string;
  year: string;
  setting: string;
  protagonist: string;
  breakthrough: string;
  soundtrackMood: string;
  description: string;
  image: string;
  accentHex: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  paragraphs: string[];
}

export const ROCKSTAR_HISTORY: RockstarMilestone[] = [
  {
    year: '1997–1998',
    era: 'Dundee & New York Origins',
    city: 'Edinburgh / NYC',
    headline: 'From DMA Design to Rockstar Games',
    summary:
      'Born out of Scottish studio DMA Design’s chaotic top-down experiment Race’n’Chase, Rockstar Games was founded in New York in 1998 by Sam and Dan Houser, Terry Donovan, Jamie King, and Gary Foreman with one ambition: treat interactive crime cinema with the edge of independent film.',
    milestoneStat: '1st Top-Down Open City',
    image: '/images/rockstar-origin.jpg',
  },
  {
    year: '2001–2004',
    era: 'The 3D Open-World Revolution',
    city: 'Liberty · Vice · San Andreas',
    headline: 'Redefining Every Console Generation',
    summary:
      'GTA III transformed urban exploration into seamless 3D geometry. Just twelve months later, Vice City bottled 1980s Miami atmosphere, and by 2004 San Andreas linked three entire cities across deserts, forests, and neon boulevards.',
    milestoneStat: '3 Landmark Worlds in 4 Years',
    image: '/assets/aistudio/image_cfbbd8ed.png',
    imageFocus: 'object-center',
  },
  {
    year: '2008–2013',
    era: 'RAGE Engine & Global Scale',
    city: 'HD Liberty & Los Santos',
    headline: 'Cinematic Realism Meets Satire',
    summary:
      'Building their proprietary RAGE engine unlocked physics-driven animation, biting modern media satire, and multi-protagonist heist choreography in GTA V—creating one of the largest entertainment launches in history.',
    milestoneStat: '205M+ Copies Shipped Worldwide',
    image: '/assets/aistudio/image_2d3092e6.png',
    imageFocus: 'object-[50%_15%]',
  },
  {
    year: 'Nov 2026',
    era: 'The Leonida Era',
    city: 'Vice City, State of Leonida',
    headline: 'Return to Vice Beach in RAGE 9',
    summary:
      'Over a decade in craft across Rockstar’s global studios, Grand Theft Auto VI opens the State of Leonida—fusing dense Miami nightlife, bayou wilderness, social-media satire, and Lucia & Jason’s dual-lead story.',
    milestoneStat: 'Next-Gen Launch Week · Nov 2026',
    image: '/assets/aistudio/d7b71e81a183c733240a7319ddb7e798_b5be3106.jpg',
    imageFocus: 'object-center',
  },
];

export const GTA_GAMES_CATALOG: GtaGameEntry[] = [
  {
    id: 'gta-1-2',
    numberLabel: '01',
    title: 'Grand Theft Auto I & II',
    year: '1997 / 1999',
    setting: 'Liberty, Vice, San Andreas & Anywhere City',
    protagonist: 'Claude Speed & Syndicate Runners',
    breakthrough: 'Non-linear mission freedom from a kinetic top-down camera',
    soundtrackMood: 'Original radio stations baked right into every stolen chassis',
    description:
      'Before 3D skylines existed, DMA Design proved players wanted total city agency—answering payphones, dodging patrol grids, and treating an entire metropolis as an emergent sandbox.',
    image: '/assets/aistudio/image_96311b75.png',
    accentHex: '#A855F7',
  },
  {
    id: 'gta-3',
    numberLabel: '02',
    title: 'Grand Theft Auto III',
    year: '2001',
    setting: 'Liberty City',
    protagonist: 'Claude',
    breakthrough: 'First true seamless 3D open-world crime metropolis',
    soundtrackMood: 'Noir rain, Head Radio synth, and late-night chatter',
    description:
      'Crossing Callahan Bridge in pouring rain changed video games overnight. Every street corner, subway tunnel, and radio frequency pulsed as one continuous, living 3D diorama.',
    image: '/assets/aistudio/image_dfe517e4.png',
    accentHex: '#818CF8',
  },
  {
    id: 'gta-vice-city',
    numberLabel: '03',
    title: 'GTA: Vice City',
    year: '2002',
    setting: 'Vice City (1986)',
    protagonist: 'Tommy Vercetti',
    breakthrough: 'Voice-acted cinema, property empire building & unmistakable era mood',
    soundtrackMood: 'Flash FM, Emotion 98.3 & Ocean Beach sunset neon',
    description:
      'Vice City proved color, architecture, and music could define an open world just as powerfully as map square mileage. Pastel Art Deco hotels and twilight causeways became instant icons.',
    image: '/assets/aistudio/image_7c3a4e46.png',
    accentHex: '#F472B6',
  },
  {
    id: 'gta-san-andreas',
    numberLabel: '04',
    title: 'GTA: San Andreas',
    year: '2004',
    setting: 'Los Santos, San Fierro & Las Venturas',
    protagonist: 'Carl "CJ" Johnson',
    breakthrough: 'Three-city state scale, RPG stats, swimming & deep customization',
    soundtrackMood: 'Radio Los Santos, K-DST & golden canyon highways',
    description:
      'An entire West Coast state compressed onto one disc—from Grove Street cul-de-sacs to misty redwoods and desert airstrips—giving players unprecedented personal identity.',
    image: '/assets/aistudio/image_1613d113.png',
    accentHex: '#F59E0B',
  },
  {
    id: 'gta-4',
    numberLabel: '05',
    title: 'Grand Theft Auto IV',
    year: '2008',
    setting: 'Liberty City (HD Era)',
    protagonist: 'Niko Bellic',
    breakthrough: 'Euphoria procedural physics & grounded immigrant crime drama',
    soundtrackMood: 'Noir brass, Vladivostok FM & wet steel bridges',
    description:
      'Launching the RAGE engine era, GTA IV traded arcade lightness for heavy vehicle suspension, moral grey zones, and a razor-sharp portrait of chasing the American dream.',
    image: '/assets/aistudio/image_1539cb33.png',
    accentHex: '#C084FC',
  },
  {
    id: 'gta-5',
    numberLabel: '06',
    title: 'Grand Theft Auto V',
    year: '2013',
    setting: 'Los Santos & Blaine County',
    protagonist: 'Michael, Franklin & Trevor',
    breakthrough: 'Three-protagonist live switching & cinematic heist orchestration',
    soundtrackMood: 'Non-Stop-Pop, West Coast Classics & Vinewood hills',
    description:
      'A cultural juggernaut spanning three console generations, marrying blockbuster multi-character heists with an evolving online metropolis that ran strong for over a decade.',
    image: '/assets/aistudio/dc098f0532de3c000039bda2b1a4e546_e3481949.jpg',
    accentHex: '#A78BFA',
  },
  {
    id: 'gta-6',
    numberLabel: '07',
    title: 'Grand Theft Auto VI',
    year: '2026',
    setting: 'Vice City & State of Leonida',
    protagonist: 'Lucia & Jason',
    breakthrough: 'RAGE 9 atmospheric lighting, dense interiors & living social ecosystem',
    soundtrackMood: 'Banafsh Miami dusk, coastal bass & Leonida highway pulse',
    description:
      'Returning to sun-drenched, purple-twilight Vice City on a breathtaking scale—spanning coastal high-rises, the Leonida Keys, Port Gellhorn, and wild Grassrivers wetlands.',
    image: '/assets/aistudio/image_78a3df33.png',
    accentHex: '#9333EA',
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'vice-city-banafsh-twilight-art-direction',
    title: 'Why Banafsh Twilight Defines Vice City’s New Look',
    category: 'Visual Direction',
    date: 'Nov 17, 2026',
    readTime: '5 min read',
    excerpt:
      'How Rockstar moved past flat 1980s neon clichés into atmospheric violet dusk, humid coastal haze, and realistic Ocean Drive reflections.',
    image: '/assets/aistudio/image_95b10f83.png',
    paragraphs: [
      'When players think of Vice City, their minds jump straight to pastel pinks and cyan grid lines from 2002. In Grand Theft Auto VI, that palette grows up into something far richer: deep banafsh violet clouds meeting warm coral-amber streetlamps over wet coastal asphalt.',
      'Volumetric cloud scattering in the RAGE 9 engine lets South Florida sunsets linger across glass high-rises and mangrove waterways. Rather than painting surfaces in artificial neon, light bounces organically off stucco hotels, chrome bumpers, and ocean spray.',
      'That exact balance—deep amethyst night paired with warm Miami sunset glow—guided every pixel of this launch-week web showcase.',
    ],
  },
  {
    slug: 'building-gta-vi-website-instagram-challenge',
    title: 'Behind the Build: Designing a GTA VI Launch Hub in One Challenge',
    category: 'Creator Log',
    date: 'Nov 16, 2026',
    readTime: '4 min read',
    excerpt:
      'Inside the design system, scroll-linked animations, and zero-friction email pass crafted for our Instagram programming challenge.',
    image: '/assets/aistudio/388398c8c654aeeddfea6d166403a7c6_ef6ac76a.jpg',
    paragraphs: [
      'For this Instagram web-challenge episode, the goal was to build a flagship GTA VI tribute that feels like an interactive premiere rather than a static wiki page—fast enough to deploy cleanly on Vercel and share directly with followers.',
      'Instead of cluttering cards with telemetry widgets or forcing visitors through email verification codes, every interactive layer serves the fan experience: instant Vice Pass check-in, a 10-second rotating Thank You community wall, an interactive Rockstar anthology, and a 10-question playstyle survey.',
      'Topped off with a server-side Gemini 3 Pro poster generator supporting 1K, 2K, and 4K outputs, visitors can leave with their own custom Vice City artwork.',
    ],
  },
  {
    slug: 'leonida-regions-from-keys-to-grassrivers',
    title: 'Mapping Leonida: From Ocean Beach to the Grassrivers',
    category: 'World Guide',
    date: 'Nov 15, 2026',
    readTime: '6 min read',
    excerpt:
      'Breaking down the distinct biomes of GTA VI’s map—bridges, port towns, mangrove keys, and dense urban corridors.',
    image: '/assets/aistudio/d7b71e81a183c733240a7319ddb7e798_b5be3106.jpg',
    paragraphs: [
      'Leonida is engineered around contrast. Within fifteen minutes on a coastal expressway, you transition from crowded Ocean Drive club strips to quiet turquoise-and-violet causeways linking the Leonida Keys.',
      'Westward toward Port Gellhorn, stripped-back motels, pawn shops, and industrial marinas anchor Lucia and Jason’s early scores, while the Grassrivers airboat channels reward slow exploration with dynamic storms and wildlife.',
      'Every district carries its own traffic rhythm, radio reception mood, and architectural silhouette—making navigation intuitive even with the minimap switched off.',
    ],
  },
];

export const CREATOR_SOCIAL_LINKS = [
  {
    platform: 'Instagram',
    handle: '@codewithsaman',
    label: 'Web Design & Coding Challenges',
    description: 'Daily reels crafting custom websites for celebrities, games, and creative dev challenges.',
    href: 'https://instagram.com',
    primary: true,
  },
  {
    platform: 'GitHub',
    handle: 'vercel-ready-builds',
    label: 'Open Source Challenge Code',
    description: 'Clean Next.js App Router, Tailwind v4, and Motion architecture ready to deploy.',
    href: 'https://github.com',
    primary: false,
  },
  {
    platform: 'YouTube',
    handle: 'Full Build Breakdowns',
    label: 'Long-Form Tutorials',
    description: 'Step-by-step walkthroughs of UI choreography, typography, and AI integrations.',
    href: 'https://youtube.com',
    primary: false,
  },
  {
    platform: 'Rockstar Games',
    handle: 'rockstargames.com/VI',
    label: 'Official GTA VI Portal',
    description: 'Official trailers, newswire announcements, and platform launch updates.',
    href: 'https://www.rockstargames.com',
    primary: false,
  },
];
