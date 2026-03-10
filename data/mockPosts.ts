import type { Post, Block } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Helper to create text blocks
const createTextBlock = (
  text: string, 
  x: number, 
  y: number, 
  w: number = 8, 
  h: number = 4
): Block => ({
  id: uuidv4(),
  type: 'text',
  position: { x, y, w, h },
  content: {
    html: `<p>${text}</p>`,
    fontSize: 18,
    fontFamily: 'var(--font-body)',
    color: 'var(--color-text)',
    backgroundColor: 'transparent',
    alignment: 'left',
  },
});

const createHeadingBlock = (
  text: string,
  x: number,
  y: number,
  w: number = 12,
  h: number = 2
): Block => ({
  id: uuidv4(),
  type: 'heading',
  position: { x, y, w, h },
  content: {
    text,
    level: 2,
    fontSize: 32,
    color: 'var(--color-text)',
    alignment: 'left',
  },
});

const createPhotoBlock = (
  url: string,
  alt: string,
  x: number,
  y: number,
  w: number = 12,
  h: number = 8,
  caption?: string
): Block => ({
  id: uuidv4(),
  type: 'photo',
  position: { x, y, w, h },
  content: {
    url,
    alt,
    caption,
    aspectRatio: '16/9',
  },
});

const createPullQuoteBlock = (
  text: string,
  x: number,
  y: number,
  w: number = 12,
  h: number = 3,
  attribution?: string
): Block => ({
  id: uuidv4(),
  type: 'pullquote',
  position: { x, y, w, h },
  content: {
    text,
    attribution,
    fontSize: 28,
  },
});

const createDividerBlock = (x: number, y: number): Block => ({
  id: uuidv4(),
  type: 'divider',
  position: { x, y, w: 12, h: 1 },
  content: {
    style: 'solid',
  },
});

const createGalleryBlock = (
  photos: Array<{ url: string; alt: string; caption?: string }>,
  x: number,
  y: number,
  w: number = 12,
  h: number = 8
): Block => ({
  id: uuidv4(),
  type: 'gallery',
  position: { x, y, w, h },
  content: {
    photos,
    layout: '3-col',
  },
});

// ============================================================================
// Mock Posts
// ============================================================================

export const mockPosts: Post[] = [
  // Post 1: Iceland Adventure - Full Bleed Layout
  {
    id: 'post-1',
    slug: 'chasing-northern-lights-iceland',
    title: 'Chasing Northern Lights Across Iceland',
    subtitle: 'Three weeks in the land of fire and ice',
    status: 'published',
    layoutId: 'full-bleed',
    paletteId: 'arctic',
    fontPairId: 'expedition',
    heroImage: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=1600',
    tags: ['Iceland', 'Northern Lights', 'Winter', 'Photography'],
    readTime: 8,
    authorId: 'author-1',
    publishedAt: '2026-02-15T10:00:00Z',
    createdAt: '2026-02-10T14:00:00Z',
    updatedAt: '2026-02-15T10:00:00Z',
    blocks: [
      createTextBlock(
        'The first time you see the aurora borealis, it doesn\'t feel real. The sky dances with ribbons of green and purple light, moving like curtains in a cosmic breeze. I\'d been chasing this moment for years, and finally, on a freezing February night outside Reykjavik, the sky delivered.',
        2, 0, 8, 4
      ),
      createPhotoBlock(
        'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=1200',
        'Aurora borealis over snowy mountains',
        0, 4, 12, 8,
        'The aurora appeared around 11 PM and lasted for nearly three hours'
      ),
      createTextBlock(
        'Iceland in winter is not for the faint of heart. Temperatures hover around freezing, daylight lasts only four to five hours, and the roads can be treacherous. But these challenges pale in comparison to what you gain: glaciers, waterfalls frozen in time, and the chance to witness one of nature\'s most spectacular phenomena without the summer crowds.',
        2, 12, 8, 5
      ),
      createHeadingBlock('The Perfect Conditions', 0, 17, 12, 2),
      createTextBlock(
        'Seeing the northern lights requires three things: clear skies, darkness, and solar activity. We monitored aurora forecasts daily through the Icelandic Met Office, watching for nights when the KP index climbed above 3. On the seventh night of our trip, everything aligned.',
        2, 19, 8, 4
      ),
      createPullQuoteBlock(
        'The sky doesn\'t just glow — it moves, breathes, and dances.',
        0, 23, 12, 3,
        'Field notes, February 12, 2026'
      ),
      createGalleryBlock(
        [
          {
            url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600',
            alt: 'Jökulsárlón glacier lagoon',
            caption: 'Jökulsárlón: Where icebergs float to the sea'
          },
          {
            url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600',
            alt: 'Seljalandsfoss waterfall',
            caption: 'You can walk behind Seljalandsfoss waterfall'
          },
          {
            url: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=600',
            alt: 'Kirkjufell mountain',
            caption: 'Kirkjufell, one of Iceland\'s most photographed mountains'
          },
        ],
        0, 26, 12, 8
      ),
      createTextBlock(
        'Beyond the aurora, Iceland offers landscapes that feel alien. We drove the Ring Road, stopping at every waterfall, glacier, and geothermal pool we could find. The Blue Lagoon might be touristy, but there\'s something magical about soaking in hot mineral water while snow falls around you.',
        2, 34, 8, 4
      ),
      createDividerBlock(0, 38),
      createTextBlock(
        'If you\'re planning your own Iceland adventure in winter, rent a 4x4 vehicle, layer your clothing, and be flexible with your itinerary. The weather changes by the hour, roads close without warning, and the best moments often happen when you least expect them. That\'s the beauty of it.',
        2, 39, 8, 4
      ),
    ],
  },

  // Post 2: Japanese Markets - Gallery Lead Layout
  {
    id: 'post-2',
    slug: 'tokyo-fish-market-dawn',
    title: 'Dawn at Tokyo\'s Fish Market',
    subtitle: 'Following tuna from ocean to table',
    status: 'published',
    layoutId: 'gallery-lead',
    paletteId: 'night-market',
    fontPairId: 'modern-trek',
    heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600',
    tags: ['Japan', 'Tokyo', 'Food', 'Markets'],
    readTime: 6,
    authorId: 'author-1',
    publishedAt: '2026-01-20T08:00:00Z',
    createdAt: '2026-01-15T12:00:00Z',
    updatedAt: '2026-01-20T08:00:00Z',
    blocks: [
      createTextBlock(
        'At 5 AM, Toyosu Fish Market is already in full swing. Forklift operators navigate narrow aisles with military precision, moving pallets of frozen tuna that can weigh 400 pounds. Buyers examine fish with flashlights, checking the color and fat content of the meat. The tuna auction happens every morning, and it\'s a ballet of hand signals and subtle nods.',
        2, 0, 8, 5
      ),
      createPhotoBlock(
        'https://images.unsplash.com/photo-1542528180-0c5f0d15273f?w=1200',
        'Fresh tuna at auction',
        0, 5, 12, 8,
        'Bluefin tuna can sell for over $100,000 at the New Year auction'
      ),
      createTextBlock(
        'I\'d arrived in Tokyo three days earlier, determined to see where the city\'s incredible sushi begins. Toyosu replaced the famous Tsukiji Market in 2018, moving to a modern facility on reclaimed land in Tokyo Bay. It\'s less picturesque than its predecessor, but the scale is mind-boggling: 480 wholesale dealers, 600 intermediate wholesalers, and over 40,000 visitors daily.',
        2, 13, 8, 5
      ),
      createHeadingBlock('Inside the Auction', 0, 18, 12, 2),
      createPullQuoteBlock(
        'The best tuna isn\'t just caught — it\'s cultivated, honored, and understood.',
        0, 20, 12, 3
      ),
      createTextBlock(
        'The auction gallery is the only area tourists can access, viewing from behind glass. It\'s disappointing not to be in the thick of it, but you can still feel the energy. Auctioneers chant in rapid-fire Japanese, and within minutes, fish worth thousands of dollars change hands with nothing more than eye contact and subtle gestures.',
        2, 23, 8, 4
      ),
      createGalleryBlock(
        [
          {
            url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
            alt: 'Sushi preparation',
            caption: 'Master chefs prepare sushi nearby'
          },
          {
            url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600',
            alt: 'Market vendors',
            caption: 'Vendors have operated for generations'
          },
          {
            url: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=600',
            alt: 'Fresh seafood display',
            caption: 'Every imaginable type of seafood'
          },
        ],
        0, 27, 12, 8
      ),
      createTextBlock(
        'After the auction, I wandered the outer market, where small restaurants serve breakfast to market workers. I ordered maguro donburi — a bowl of rice topped with fresh tuna that had likely been auctioned an hour earlier. It was simple, perfect, and a reminder that great food doesn\'t need complexity. It just needs respect for the ingredients.',
        2, 35, 8, 5
      ),
    ],
  },

  // Post 3: Desert Camping - Editorial Layout
  {
    id: 'post-3',
    slug: 'alone-in-wadi-rum',
    title: 'Three Days Alone in Wadi Rum',
    subtitle: 'Solitude in Jordan\'s desert valley',
    status: 'published',
    layoutId: 'editorial',
    paletteId: 'desert-dusk',
    fontPairId: 'handwritten',
    heroImage: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=1600',
    tags: ['Jordan', 'Desert', 'Camping', 'Solo Travel'],
    readTime: 7,
    authorId: 'author-1',
    publishedAt: '2026-03-01T12:00:00Z',
    createdAt: '2026-02-25T10:00:00Z',
    updatedAt: '2026-03-01T12:00:00Z',
    blocks: [
      createTextBlock(
        'Wadi Rum is called the Valley of the Moon, and standing among its red sand dunes and towering rock formations, it\'s easy to see why. The landscape feels otherworldly — vast, silent, and humbling. I hired a Bedouin guide to drop me at a remote campsite with three days of supplies, then watched his 4x4 disappear into the desert.',
        2, 0, 8, 5
      ),
      createPhotoBlock(
        'https://images.unsplash.com/photo-1512753360435-329c4535a9a7?w=1200',
        'Wadi Rum desert landscape',
        0, 5, 12, 8,
        'Sunset over the desert — the rocks glow orange and red'
      ),
      createHeadingBlock('Day One: Learning Stillness', 0, 13, 12, 2),
      createTextBlock(
        'The first day was harder than expected. Without the constant noise of civilization — no cars, no phones, no voices — I became acutely aware of my own thoughts. They were loud, anxious, and relentless. I tried to distract myself by setting up camp, but the tent took only twenty minutes. Then it was just me and the desert.',
        2, 15, 8, 5
      ),
      createPullQuoteBlock(
        'Silence isn\'t empty. It\'s full of answers.',
        0, 20, 12, 3,
        'Day two journal entry'
      ),
      createTextBlock(
        'By sunset, something shifted. I stopped fighting the silence and started listening to it. The wind moved across the dunes with a soft whisper. Small insects emerged as the temperature dropped. A bird I couldn\'t identify called out from somewhere far away. The desert wasn\'t empty — I just hadn\'t been paying attention.',
        2, 23, 8, 5
      ),
      createDividerBlock(0, 28),
      createHeadingBlock('Day Two: The Stars', 0, 29, 12, 2),
      createTextBlock(
        'That night, I lay on my back outside the tent and watched the stars. Without light pollution, the Milky Way stretched across the entire sky, so dense with stars it looked like clouds. I\'d seen the night sky before, but never like this. It was overwhelming and oddly comforting — a reminder of how small we are, and how much bigger the universe is.',
        2, 31, 8, 5
      ),
      createPhotoBlock(
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200',
        'Camping under the stars in Wadi Rum',
        0, 36, 12, 8,
        'Night two: Clear skies and infinite stars'
      ),
      createTextBlock(
        'On day three, my guide returned at dawn. As we drove back toward civilization, I felt both grateful and reluctant. The desert had taught me something I couldn\'t quite put into words yet — something about presence, attention, and the value of being uncomfortable. I\'d go back in a heartbeat.',
        2, 44, 8, 4
      ),
    ],
  },

  // Post 4: Patagonia Hiking - Split Screen Layout
  {
    id: 'post-4',
    slug: 'hiking-torres-del-paine',
    title: 'The W Trek Through Patagonia',
    subtitle: 'Five days in Torres del Paine National Park',
    status: 'draft',
    layoutId: 'split-screen',
    paletteId: 'jungle',
    fontPairId: 'bold-story',
    heroImage: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1600',
    tags: ['Chile', 'Patagonia', 'Hiking', 'Mountains'],
    readTime: 10,
    authorId: 'author-1',
    createdAt: '2026-03-05T14:00:00Z',
    updatedAt: '2026-03-08T16:00:00Z',
    blocks: [
      createTextBlock(
        'The W Trek is famous for a reason. Over five days and 50 miles, you traverse some of the most dramatic landscapes in South America: glaciers, granite towers, turquoise lakes, and windswept valleys. It\'s challenging, beautiful, and absolutely worth every blister.',
        2, 0, 8, 4
      ),
      createPhotoBlock(
        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200',
        'Torres del Paine towers',
        0, 4, 12, 8
      ),
      createTextBlock(
        'I started at Las Torres, hiking four hours uphill to see the iconic granite towers at sunrise. The trail was steep, rocky, and relentless, but reaching the base of the towers made everything worthwhile. They rose over 8,000 feet into the air, glowing pink in the early morning light.',
        2, 12, 8, 4
      ),
    ],
  },

  // Post 5: Greek Islands - Minimal Layout
  {
    id: 'post-5',
    slug: 'quiet-days-in-paros',
    title: 'Quiet Days in Paros',
    subtitle: 'Finding solitude in the Greek islands',
    status: 'published',
    layoutId: 'minimal',
    paletteId: 'ocean',
    fontPairId: 'minimal',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600',
    tags: ['Greece', 'Islands', 'Mediterranean', 'Summer'],
    readTime: 5,
    authorId: 'author-1',
    publishedAt: '2026-02-28T14:00:00Z',
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-02-28T14:00:00Z',
    blocks: [
      createTextBlock(
        'Everyone knows Santorini and Mykonos, but Paros remains quietly beautiful. White-washed villages, blue-domed churches, and beaches without the crowds. I rented a small apartment in Naoussa and spent two weeks doing nothing in particular.',
        2, 0, 8, 4
      ),
      createPhotoBlock(
        'https://images.unsplash.com/photo-1601581987809-a874a81309c9?w=1200',
        'Paros village street',
        0, 4, 12, 6,
        'Morning in Naoussa — before the tourists wake'
      ),
      createTextBlock(
        'My days followed a simple rhythm: coffee at the harbor, swimming from rocky coves, afternoon naps, evening walks through marble-paved streets. The local fishermen recognized me after a few days and started saving octopus for me at the morning market.',
        2, 10, 8, 4
      ),
      createPullQuoteBlock(
        'Sometimes the best travel is the kind where nothing happens.',
        0, 14, 12, 3
      ),
      createTextBlock(
        'I didn\'t take many photos. I didn\'t write every day in my journal. I just existed in a place where time moved differently, where the biggest decision was which beach to visit and whether to have wine or ouzo with dinner. It was exactly what I needed.',
        2, 17, 8, 4
      ),
    ],
  },
];

// Helper functions
export const getPostBySlug = (slug: string): Post | undefined => {
  return mockPosts.find(post => post.slug === slug);
};

export const getPostById = (id: string): Post | undefined => {
  return mockPosts.find(post => post.id === id);
};

export const getPublishedPosts = (): Post[] => {
  return mockPosts
    .filter(post => post.status === 'published')
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt);
      const dateB = new Date(b.publishedAt || b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
};

export const getDraftPosts = (): Post[] => {
  return mockPosts
    .filter(post => post.status === 'draft')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
};

export const getAllUniqueTags = (): string[] => {
  const tags = new Set<string>();
  mockPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};

export const getPostsByTag = (tag: string): Post[] => {
  return mockPosts
    .filter(post => post.status === 'published' && post.tags.includes(tag))
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt);
      const dateB = new Date(b.publishedAt || b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
};
