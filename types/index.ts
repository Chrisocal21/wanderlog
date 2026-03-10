import type { LayoutId, PaletteId, FontPairId } from '@/lib/config';

// ============================================================================
// Block Types
// ============================================================================

export type BlockType = 'text' | 'heading' | 'photo' | 'gallery' | 'pullquote' | 'divider' | 'map' | 'video' | 'code';

export interface BlockPosition {
  x: number;  // Grid column position (0-11 for 12-col grid)
  y: number;  // Grid row position
  w: number;  // Width in grid columns
  h: number;  // Height in grid rows
}

export interface BaseBlock {
  id: string;
  type: BlockType;
  position: BlockPosition;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: {
    html: string;
    fontSize: number;
    fontFamily: string;
    color: string;
    backgroundColor: string;
    alignment: 'left' | 'center' | 'right' | 'justify';
  };
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  content: {
    text: string;
    level: 1 | 2 | 3;
    fontSize: number;
    color: string;
    alignment: 'left' | 'center' | 'right';
  };
}

export interface PhotoBlock extends BaseBlock {
  type: 'photo';
  content: {
    url: string;
    alt: string;
    caption?: string;
    aspectRatio?: string;
  };
}

export interface GalleryBlock extends BaseBlock {
  type: 'gallery';
  content: {
    photos: Array<{
      url: string;
      alt: string;
      caption?: string;
    }>;
    layout: '2-col' | '3-col' | '4-col';
  };
}

export interface PullQuoteBlock extends BaseBlock {
  type: 'pullquote';
  content: {
    text: string;
    attribution?: string;
    fontSize: number;
  };
}

export interface DividerBlock extends BaseBlock {
  type: 'divider';
  content: {
    style: 'solid' | 'dashed' | 'dotted';
  };
}

export interface MapBlock extends BaseBlock {
  type: 'map';
  content: {
    location: string; // Location name (e.g., "Reykjavik, Iceland")
    latitude: number;
    longitude: number;
    zoom: number; // 1-18
    style: 'color' | 'grayscale' | 'blackwhite';
    showMarker: boolean;
    caption?: string;
  };
}

export interface VideoBlock extends BaseBlock {
  type: 'video';
  content: {
    url: string; // YouTube or Vimeo URL
    platform: 'youtube' | 'vimeo';
    caption?: string;
    aspectRatio: '16:9' | '4:3' | '1:1';
  };
}

export interface CodeBlock extends BaseBlock {
  type: 'code';
  content: {
    code: string;
    language: string; // e.g., 'javascript', 'python', 'html'
    caption?: string;
    showLineNumbers: boolean;
  };
}

export type Block = 
  | TextBlock 
  | HeadingBlock 
  | PhotoBlock 
  | GalleryBlock 
  | PullQuoteBlock 
  | DividerBlock
  | MapBlock
  | VideoBlock
  | CodeBlock;

// ============================================================================
// Post Types
// ============================================================================

export type PostStatus = 'draft' | 'published' | 'archived';

export interface Post {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  status: PostStatus;
  
  // Content
  blocks: Block[];
  
  // Theme
  layoutId: LayoutId;
  paletteId: PaletteId;
  fontPairId: FontPairId;
  
  // Media
  heroImage?: string;
  
  // Metadata
  tags: string[];
  readTime: number; // in minutes
  authorId: string;
  
  // Timestamps
  publishedAt?: string; // ISO 8601
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Author Types
// ============================================================================

export interface Author {
  id: string;
  name: string;
  bio: string;
  photo?: string;
  instagram?: string;
  role: string;
}

// ============================================================================
// Subscriber Types (for later phases)
// ============================================================================

export interface Subscriber {
  id: string;
  email: string;
  name: string;
  confirmed: boolean;
  confirmationToken?: string;
  unsubscribeToken: string;
  subscribedAt?: string;
  createdAt: string;
}

// ============================================================================
// Editor State Types
// ============================================================================

export interface EditorState {
  postId: string | null;
  blocks: Block[];
  postMeta: {
    title: string;
    subtitle: string;
    tags: string[];
    heroImage: string;
    layoutId: LayoutId;
    paletteId: PaletteId;
    fontPairId: FontPairId;
  };
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
}
