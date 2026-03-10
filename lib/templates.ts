import type { Block, Post } from '@/types';
import type { LayoutId, PaletteId, FontPairId } from '@/lib/config';

export interface BlogTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: 'travel' | 'minimalist' | 'photo-heavy' | 'storytelling';
  layoutId: LayoutId;
  paletteId: PaletteId;
  fontPairId: FontPairId;
  blocks: Omit<Block, 'id'>[];
}

export const blogTemplates: BlogTemplate[] = [
  {
    id: 'travel-journal',
    name: 'Travel Journal',
    description: 'Perfect for documenting your adventures with photos and stories',
    thumbnail: '🗺️',
    category: 'travel',
    layoutId: 'editorial',
    paletteId: 'sunset',
    fontPairId: 'modern-trek',
    blocks: [
      {
        type: 'text',
        position: { x: 0, y: 0, w: 12, h: 4 },
        content: {
          html: '<p>Our journey began on a crisp autumn morning, with nothing but a backpack and a sense of adventure. The road ahead was uncertain, but that\'s what made it exciting...</p>',
          fontSize: 18,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
      {
        type: 'photo',
        position: { x: 0, y: 4, w: 12, h: 8 },
        content: {
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
          alt: 'Mountain landscape',
          caption: 'The breathtaking view from our first summit',
          aspectRatio: '16/9',
        },
      },
      {
        type: 'map',
        position: { x: 0, y: 12, w: 12, h: 8 },
        content: {
          location: 'Banff, Canada',
          latitude: 51.1784,
          longitude: -115.5708,
          zoom: 10,
          style: 'color',
          showMarker: true,
          caption: 'Our base camp location',
        },
      },
      {
        type: 'pullquote',
        position: { x: 0, y: 20, w: 12, h: 3 },
        content: {
          text: 'The mountains are calling and I must go',
          attribution: 'John Muir',
          fontSize: 28,
        },
      },
    ],
  },
  {
    id: 'minimalist-story',
    name: 'Minimalist Story',
    description: 'Clean, text-focused layout for long-form storytelling',
    thumbnail: '📝',
    category: 'minimalist',
    layoutId: 'minimal',
    paletteId: 'monochrome',
    fontPairId: 'minimal',
    blocks: [
      {
        type: 'heading',
        position: { x: 0, y: 0, w: 12, h: 2 },
        content: {
          text: 'Chapter One: The Beginning',
          level: 2,
          fontSize: 32,
          color: 'var(--color-text)',
          alignment: 'left',
        },
      },
      {
        type: 'text',
        position: { x: 0, y: 2, w: 12, h: 5 },
        content: {
          html: '<p>Sometimes the best stories begin with a single step. This is mine...</p><p>I never imagined that a chance encounter would change everything. But life has a way of surprising us when we least expect it.</p>',
          fontSize: 18,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
      {
        type: 'divider',
        position: { x: 0, y: 7, w: 12, h: 1 },
        content: {
          style: 'solid',
        },
      },
      {
        type: 'text',
        position: { x: 0, y: 8, w: 12, h: 5 },
        content: {
          html: '<p>The journey continues with each new day bringing fresh perspectives and unexpected lessons...</p>',
          fontSize: 18,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
    ],
  },
  {
    id: 'photo-essay',
    name: 'Photo Essay',
    description: 'Image-focused template perfect for visual storytelling',
    thumbnail: '📸',
    category: 'photo-heavy',
    layoutId: 'full-bleed',
    paletteId: 'ocean',
    fontPairId: 'handwritten',
    blocks: [
      {
        type: 'photo',
        position: { x: 0, y: 0, w: 12, h: 10 },
        content: {
          url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
          alt: 'Nature scene',
          caption: 'Every picture tells a story',
          aspectRatio: '16/9',
        },
      },
      {
        type: 'text',
        position: { x: 0, y: 10, w: 12, h: 3 },
        content: {
          html: '<p>Photography is more than capturing moments—it\'s about preserving emotions, telling stories, and sharing perspectives.</p>',
          fontSize: 18,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'center',
        },
      },
      {
        type: 'gallery',
        position: { x: 0, y: 13, w: 12, h: 8 },
        content: {
          photos: [
            {
              url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
              alt: 'Photo 1',
            },
            {
              url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600',
              alt: 'Photo 2',
            },
            {
              url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600',
              alt: 'Photo 3',
            },
          ],
          layout: '3-col',
        },
      },
    ],
  },
  {
    id: 'tech-tutorial',
    name: 'Tech Tutorial',
    description: 'Perfect for code tutorials and technical guides',
    thumbnail: '💻',
    category: 'storytelling',
    layoutId: 'split-screen',
    paletteId: 'jungle',
    fontPairId: 'modern-trek',
    blocks: [
      {
        type: 'heading',
        position: { x: 0, y: 0, w: 12, h: 2 },
        content: {
          text: 'Getting Started Guide',
          level: 1,
          fontSize: 42,
          color: 'var(--color-text)',
          alignment: 'left',
        },
      },
      {
        type: 'text',
        position: { x: 0, y: 2, w: 12, h: 3 },
        content: {
          html: '<p>In this tutorial, we\'ll walk through the essential steps to get you up and running quickly.</p>',
          fontSize: 18,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
      {
        type: 'code',
        position: { x: 0, y: 5, w: 12, h: 6 },
        content: {
          code: '// Step 1: Initialize your project\nconst project = new Project();\n\n// Step 2: Configure settings\nproject.configure({\n  name: "My Awesome Project",\n  version: "1.0.0"\n});',
          language: 'javascript',
          caption: 'Basic project setup',
          showLineNumbers: true,
        },
      },
      {
        type: 'text',
        position: { x: 0, y: 11, w: 12, h: 3 },
        content: {
          html: '<p>Now that we have the basics set up, let\'s move on to the next steps...</p>',
          fontSize: 18,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
    ],
  },
  {
    id: 'video-blog',
    name: 'Video Blog',
    description: 'Showcase your video content with supporting text',
    thumbnail: '🎬',
    category: 'photo-heavy',
    layoutId: 'editorial',
    paletteId: 'sunset',
    fontPairId: 'bold-story',
    blocks: [
      {
        type: 'text',
        position: { x: 0, y: 0, w: 12, h: 3 },
        content: {
          html: '<p>Welcome to this week\'s vlog! Join me as I explore the city and discover hidden gems...</p>',
          fontSize: 18,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
      {
        type: 'video',
        position: { x: 0, y: 3, w: 12, h: 7 },
        content: {
          url: '',
          platform: 'youtube',
          caption: 'Watch the full adventure',
          aspectRatio: '16:9',
        },
      },
      {
        type: 'heading',
        position: { x: 0, y: 10, w: 12, h: 2 },
        content: {
          text: 'Behind the Scenes',
          level: 2,
          fontSize: 32,
          color: 'var(--color-text)',
          alignment: 'left',
        },
      },
      {
        type: 'text',
        position: { x: 0, y: 12, w: 12, h: 4 },
        content: {
          html: '<p>Creating this content was an incredible experience. Here are some of the highlights and challenges we faced along the way...</p>',
          fontSize: 18,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
    ],
  },
  {
    id: 'feature-story',
    name: 'Feature Story',
    description: 'Magazine-style article with rich media and pull quotes',
    thumbnail: '📰',
    category: 'storytelling',
    layoutId: 'full-bleed',
    paletteId: 'monochrome',
    fontPairId: 'expedition',
    blocks: [
      {
        type: 'text',
        position: { x: 0, y: 0, w: 12, h: 5 },
        content: {
          html: '<p>In the heart of the bustling city lies a hidden world that few take time to discover. This is the story of those who do...</p><p>For three months, we followed the daily routines of extraordinary ordinary people, uncovering stories that challenge everything we thought we knew.</p>',
          fontSize: 18,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
      {
        type: 'photo',
        position: { x: 0, y: 5, w: 12, h: 8 },
        content: {
          url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200',
          alt: 'City scene',
          caption: 'The streets tell a thousand stories',
          aspectRatio: '16/9',
        },
      },
      {
        type: 'pullquote',
        position: { x: 0, y: 13, w: 12, h: 3 },
        content: {
          text: 'Every corner has a story waiting to be told',
          attribution: 'Anonymous local resident',
          fontSize: 26,
        },
      },
      {
        type: 'text',
        position: { x: 0, y: 16, w: 12, h: 4 },
        content: {
          html: '<p>The research revealed patterns we never expected. Communities form in the most unexpected places, creating micro-cultures within the larger urban landscape.</p>',
          fontSize: 18,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
      {
        type: 'gallery',
        position: { x: 0, y: 20, w: 12, h: 10 },
        content: {
          photos: [
            { url: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800', alt: 'Scene 1', caption: 'Morning rush' },
            { url: 'https://images.unsplash.com/photo-1522878129833-838a904a0e9e?w=800', alt: 'Scene 2', caption: 'Afternoon calm' },
            { url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800', alt: 'Scene 3', caption: 'Evening lights' },
          ],
          layout: '3-col',
        },
      },
    ],
  },
  {
    id: 'adventure-guide',
    name: 'Adventure Guide',
    description: 'Location-focused with maps and practical travel info',
    thumbnail: '🧭',
    category: 'travel',
    layoutId: 'split-screen',
    paletteId: 'jungle',
    fontPairId: 'modern-trek',
    blocks: [
      {
        type: 'heading',
        position: { x: 0, y: 0, w: 12, h: 2 },
        content: {
          text: 'Getting There',
          level: 2,
          fontSize: 36,
          color: 'var(--color-text)',
          alignment: 'left',
        },
      },
      {
        type: 'text',
        position: { x: 0, y: 2, w: 12, h: 3 },
        content: {
          html: '<p>The trail begins at the northern parking lot, accessible via Highway 7. Early morning starts are recommended to avoid crowds and catch the best light.</p>',
          fontSize: 16,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
      {
        type: 'map',
        position: { x: 0, y: 5, w: 12, h: 8 },
        content: {
          location: 'Yosemite National Park, CA',
          latitude: 37.8651,
          longitude: -119.5383,
          zoom: 11,
          style: 'color',
          showMarker: true,
          caption: 'Trailhead location',
        },
      },
      {
        type: 'heading',
        position: { x: 0, y: 13, w: 12, h: 2 },
        content: {
          text: 'What to Bring',
          level: 2,
          fontSize: 36,
          color: 'var(--color-text)',
          alignment: 'left',
        },
      },
      {
        type: 'text',
        position: { x: 0, y: 15, w: 12, h: 4 },
        content: {
          html: '<ul><li>Plenty of water (2L minimum)</li><li>Sun protection and layers</li><li>Trail map and compass</li><li>First aid kit</li><li>Camera for incredible views</li></ul>',
          fontSize: 16,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
      {
        type: 'photo',
        position: { x: 0, y: 19, w: 12, h: 8 },
        content: {
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
          alt: 'Mountain view',
          caption: 'The reward: views that take your breath away',
          aspectRatio: '16/9',
        },
      },
    ],
  },
  {
    id: 'visual-diary',
    name: 'Visual Diary',
    description: 'Photo-first storytelling with galleries and minimal text',
    thumbnail: '📷',
    category: 'photo-heavy',
    layoutId: 'gallery-lead',
    paletteId: 'sage',
    fontPairId: 'handwritten',
    blocks: [
      {
        type: 'text',
        position: { x: 0, y: 0, w: 12, h: 2 },
        content: {
          html: '<p><em>Day 3: The light was perfect this morning. Sometimes you just have to let the images speak.</em></p>',
          fontSize: 16,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'center',
        },
      },
      {
        type: 'gallery',
        position: { x: 0, y: 2, w: 12, h: 10 },
        content: {
          photos: [
            { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', alt: 'Morning', caption: '6:30 AM' },
            { url: 'https://images.unsplash.com/photo-1472791108553-c9405341e398?w=800', alt: 'Midday', caption: '12:00 PM' },
            { url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800', alt: 'Evening', caption: '7:45 PM' },
          ],
          layout: '3-col',
        },
      },
      {
        type: 'divider',
        position: { x: 0, y: 12, w: 12, h: 1 },
        content: {
          style: 'dotted',
        },
      },
      {
        type: 'photo',
        position: { x: 0, y: 13, w: 12, h: 10 },
        content: {
          url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200',
          alt: 'Landscape',
          caption: 'Sometimes one image says it all',
          aspectRatio: '16/9',
        },
      },
      {
        type: 'text',
        position: { x: 0, y: 23, w: 12, h: 3 },
        content: {
          html: '<p>This journey has taught me to slow down and really see. To notice the way light transforms ordinary moments.</p>',
          fontSize: 16,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'center',
        },
      },
    ],
  },
  {
    id: 'interview-style',
    name: 'Interview Style',
    description: 'Q&A format with quotes and storytelling elements',
    thumbnail: '💬',
    category: 'storytelling',
    layoutId: 'editorial',
    paletteId: 'ocean',
    fontPairId: 'expedition',
    blocks: [
      {
        type: 'text',
        position: { x: 0, y: 0, w: 12, h: 4 },
        content: {
          html: '<p><strong>We sat down with Maria Chen, a photographer documenting remote communities worldwide.</strong></p><p>Her latest project takes us to places few ever see.</p>',
          fontSize: 18,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
      {
        type: 'photo',
        position: { x: 0, y: 4, w: 12, h: 8 },
        content: {
          url: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?w=1200',
          alt: 'Portrait',
          caption: 'Maria at work in the field',
          aspectRatio: '16/9',
        },
      },
      {
        type: 'heading',
        position: { x: 0, y: 12, w: 12, h: 2 },
        content: {
          text: 'What drew you to this work?',
          level: 3,
          fontSize: 24,
          color: 'var(--color-accent)',
          alignment: 'left',
        },
      },
      {
        type: 'text',
        position: { x: 0, y: 14, w: 12, h: 3 },
        content: {
          html: '<p>I have always been fascinated by how we all live different lives yet face similar questions. My camera explores that connection.</p>',
          fontSize: 18,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
      {
        type: 'pullquote',
        position: { x: 0, y: 17, w: 12, h: 3 },
        content: {
          text: 'Every face tells a story. My job is simply to listen.',
          attribution: 'Maria Chen',
          fontSize: 28,
        },
      },
      {
        type: 'heading',
        position: { x: 0, y: 20, w: 12, h: 2 },
        content: {
          text: 'What has been your biggest challenge?',
          level: 3,
          fontSize: 24,
          color: 'var(--color-accent)',
          alignment: 'left',
        },
      },
      {
        type: 'text',
        position: { x: 0, y: 22, w: 12, h: 4 },
        content: {
          html: '<p>Building trust. It takes time for people to feel comfortable sharing their stories. I always return multiple times, building relationships over months.</p>',
          fontSize: 18,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
    ],
  },
  {
    id: 'how-to-guide',
    name: 'How-To Guide',
    description: 'Step-by-step tutorial with clear structure and visuals',
    thumbnail: '📋',
    category: 'storytelling',
    layoutId: 'editorial',
    paletteId: 'arctic',
    fontPairId: 'modern-trek',
    blocks: [
      {
        type: 'text',
        position: { x: 0, y: 0, w: 12, h: 3 },
        content: {
          html: '<p>Planning your first backpacking trip can feel overwhelming. This guide breaks down everything into manageable steps.</p>',
          fontSize: 18,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
      {
        type: 'divider',
        position: { x: 0, y: 3, w: 12, h: 1 },
        content: {
          style: 'solid',
        },
      },
      {
        type: 'heading',
        position: { x: 0, y: 4, w: 12, h: 2 },
        content: {
          text: 'Step 1: Choose Your Destination',
          level: 2,
          fontSize: 32,
          color: 'var(--color-text)',
          alignment: 'left',
        },
      },
      {
        type: 'text',
        position: { x: 0, y: 6, w: 12, h: 3 },
        content: {
          html: '<p>Start with an easy trail, 5-10 miles total. Look for well-marked paths with reliable water sources.</p>',
          fontSize: 16,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
      {
        type: 'photo',
        position: { x: 0, y: 9, w: 12, h: 6 },
        content: {
          url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1200',
          alt: 'Trail map',
          caption: 'Study maps before you go',
          aspectRatio: '16/9',
        },
      },
      {
        type: 'heading',
        position: { x: 0, y: 15, w: 12, h: 2 },
        content: {
          text: 'Step 2: Gather Essential Gear',
          level: 2,
          fontSize: 32,
          color: 'var(--color-text)',
          alignment: 'left',
        },
      },
      {
        type: 'text',
        position: { x: 0, y: 17, w: 12, h: 5 },
        content: {
          html: '<p><strong>The Ten Essentials:</strong></p><ul><li>Navigation (map & compass)</li><li>Sun protection</li><li>Extra layers</li><li>Headlamp</li><li>First aid kit</li></ul>',
          fontSize: 16,
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          backgroundColor: 'transparent',
          alignment: 'left',
        },
      },
      {
        type: 'heading',
        position: { x: 0, y: 22, w: 12, h: 2 },
        content: {
          text: 'Step 3: Practice Leave No Trace',
          level: 2,
          fontSize: 32,
          color: 'var(--color-text)',
          alignment: 'left',
        },
      },
      {
        type: 'pullquote',
        position: { x: 0, y: 24, w: 12, h: 3 },
        content: {
          text: 'Take only memories, leave only footprints',
          attribution: 'Outdoor Ethics',
          fontSize: 26,
        },
      },
    ],
  },
  {
    id: 'blank',
    name: 'Blank Canvas',
    description: 'Start completely from scratch with your own vision',
    thumbnail: '⬜',
    category: 'minimalist',
    layoutId: 'minimal',
    paletteId: 'sunset',
    fontPairId: 'modern-trek',
    blocks: [],
  },
];
