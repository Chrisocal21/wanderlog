import type { PhotoBlock as PhotoBlockType } from '@/types';
import Image from 'next/image';

interface PhotoBlockProps {
  block: PhotoBlockType;
  isEditor?: boolean;
}

export function PhotoBlock({ block, isEditor }: PhotoBlockProps) {
  const { url, alt, caption, aspectRatio } = block.content;

  return (
    <figure className="my-8">
      <div 
        className="relative w-full overflow-hidden rounded-lg"
        style={{ aspectRatio: aspectRatio || '16/9' }}
      >
        <Image
          src={url}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-gray-600 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
