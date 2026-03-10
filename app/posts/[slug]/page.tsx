import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PostMeta } from '@/components/PostMeta';
import { BlockRenderer } from '@/components/BlockRenderer';
import { getPostBySlug, getPublishedPosts } from '@/data/mockPosts';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.status !== 'published') {
    notFound();
  }

  return (
    <div
      data-palette={post.paletteId}
      data-font={post.fontPairId}
      data-layout={post.layoutId}
    >
      <Header />

      <article className="min-h-screen bg-bg">
        {/* Hero Image (if exists and layout supports it) */}
        {post.heroImage && post.layoutId !== 'minimal' && (
          <div className="relative w-full h-[50vh] md:h-[70vh]">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            
            {/* Title Overlay for full-bleed layout */}
            {post.layoutId === 'full-bleed' && (
              <div className="absolute inset-0 bg-black/40 flex items-end">
                <div className="container mx-auto px-4 pb-12 md:pb-16">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-4">
                    {post.title}
                  </h1>
                  {post.subtitle && (
                    <p className="text-xl md:text-2xl text-white/90 mb-6">
                      {post.subtitle}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Post Header (for non-full-bleed layouts) */}
        {post.layoutId !== 'full-bleed' && (
          <header className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-text mb-4">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="text-xl md:text-2xl text-gray-600 mb-6">
                {post.subtitle}
              </p>
            )}
            <PostMeta post={post} />
            
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 rounded-full bg-accent/10 text-accent font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
        )}

        {/* Post Content */}
        <div className="container mx-auto px-4 pb-16 max-w-4xl">
          <div className="space-y-6">
            {post.blocks.map((block) => (
              <BlockRenderer key={block.id} block={block} />
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
