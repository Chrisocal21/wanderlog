import type { DividerBlock as DividerBlockType } from '@/types';

interface DividerBlockProps {
  block: DividerBlockType;
  isEditor?: boolean;
}

export function DividerBlock({ block, isEditor }: DividerBlockProps) {
  const { style } = block.content;
  
  const borderStyles = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  return (
    <hr 
      className={`my-12 border-t-2 border-gray-300 ${borderStyles[style]}`}
    />
  );
}
