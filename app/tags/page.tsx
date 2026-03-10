import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAllUniqueTags, getPublishedPosts } from '@/data/mockPosts';

export default function TagsPage() {
  const tags = getAllUniqueTags();
  const posts = getPublishedPosts();
  
  // Count posts per tag
  const tagCounts = tags.map(tag => ({
    tag,
    count: posts.filter(post => post.tags.includes(tag)).length,
  }));

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-bg">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4">
            Browse by Tag
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Explore stories organized by destination and theme
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tagCounts.map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                className="group p-6 bg-surface rounded-lg border border-gray-200 hover:border-accent hover:shadow-md transition-all duration-300"
              >
                <h2 className="text-xl font-heading font-bold text-text group-hover:text-accent transition-colors mb-2">
                  {tag}
                </h2>
                <p className="text-sm text-gray-600">
                  {count} {count === 1 ? 'story' : 'stories'}
                </p>
              </Link>
            ))}
          </div>

          {tags.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600">No tags yet.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}
