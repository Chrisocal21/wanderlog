import type { GalleryBlock as GalleryBlockType } from '@/types';
import Image from 'next/image';

interface GalleryBlockProps {
  block: GalleryBlockType;
  isEditor?: boolean;
}

export function GalleryBlock({ block, isEditor }: GalleryBlockProps) {
  const { photos, layout } = block.content;
  
  const gridCols = {
    '2-col': 'grid-cols-1 md:grid-cols-2',
    '3-col': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4-col': 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[layout]} gap-4 my-8`}>
      {photos.map((photo, index) => (
        <figure key={index} className="group">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {photo.caption && (
            <figcaption className="mt-2 text-sm text-gray-600 text-center italic">
              {photo.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
