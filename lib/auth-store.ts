export interface AuthorizedFan {
  id: string;
  email: string;
  displayName: string;
  authorizedAt: string;
}

export interface ThankYouCardItem {
  slotIndex: number;
  fanName: string;
  message: string;
  cityTag: string;
  passCode: string;
}

export const INITIAL_AUTHORIZED_FANS: AuthorizedFan[] = [
  {
    id: 'fan-1',
    email: 'saman.karimian12@gmail.com',
    displayName: 'Saman Karimian',
    authorizedAt: '2026-11-16T20:15:00Z',
  },
  {
    id: 'fan-2',
    email: 'elena.morales@vicebeach.io',
    displayName: 'Elena Morales',
    authorizedAt: '2026-11-16T21:04:00Z',
  },
  {
    id: 'fan-3',
    email: 'marcus.vance@leonida.fm',
    displayName: 'Marcus Vance',
    authorizedAt: '2026-11-16T21:42:00Z',
  },
  {
    id: 'fan-4',
    email: 'kiana.rostami@studio.dev',
    displayName: 'Kiana Rostami',
    authorizedAt: '2026-11-16T22:18:00Z',
  },
  {
    id: 'fan-5',
    email: 'darius.brooks@oceandrive.co',
    displayName: 'Darius Brooks',
    authorizedAt: '2026-11-16T22:55:00Z',
  },
  {
    id: 'fan-6',
    email: 'nadia.chen@keysrun.net',
    displayName: 'Nadia Chen',
    authorizedAt: '2026-11-16T23:10:00Z',
  },
  {
    id: 'fan-7',
    email: 'mateo.silva@bayou.club',
    displayName: 'Mateo Silva',
    authorizedAt: '2026-11-16T23:30:00Z',
  },
  {
    id: 'fan-8',
    email: 'julian.mercer@rockarchive.org',
    displayName: 'Julian Mercer',
    authorizedAt: '2026-11-16T23:44:00Z',
  },
];

const THANK_YOU_MESSAGES = [
  'Thank you for checking in ahead of Leonida launch week.',
  'Grateful to have you riding with us on Ocean Drive.',
  'Appreciate your Vice Pass check-in for the November drop.',
  'Thank you for joining the launch-week community crew.',
  'Big shoutout for backing this creator challenge build.',
  'Thanks for unlocking your Vice Pass with zero friction.',
  'Thank you for bringing Miami twilight energy to the wall.',
];

const LEONIDA_DISTRICTS = [
  'Ocean Beach',
  'Vice Metro',
  'Leonida Keys',
  'Port Gellhorn',
  'Grassrivers',
  'Starfish Island',
  'Vice Harbor',
];

export function isValidEmail(rawEmail: string): boolean {
  const trimmed = rawEmail.trim();
  if (!trimmed || trimmed.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function deriveDisplayName(email: string, nickname?: string): string {
  const cleanNick = (nickname ?? '').trim();
  if (cleanNick.length >= 2) {
    return cleanNick.slice(0, 32);
  }
  const localPart = email.trim().split('@')[0] ?? 'Vice Guest';
  const cleaned = localPart
    .replace(/[0-9]+/g, ' ')
    .replace(/[._-]+/g, ' ')
    .trim();
  if (!cleaned) return 'Vice Guest';
  return cleaned
    .split(/\s+/)
    .slice(0, 3)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function createAuthorizedFan(
  email: string,
  nickname?: string,
  nowIso: string = new Date().toISOString()
): AuthorizedFan {
  const normalizedEmail = email.trim().toLowerCase();
  return {
    id: `fan-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    email: normalizedEmail,
    displayName: deriveDisplayName(normalizedEmail, nickname),
    authorizedAt: nowIso,
  };
}

export function mergeAuthorizedFan(
  existing: AuthorizedFan[],
  incoming: AuthorizedFan
): AuthorizedFan[] {
  const filtered = existing.filter(
    (item) => item.email.toLowerCase() !== incoming.email.toLowerCase()
  );
  return [incoming, ...filtered];
}

export function buildThankYouCards(
  fans: AuthorizedFan[],
  cycleSeed: number,
  prioritizeName?: string
): ThankYouCardItem[] {
  const source = fans.length > 0 ? fans : INITIAL_AUTHORIZED_FANS;
  const pool = [...source];

  // Deterministic Fisher-Yates style shuffle seeded by cycleSeed so SSR and tests remain predictable
  let state = Math.abs(cycleSeed * 9301 + 49297) % 233280;
  for (let i = pool.length - 1; i > 0; i--) {
    state = (state * 9301 + 49297) % 233280;
    const j = state % (i + 1);
    const temp = pool[i];
    pool[i] = pool[j];
    pool[j] = temp;
  }

  if (prioritizeName) {
    const idx = pool.findIndex(
      (f) => f.displayName.toLowerCase() === prioritizeName.toLowerCase()
    );
    if (idx > 0) {
      const [found] = pool.splice(idx, 1);
      pool.unshift(found);
    }
  }

  return Array.from({ length: 5 }, (_, slotIndex) => {
    const fan = pool[slotIndex % pool.length];
    const msgIdx = (cycleSeed + slotIndex * 3) % THANK_YOU_MESSAGES.length;
    const districtIdx = (cycleSeed + slotIndex * 2) % LEONIDA_DISTRICTS.length;
    const codeNumber = String(((cycleSeed * 17 + slotIndex * 43 + 106) % 899) + 100);
    return {
      slotIndex,
      fanName: fan.displayName,
      message: THANK_YOU_MESSAGES[msgIdx],
      cityTag: LEONIDA_DISTRICTS[districtIdx],
      passCode: `VC-${codeNumber}`,
    };
  });
}
