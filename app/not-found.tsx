import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-bg flex items-center">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl md:text-8xl font-heading font-bold text-text mb-4">
            404
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8">
            This page doesn't exist
          </p>
          <p className="text-lg text-gray-500 mb-12">
            Looks like you've wandered off the map. Let's get you back on track.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors text-lg"
          >
            Back to Stories
          </Link>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
