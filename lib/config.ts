// Blog Configuration
export const config = {
  blog: {
    name: "WanderLog",
    tagline: "Stories from the road, beautifully told",
    description: "A travel blog capturing adventures from around the world",
    baseUrl: "https://wanderlog.com", // Update in production
  },
  
  // Default theme for new posts
  defaultTheme: {
    layoutId: "editorial" as const,
    paletteId: "desert-dusk" as const,
    fontPairId: "expedition" as const,
  },
  
  // Layout templates
  layouts: [
    {
      id: "editorial" as const,
      name: "Editorial",
      description: "Constrained text column, generous whitespace, classic longform",
    },
    {
      id: "full-bleed" as const,
      name: "Full Bleed",
      description: "Hero image stretches full viewport, title overlaid",
    },
    {
      id: "split-screen" as const,
      name: "Split Screen",
      description: "Vertical split — image one side, text the other",
    },
    {
      id: "gallery-lead" as const,
      name: "Gallery Lead",
      description: "Post opens with photo grid, then writing begins",
    },
    {
      id: "minimal" as const,
      name: "Minimal",
      description: "No hero image — just title, date, and blocks",
    },
  ],
  
  // Color palettes
  palettes: [
    {
      id: "desert-dusk" as const,
      name: "Desert Dusk",
      description: "Golden hour, warm sand, adventure",
      colors: { bg: "#F7F0E8", text: "#3D2B1F", accent: "#C8956C", surface: "#EFE4D6" },
    },
    {
      id: "arctic" as const,
      name: "Arctic",
      description: "Open skies, crisp air, wide open spaces",
      colors: { bg: "#F0F7FF", text: "#1A2D3D", accent: "#4A90B8", surface: "#E3F0FF" },
    },
    {
      id: "jungle" as const,
      name: "Jungle",
      description: "Dense green, heat, lush and alive",
      colors: { bg: "#F0FFF4", text: "#1B2E25", accent: "#2D6A4F", surface: "#E0F5E8" },
    },
    {
      id: "monochrome" as const,
      name: "Monochrome",
      description: "Timeless, elegant, black and white",
      colors: { bg: "#F5F5F5", text: "#1A1A1A", accent: "#555555", surface: "#E8E8E8" },
    },
    {
      id: "sunset" as const,
      name: "Sunset",
      description: "Pink and orange warmth",
      colors: { bg: "#FFF8F0", text: "#2D1A1F", accent: "#E8485A", surface: "#FFE8DC" },
    },
    {
      id: "ocean" as const,
      name: "Ocean",
      description: "Coastal calm, deep blue",
      colors: { bg: "#F0FAFF", text: "#0A2C3D", accent: "#0077B6", surface: "#D9F0FF" },
    },
    {
      id: "night-market" as const,
      name: "Night Market",
      description: "Dark, moody, electric atmosphere",
      colors: { bg: "#1A1218", text: "#F5F0E8", accent: "#FFD166", surface: "#2D242A" },
    },
    {
      id: "sage" as const,
      name: "Sage",
      description: "Earthy, soft, grounded",
      colors: { bg: "#F5F8F5", text: "#2A3A2D", accent: "#6B8F71", surface: "#E8F0EA" },
    },
  ],
  
  // Font pairings
  fontPairings: [
    {
      id: "expedition" as const,
      name: "Expedition",
      description: "A travel magazine — classic and refined",
      heading: "Playfair Display",
      body: "Source Serif Pro",
    },
    {
      id: "modern-trek" as const,
      name: "Modern Trek",
      description: "Sharp and contemporary",
      heading: "DM Serif Display",
      body: "Inter",
    },
    {
      id: "handwritten" as const,
      name: "Handwritten",
      description: "A personal journal — warm and intimate",
      heading: "Lora",
      body: "Lato",
    },
    {
      id: "bold-story" as const,
      name: "Bold Story",
      description: "Confident and strong",
      heading: "Libre Baskerville",
      body: "Open Sans",
    },
    {
      id: "minimal" as const,
      name: "Minimal",
      description: "Clean, quiet, no-frills",
      heading: "Space Grotesk",
      body: "Space Grotesk",
    },
  ],
  
  // Authors
  authors: [
    {
      id: "author-1",
      name: "Alex Rivers",
      role: "Photographer & Writer",
      bio: "Documenting the world one adventure at a time. Based nowhere, exploring everywhere.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      instagram: "@alexrivers",
    },
  ],
  
  // Social links
  social: {
    instagram: "@wanderlog",
    youtube: "",
    tiktok: "",
  },
} as const;

// Type exports
export type LayoutId = typeof config.layouts[number]['id'];
export type PaletteId = typeof config.palettes[number]['id'];
export type FontPairId = typeof config.fontPairings[number]['id'];
