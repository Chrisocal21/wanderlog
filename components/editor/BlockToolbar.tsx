'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { v4 as uuidv4 } from 'uuid';
import type { Block, BlockType } from '@/types';

export function BlockToolbar() {
  const addBlock = useEditorStore((state) => state.addBlock);

  const createBlock = (type: BlockType) => {
    const baseBlock = {
      id: uuidv4(),
      type,
      position: { x: 0, y: 0, w: 12, h: 4 },
    };

    let block: Block;

    switch (type) {
      case 'text':
        block = {
          ...baseBlock,
          type: 'text',
          content: {
            html: '<p>Start writing your story...</p>',
            fontSize: 18,
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text)',
            backgroundColor: 'transparent',
            alignment: 'left',
          },
        };
        break;

      case 'heading':
        block = {
          ...baseBlock,
          type: 'heading',
          position: { x: 0, y: 0, w: 12, h: 2 },
          content: {
            text: 'New Heading',
            level: 2,
            fontSize: 32,
            color: 'var(--color-text)',
            alignment: 'left',
          },
        };
        break;

      case 'photo':
        block = {
          ...baseBlock,
          type: 'photo',
          position: { x: 0, y: 0, w: 12, h: 8 },
          content: {
            url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
            alt: 'Placeholder image',
            caption: '',
            aspectRatio: '16/9',
          },
        };
        break;

      case 'gallery':
        block = {
          ...baseBlock,
          type: 'gallery',
          position: { x: 0, y: 0, w: 12, h: 8 },
          content: {
            photos: [
              {
                url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600',
                alt: 'Photo 1',
              },
              {
                url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
                alt: 'Photo 2',
              },
              {
                url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600',
                alt: 'Photo 3',
              },
            ],
            layout: '3-col',
          },
        };
        break;

      case 'pullquote':
        block = {
          ...baseBlock,
          type: 'pullquote',
          position: { x: 0, y: 0, w: 12, h: 3 },
          content: {
            text: 'Your quote here...',
            attribution: '',
            fontSize: 28,
          },
        };
        break;

      case 'divider':
        block = {
          ...baseBlock,
          type: 'divider',
          position: { x: 0, y: 0, w: 12, h: 1 },
          content: {
            style: 'solid',
          },
        };
        break;

      case 'map':
        block = {
          ...baseBlock,
          type: 'map',
          position: { x: 0, y: 0, w: 12, h: 8 },
          content: {
            location: 'Reykjavik, Iceland',
            latitude: 64.1466,
            longitude: -21.9426,
            zoom: 12,
            style: 'color',
            showMarker: true,
            caption: '',
          },
        };
        break;

      case 'video':
        block = {
          ...baseBlock,
          type: 'video',
          position: { x: 0, y: 0, w: 12, h: 7 },
          content: {
            url: '',
            platform: 'youtube',
            caption: '',
            aspectRatio: '16:9',
          },
        };
        break;

      case 'code':
        block = {
          ...baseBlock,
          type: 'code',
          position: { x: 0, y: 0, w: 12, h: 6 },
          content: {
            code: '// Your code here\nconsole.log("Hello, World!");',
            language: 'javascript',
            caption: '',
            showLineNumbers: true,
          },
        };
        break;

      default:
        return;
    }

    addBlock(block);
  };

  const blockTypes: { type: BlockType; label: string; icon: string; preview: React.ReactNode }[] = [
    { 
      type: 'text', 
      label: 'Text', 
      icon: '📝',
      preview: (
        <div className="space-y-1">
          <div className="h-1 bg-gray-300 rounded w-full"></div>
          <div className="h-1 bg-gray-300 rounded w-5/6"></div>
          <div className="h-1 bg-gray-300 rounded w-4/5"></div>
        </div>
      )
    },
    { 
      type: 'heading', 
      label: 'Heading', 
      icon: '📰',
      preview: (
        <div className="h-2 bg-gray-400 rounded w-2/3"></div>
      )
    },
    { 
      type: 'photo', 
      label: 'Photo', 
      icon: '🖼️',
      preview: (
        <div className="h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded"></div>
      )
    },
    { 
      type: 'gallery', 
      label: 'Gallery', 
      icon: '🎨',
      preview: (
        <div className="grid grid-cols-3 gap-1">
          <div className="h-8 bg-gradient-to-br from-pink-400 to-orange-500 rounded"></div>
          <div className="h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded"></div>
          <div className="h-8 bg-gradient-to-br from-indigo-400 to-blue-500 rounded"></div>
        </div>
      )
    },
    { 
      type: 'pullquote', 
      label: 'Quote', 
      icon: '💬',
      preview: (
        <div className="border-l-2 border-gray-400 pl-2 space-y-1">
          <div className="h-1 bg-gray-400 rounded w-full"></div>
          <div className="h-1 bg-gray-400 rounded w-4/5"></div>
        </div>
      )
    },
    { 
      type: 'divider', 
      label: 'Divider', 
      icon: '➖',
      preview: (
        <div className="h-0.5 bg-gray-300 rounded w-full"></div>
      )
    },
    { 
      type: 'map', 
      label: 'Map', 
      icon: '🗺️',
      preview: (
        <div className="h-12 rounded bg-gradient-to-br from-emerald-300 to-teal-400 relative overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
            `,
            backgroundSize: '10px 10px',
          }}></div>
          <div className="absolute top-1 left-1 text-xs">📍</div>
        </div>
      )
    },
    { 
      type: 'video', 
      label: 'Video', 
      icon: '🎬',
      preview: (
        <div className="h-12 rounded bg-gradient-to-br from-red-400 to-pink-500 relative overflow-hidden flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[6px] border-l-red-500 border-y-[4px] border-y-transparent ml-0.5"></div>
          </div>
        </div>
      )
    },
    { 
      type: 'code', 
      label: 'Code', 
      icon: '💻',
      preview: (
        <div className="h-12 rounded bg-gray-800 p-1 space-y-0.5">
          <div className="h-1 bg-purple-400 rounded w-2/3"></div>
          <div className="h-1 bg-blue-400 rounded w-full"></div>
          <div className="h-1 bg-green-400 rounded w-4/5"></div>
          <div className="h-1 bg-yellow-400 rounded w-1/2"></div>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {blockTypes.map(({ type, label, icon, preview }) => (
          <button
            key={type}
            onClick={() => createBlock(type)}
            className="p-3 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-left bg-white group"
          >
            <div className="text-2xl mb-2">{icon}</div>
            <div className="mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
              {preview}
            </div>
            <div className="text-xs font-semibold text-gray-700 group-hover:text-blue-600">
              {label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
