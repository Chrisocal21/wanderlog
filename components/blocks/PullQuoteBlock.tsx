import type { PullQuoteBlock as PullQuoteBlockType } from '@/types';

interface PullQuoteBlockProps {
  block: PullQuoteBlockType;
  isEditor?: boolean;
}

export function PullQuoteBlock({ block, isEditor }: PullQuoteBlockProps) {
  const { text, attribution, fontSize } = block.content;

  return (
    <blockquote 
      className="my-12 border-l-4 border-accent pl-6 md:pl-8 py-4"
      style={{ fontSize: `${fontSize}px` }}
    >
      <p className="font-heading italic text-text leading-relaxed">
        {text}
      </p>
      {attribution && (
        <footer className="mt-4 text-base text-gray-600">
          — {attribution}
        </footer>
      )}
    </blockquote>
  );
}
