import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/types';
import { PostMeta } from './PostMeta';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article 
      className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
      data-palette={post.paletteId}
    >
      <Link href={`/posts/${post.slug}`}>
        {post.heroImage && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        
        <div className="p-6 bg-surface">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Title */}
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-text mb-2 group-hover:text-accent transition-colors">
            {post.title}
          </h2>
          
          {/* Subtitle */}
          {post.subtitle && (
            <p className="text-base text-gray-600 mb-4">
              {post.subtitle}
            </p>
          )}
          
          {/* Meta */}
          <PostMeta post={post} />
        </div>
      </Link>
    </article>
  );
}
