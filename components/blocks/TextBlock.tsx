import type { TextBlock as TextBlockType } from '@/types';

interface TextBlockProps {
  block: TextBlockType;
  isEditor?: boolean;
}

export function TextBlock({ block, isEditor }: TextBlockProps) {
  const styles = {
    fontSize: `${block.content.fontSize}px`,
    fontFamily: block.content.fontFamily,
    color: block.content.color,
    backgroundColor: block.content.backgroundColor,
    textAlign: block.content.alignment,
  };

  return (
    <div 
      className="prose prose-lg max-w-none"
      style={styles}
      dangerouslySetInnerHTML={{ __html: block.content.html }}
    />
  );
}
