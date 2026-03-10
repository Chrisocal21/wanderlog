import Link from 'next/link';
import { config } from '@/lib/config';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-text">
              {config.blog.name}
            </h1>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-sm md:text-base text-gray-700 hover:text-accent transition-colors"
            >
              Stories
            </Link>
            <Link 
              href="/tags" 
              className="text-sm md:text-base text-gray-700 hover:text-accent transition-colors"
            >
              Tags
            </Link>
            <Link 
              href="/about" 
              className="text-sm md:text-base text-gray-700 hover:text-accent transition-colors"
            >
              About
            </Link>
            <Link 
              href="/editor" 
              className="text-sm md:text-base px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              ✏️ Write
            </Link>
          </nav>
        </div>
        
        <p className="mt-2 text-sm md:text-base text-gray-600 italic">
          {config.blog.tagline}
        </p>
      </div>
    </header>
  );
}
