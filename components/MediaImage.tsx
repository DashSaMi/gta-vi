'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Film } from 'lucide-react';

interface MediaImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function MediaImage({
  src,
  alt,
  className = 'object-cover',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: MediaImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#23103D] via-[#140A24] to-[#2B123F] p-6 text-center"
      >
        <Film className="w-8 h-8 text-[#A855F7]" aria-hidden="true" />
        <span className="text-xs font-medium text-[#C4B5FD] max-w-xs">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      loading={priority ? undefined : 'eager'}
      sizes={sizes}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
