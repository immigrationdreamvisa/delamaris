import React, { useState } from 'react';
import { Fish } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: 'eager' | 'lazy';
  priority?: boolean;
}

/**
 * Resilient editorial image component enforcing the Zero-Broken-Image Policy.
 * Uses smooth fade-in upon decode and renders a refined ocean-sand fallback
 * if an asset ever fails to load.
 */
export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  loading = 'lazy',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EFEAE0] via-[#E5DDD0] to-[#D6CCBC] text-[#0D2C44]/70 p-6 text-center ${containerClassName}`}
      >
        <Fish className="w-8 h-8 text-[#24636C] mb-2" strokeWidth={1.5} />
        <span className="font-serif text-sm text-[#0D2C44] max-w-[22ch]">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#EAE3D7] ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : loading}
        decoding={priority ? 'sync' : 'async'}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
