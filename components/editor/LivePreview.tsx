'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { BlockRenderer } from '@/components/BlockRenderer';
import { PostMeta } from '@/components/PostMeta';
import Image from 'next/image';

export function LivePreview() {
  const { postMeta, blocks } = useEditorStore();

  // Create a mock post object for PostMeta with stable dates
  const mockPost = {
    id: 'preview',
    slug: 'preview',
    title: postMeta.title,
    subtitle: postMeta.subtitle,
    status: 'draft' as const,
    blocks: [],
    layoutId: postMeta.layoutId,
    paletteId: postMeta.paletteId,
    fontPairId: postMeta.fontPairId,
    heroImage: postMeta.heroImage,
    tags: postMeta.tags,
    readTime: Math.max(1, Math.ceil(blocks.length * 1.5)),
    authorId: 'author-1',
    publishedAt: '2026-03-09T00:00:00.000Z', // Fixed date for preview
    createdAt: '2026-03-09T00:00:00.000Z',
    updatedAt: '2026-03-09T00:00:00.000Z',
  };

  return (
    <article
      className="min-h-screen bg-bg"
      data-palette={postMeta.paletteId}
      data-font={postMeta.fontPairId}
      data-layout={postMeta.layoutId}
    >
      {/* Hero Image (if exists and layout supports it) */}
      {postMeta.heroImage && postMeta.layoutId !== 'minimal' && (
        <div className="relative w-full h-[40vh]">
          <Image
            src={postMeta.heroImage}
            alt={postMeta.title || 'Hero image'}
            fill
            className="object-cover"
            sizes="50vw"
          />
          
          {/* Title Overlay for full-bleed layout */}
          {postMeta.layoutId === 'full-bleed' && (
            <div className="absolute inset-0 bg-black/40 flex items-end">
              <div className="container mx-auto px-4 pb-12">
                <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-3">
                  {postMeta.title || 'Untitled Story'}
                </h1>
                {postMeta.subtitle && (
                  <p className="text-lg md:text-xl text-white/90 mb-4">
                    {postMeta.subtitle}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Post Header (for non-full-bleed layouts) */}
      {postMeta.layoutId !== 'full-bleed' && (
        <header className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-text mb-3">
            {postMeta.title || 'Untitled Story'}
          </h1>
          {postMeta.subtitle && (
            <p className="text-lg md:text-xl text-gray-600 mb-4">
              {postMeta.subtitle}
            </p>
          )}
          <PostMeta post={mockPost} />
          
          {/* Tags */}
          {postMeta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {postMeta.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
      )}

      {/* Post Content */}
      <div className="container mx-auto px-4 pb-12 max-w-4xl">
        {blocks.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p>Add blocks to see your content here...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {blocks.map((block) => (
              <BlockRenderer key={block.id} block={block} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
