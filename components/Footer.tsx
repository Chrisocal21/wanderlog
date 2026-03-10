import { config } from '@/lib/config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">
              {config.blog.name}
            </h3>
            <p className="text-sm text-gray-600">
              {config.blog.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-600 hover:text-accent transition-colors">
                  Recent Stories
                </a>
              </li>
              <li>
                <a href="/tags" className="text-gray-600 hover:text-accent transition-colors">
                  Browse by Tag
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Connect</h3>
            <div className="space-y-2 text-sm">
              {config.social.instagram && (
                <a 
                  href={`https://instagram.com/${config.social.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-accent transition-colors"
                >
                  Instagram {config.social.instagram}
                </a>
              )}
              {config.social.youtube && (
                <a 
                  href={config.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-accent transition-colors"
                >
                  YouTube
                </a>
              )}
              {config.social.tiktok && (
                <a 
                  href={config.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 hover:text-accent transition-colors"
                >
                  TikTok
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          © {currentYear} {config.blog.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
