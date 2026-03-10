import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { config } from '@/lib/config';
import { mockAuthors } from '@/data/mockAuthors';

export default function AboutPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-bg">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          {/* Header */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-text mb-6">
            About {config.blog.name}
          </h1>
          
          {/* Mission */}
          <div className="prose prose-lg max-w-none mb-16">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              {config.blog.tagline}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              We believe that travel stories deserve to be told beautifully. {config.blog.name} 
              is a platform where writers and photographers can craft immersive narratives 
              that capture the essence of exploration—the unexpected moments, the quiet reflections, 
              and the transformative experiences that come from venturing into the unknown.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Every story on {config.blog.name} is carefully designed with custom typography, 
              color palettes, and layouts that match the mood and spirit of each journey. 
              From the frozen landscapes of Iceland to the bustling markets of Tokyo, we bring 
              these destinations to life through words and images.
            </p>
          </div>

          {/* Authors */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading font-bold text-text mb-8">
              Our Contributors
            </h2>
            
            <div className="space-y-8">
              {mockAuthors.map((author) => (
                <div key={author.id} className="flex flex-col md:flex-row gap-6 p-6 bg-surface rounded-lg border border-gray-200">
                  {author.photo && (
                    <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={author.photo}
                        alt={author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-heading font-bold text-text mb-1">
                      {author.name}
                    </h3>
                    <p className="text-accent text-sm font-medium mb-3">
                      {author.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      {author.bio}
                    </p>
                    {author.instagram && (
                      <a
                        href={`https://instagram.com/${author.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm text-accent hover:underline"
                      >
                        {author.instagram}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Philosophy */}
          <div className="prose prose-lg max-w-none mb-16">
            <h2 className="text-3xl font-heading font-bold text-text mb-6">
              Our Philosophy
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Travel isn't just about checking destinations off a list—it's about connection, 
              discovery, and growth. We focus on slow travel, deep cultural immersion, and 
              sustainable tourism practices. Our stories highlight local communities, authentic 
              experiences, and the transformative power of stepping outside your comfort zone.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We're committed to responsible storytelling that respects the places we visit 
              and the people who call them home. Every journey leaves an impact—we strive 
              to make ours positive.
            </p>
          </div>

          {/* Connect */}
          <div className="bg-surface rounded-lg border border-gray-200 p-8 text-center">
            <h2 className="text-3xl font-heading font-bold text-text mb-4">
              Join the Journey
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Follow along for new stories, travel tips, and behind-the-scenes moments
            </p>
            <div className="flex justify-center gap-6">
              {config.social.instagram && (
                <a
                  href={`https://instagram.com/${config.social.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
                >
                  Follow on Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
