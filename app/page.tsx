import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PostCard } from '@/components/PostCard';
import { getPublishedPosts } from '@/data/mockPosts';

export default function HomePage() {
  const posts = getPublishedPosts();

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-bg">
        {/* Hero Section */}
        <section className="bg-surface py-12 md:py-20 border-b border-gray-200">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-text mb-4">
              Stories from the road
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Travel narratives, photo essays, and adventures from around the world
            </p>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600">No published posts yet.</p>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </>
  );
}
