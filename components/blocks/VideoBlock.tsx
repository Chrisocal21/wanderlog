'use client';

import type { VideoBlock as VideoBlockType } from '@/types';

interface VideoBlockProps {
  block: VideoBlockType;
  isEditor?: boolean;
}

export function VideoBlock({ block, isEditor = false }: VideoBlockProps) {
  const { url, platform, caption, aspectRatio } = block.content;

  // Extract video ID from URL
  const getVideoId = () => {
    if (platform === 'youtube') {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
      return match ? match[1] : '';
    } else if (platform === 'vimeo') {
      const match = url.match(/vimeo\.com\/(\d+)/);
      return match ? match[1] : '';
    }
    return '';
  };

  const videoId = getVideoId();
  const embedUrl = platform === 'youtube' 
    ? `https://www.youtube.com/embed/${videoId}`
    : `https://player.vimeo.com/video/${videoId}`;

  // Map aspect ratio to padding-bottom percentage
  const aspectRatioMap = {
    '16:9': '56.25%',
    '4:3': '75%',
    '1:1': '100%'
  };

  const paddingBottom = aspectRatioMap[aspectRatio] || aspectRatioMap['16:9'];

  if (!videoId) {
    return (
      <div className="bg-gray-100 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
        <div className="text-4xl mb-2">🎬</div>
        <p className="text-sm text-gray-600">Invalid video URL</p>
      </div>
    );
  }

  return (
    <div className={isEditor ? 'max-w-2xl' : 'max-w-4xl'}>
      <div 
        className="relative bg-black rounded-xl overflow-hidden shadow-lg"
        style={{ paddingBottom }}
      >
        <iframe
          src={embedUrl}
          className="absolute top-0 left-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={caption || 'Video'}
        />
      </div>
      {caption && (
        <p className="text-sm text-gray-600 italic mt-3 text-center">{caption}</p>
      )}
    </div>
  );
}
