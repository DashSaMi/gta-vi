'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  AuthorizedFan,
  INITIAL_AUTHORIZED_FANS,
  createAuthorizedFan,
  isValidEmail,
  mergeAuthorizedFan,
} from '@/lib/auth-store';

interface VicePassContextValue {
  currentFan: AuthorizedFan | null;
  fansPool: AuthorizedFan[];
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  authorizeWithEmail: (
    email: string,
    nickname?: string
  ) => Promise<{ ok: boolean; error?: string; fan?: AuthorizedFan }>;
  signOut: () => void;
}

const STORAGE_CURRENT_KEY = 'leonida_six_current_fan_v1';
const STORAGE_POOL_KEY = 'leonida_six_fans_pool_v1';

const VicePassContext = createContext<VicePassContextValue | null>(null);

export function VicePassProvider({ children }: { children: React.ReactNode }) {
  const [currentFan, setCurrentFan] = useState<AuthorizedFan | null>(null);
  const [fansPool, setFansPool] = useState<AuthorizedFan[]>(INITIAL_AUTHORIZED_FANS);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    let active = true;

    const hydrate = async () => {
      let localPool: AuthorizedFan[] = [];
      let localCurrent: AuthorizedFan | null = null;

      try {
        const savedPool = localStorage.getItem(STORAGE_POOL_KEY);
        if (savedPool) {
          const parsed = JSON.parse(savedPool) as AuthorizedFan[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            localPool = parsed;
          }
        }
        const savedCurrent = localStorage.getItem(STORAGE_CURRENT_KEY);
        if (savedCurrent) {
          const parsedCurrent = JSON.parse(savedCurrent) as AuthorizedFan;
          if (parsedCurrent?.email && parsedCurrent?.displayName) {
            localCurrent = parsedCurrent;
          }
        }
      } catch {
        // Ignore malformed storage entries
      }

      if (!active) return;

      if (localCurrent) {
        setCurrentFan(localCurrent);
      }

      try {
        const res = await fetch('/api/auth/email');
        const data = res.ok ? ((await res.json()) as { fans?: AuthorizedFan[] }) : null;
        if (!active) return;

        let merged = data?.fans && Array.isArray(data.fans) ? [...data.fans] : [...INITIAL_AUTHORIZED_FANS];
        for (const f of localPool) {
          merged = mergeAuthorizedFan(merged, f);
        }
        if (localCurrent) {
          merged = mergeAuthorizedFan(merged, localCurrent);
        }
        setFansPool(merged);
      } catch {
        if (!active) return;
        if (localPool.length > 0) {
          setFansPool(localPool);
        }
      }
    };

    void hydrate();
    return () => {
      active = false;
    };
  }, []);

  const openAuthModal = useCallback(() => setIsAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);

  const authorizeWithEmail = useCallback(
    async (
      email: string,
      nickname?: string
    ): Promise<{ ok: boolean; error?: string; fan?: AuthorizedFan }> => {
      if (!isValidEmail(email)) {
        return { ok: false, error: 'Please enter a valid email address.' };
      }

      let authorizedFan: AuthorizedFan;
      try {
        const res = await fetch('/api/auth/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), nickname: nickname?.trim() }),
        });
        const payload = (await res.json()) as {
          fan?: AuthorizedFan;
          error?: string;
        };
        if (!res.ok || !payload.fan) {
          return {
            ok: false,
            error: payload.error ?? 'Could not complete authorization.',
          };
        }
        authorizedFan = payload.fan;
      } catch {
        authorizedFan = createAuthorizedFan(email, nickname);
      }

      setCurrentFan(authorizedFan);
      setFansPool((prev) => {
        const next = mergeAuthorizedFan(prev, authorizedFan);
        try {
          localStorage.setItem(STORAGE_POOL_KEY, JSON.stringify(next));
          localStorage.setItem(STORAGE_CURRENT_KEY, JSON.stringify(authorizedFan));
        } catch {
          // Ignore quota errors
        }
        return next;
      });

      return { ok: true, fan: authorizedFan };
    },
    []
  );

  const signOut = useCallback(() => {
    setCurrentFan(null);
    try {
      localStorage.removeItem(STORAGE_CURRENT_KEY);
    } catch {
      // Ignore storage error
    }
  }, []);

  return (
    <VicePassContext.Provider
      value={{
        currentFan,
        fansPool,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authorizeWithEmail,
        signOut,
      }}
    >
      {children}
    </VicePassContext.Provider>
  );
}

export function useVicePass() {
  const ctx = useContext(VicePassContext);
  if (!ctx) {
    throw new Error('useVicePass must be used inside VicePassProvider');
  }
  return ctx;
}
