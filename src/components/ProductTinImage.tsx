import React from 'react';
import { Product } from '../data/delamarisData';
import { SmartImage } from './SmartImage';

interface ProductTinImageProps {
  product: Product;
  className?: string;
}

export const ProductTinImage: React.FC<ProductTinImageProps> = ({
  product,
  className = '',
}) => {
  if (product.tinCrop) {
    const { x, y, w, h } = product.tinCrop;
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg
          viewBox={`${x} ${y} ${w} ${h}`}
          className="w-full max-w-[210px] h-[135px] filter drop-shadow-[0_8px_16px_rgba(13,44,68,0.14)] transition-transform duration-300 group-hover:scale-105"
          aria-label={product.name}
        >
          <image
            href="/delamaris_official_tins.jpg"
            width="1024"
            height="433"
            preserveAspectRatio="xMidYMid slice"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="w-full max-w-[210px] h-[135px] rounded-xl overflow-hidden bg-[#EFEAE0] shadow-sm">
        <SmartImage
          src={product.image}
          alt={product.imageAlt}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
  );
};
