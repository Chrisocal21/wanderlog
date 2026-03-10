import type { Block } from '@/types';
import { TextBlock } from './blocks/TextBlock';
import { HeadingBlock } from './blocks/HeadingBlock';
import { PhotoBlock } from './blocks/PhotoBlock';
import { GalleryBlock } from './blocks/GalleryBlock';
import { PullQuoteBlock } from './blocks/PullQuoteBlock';
import { DividerBlock } from './blocks/DividerBlock';
import { MapBlock } from './blocks/MapBlock';
import { VideoBlock } from './blocks/VideoBlock';
import { CodeBlock } from './blocks/CodeBlock';

interface BlockRendererProps {
  block: Block;
  isEditor?: boolean;
}

export function BlockRenderer({ block, isEditor = false }: BlockRendererProps) {
  switch (block.type) {
    case 'text':
      return <TextBlock block={block} isEditor={isEditor} />;
    case 'heading':
      return <HeadingBlock block={block} isEditor={isEditor} />;
    case 'photo':
      return <PhotoBlock block={block} isEditor={isEditor} />;
    case 'gallery':
      return <GalleryBlock block={block} isEditor={isEditor} />;
    case 'pullquote':
      return <PullQuoteBlock block={block} isEditor={isEditor} />;
    case 'divider':
      return <DividerBlock block={block} isEditor={isEditor} />;
    case 'map':
      return <MapBlock block={block} isEditor={isEditor} />;
    case 'video':
      return <VideoBlock block={block} isEditor={isEditor} />;
    case 'code':
      return <CodeBlock block={block} isEditor={isEditor} />;
    default:
      return null;
  }
}
