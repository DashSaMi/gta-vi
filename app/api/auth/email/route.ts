import { NextRequest, NextResponse } from 'next/server';
import {
  AuthorizedFan,
  INITIAL_AUTHORIZED_FANS,
  createAuthorizedFan,
  isValidEmail,
  mergeAuthorizedFan,
} from '@/lib/auth-store';

export const dynamic = 'force-dynamic';

let sessionFans: AuthorizedFan[] = [...INITIAL_AUTHORIZED_FANS];

export async function GET() {
  return NextResponse.json({ fans: sessionFans });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { email?: string; nickname?: string };
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const nickname = typeof body.nickname === 'string' ? body.nickname.trim() : '';

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address to authorize.' },
        { status: 400 }
      );
    }

    const fan = createAuthorizedFan(email, nickname);
    sessionFans = mergeAuthorizedFan(sessionFans, fan);

    return NextResponse.json({
      fan,
      fans: sessionFans,
      message: 'Authorized instantaneously with no verification code required.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Unable to process authorization request.' },
      { status: 400 }
    );
  }
}
