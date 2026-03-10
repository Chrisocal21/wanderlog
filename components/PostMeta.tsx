import type { Post } from '@/types';
import { getAuthorById } from '@/data/mockAuthors';
import { format } from 'date-fns';
import Image from 'next/image';

interface PostMetaProps {
  post: Post;
  showAvatar?: boolean;
}

export function PostMeta({ post, showAvatar = true }: PostMetaProps) {
  const author = getAuthorById(post.authorId);
  const publishDate = post.publishedAt || post.createdAt;
  const formattedDate = format(new Date(publishDate), 'MMMM d, yyyy');

  return (
    <div className="flex items-center gap-3 text-sm text-gray-600">
      {showAvatar && author?.photo && (
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={author.photo}
            alt={author.name}
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>
      )}
      
      <div className="flex items-center gap-2">
        {author && (
          <>
            <span className="font-medium text-text">{author.name}</span>
            <span>•</span>
          </>
        )}
        <time dateTime={publishDate}>{formattedDate}</time>
        <span>•</span>
        <span>{post.readTime} min read</span>
      </div>
    </div>
  );
}
