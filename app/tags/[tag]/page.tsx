import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PostCard } from '@/components/PostCard';
import { getPostsByTag, getAllUniqueTags } from '@/data/mockPosts';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const tags = getAllUniqueTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.toLowerCase()),
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: encodedTag } = await params;
  const tag = decodeURIComponent(encodedTag);
  
  // Find the original tag case from available tags
  const allTags = getAllUniqueTags();
  const originalTag = allTags.find(t => t.toLowerCase() === tag.toLowerCase());
  
  if (!originalTag) {
    notFound();
  }
  
  const posts = getPostsByTag(originalTag);

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-bg">
        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              Tag
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4">
              {originalTag}
            </h1>
            <p className="text-lg text-gray-600">
              {posts.length} {posts.length === 1 ? 'story' : 'stories'} tagged with {originalTag}
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600">No stories found with this tag.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}
