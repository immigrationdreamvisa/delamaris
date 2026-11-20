import React from 'react';

export interface DelamarisLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  imgClassName?: string;
  height?: number | string;
  width?: number | string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Authentic Delamaris official cursive script brand logo.
 * Extracted directly from official brand vector reference (358 x 98 px, aspect ratio ~3.65:1),
 * featuring the iconic "Delamaris®" cursive wordmark and centered "- 1879 -" heritage mark.
 * Strictly maintains its locked aspect ratio without distortion.
 */
export const DelamarisLogo: React.FC<DelamarisLogoProps> = ({
  variant = 'dark',
  className = '',
  imgClassName = '',
  height,
  width,
  size = 'md',
}) => {
  const isLight = variant === 'light';
  const logoSrc = isLight
    ? '/delamaris_logo_white.png'
    : '/delamaris_logo_dark.png';

  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11 md:h-[48px]',
    lg: 'h-12 sm:h-13 md:h-14',
    xl: 'h-14 sm:h-16',
  };

  return (
    <span className={`inline-flex items-center select-none shrink-0 ${className}`}>
      <img
        src={logoSrc}
        alt="Delamaris - 1879 -"
        width={358}
        height={98}
        style={{
          aspectRatio: '358 / 98',
          ...(height ? { height } : {}),
          ...(width ? { width } : {}),
        }}
        className={`w-auto object-contain transition-transform duration-200 hover:scale-[1.02] ${
          imgClassName || sizeClasses[size]
        }`}
        loading="eager"
      />
    </span>
  );
};
