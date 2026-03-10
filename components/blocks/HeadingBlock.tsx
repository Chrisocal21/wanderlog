import type { HeadingBlock as HeadingBlockType } from '@/types';

interface HeadingBlockProps {
  block: HeadingBlockType;
  isEditor?: boolean;
}

export function HeadingBlock({ block, isEditor }: HeadingBlockProps) {
  const { text, level, fontSize, color, alignment } = block.content;
  
  const styles = {
    fontSize: `${fontSize}px`,
    color,
    textAlign: alignment,
  };

  const className = `font-heading font-bold leading-tight ${
    level === 1 ? 'text-5xl md:text-6xl' : 
    level === 2 ? 'text-3xl md:text-4xl' : 
    'text-2xl md:text-3xl'
  }`;

  if (level === 1) {
    return <h1 className={className} style={styles}>{text}</h1>;
  }
  
  if (level === 2) {
    return <h2 className={className} style={styles}>{text}</h2>;
  }
  
  return <h3 className={className} style={styles}>{text}</h3>;
}
