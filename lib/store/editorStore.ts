import { create } from 'zustand';
import type { Block, Post, EditorState } from '@/types';
import type { LayoutId, PaletteId, FontPairId } from '@/lib/config';
import type { BlogTemplate } from '@/lib/templates';
import { v4 as uuidv4 } from 'uuid';

interface EditorStore extends EditorState {
  // Actions
  setPostId: (id: string | null) => void;
  loadPost: (post: Post) => void;
  createNewPost: () => void;
  loadTemplate: (template: BlogTemplate) => void;
  
  // Block actions
  addBlock: (block: Block) => void;
  updateBlock: (blockId: string, updates: Partial<Block>) => void;
  removeBlock: (blockId: string) => void;
  moveBlockUp: (blockId: string) => void;
  moveBlockDown: (blockId: string) => void;
  reorderBlocks: (startIndex: number, endIndex: number) => void;
  
  // Post meta actions
  updateTitle: (title: string) => void;
  updateSubtitle: (subtitle: string) => void;
  updateHeroImage: (heroImage: string) => void;
  updateTags: (tags: string[]) => void;
  updateLayout: (layoutId: LayoutId) => void;
  updatePalette: (paletteId: PaletteId) => void;
  updateFont: (fontPairId: FontPairId) => void;
  
  // Save state
  markDirty: () => void;
  markClean: () => void;
  setSaving: (saving: boolean) => void;
  setLastSaved: (date: Date) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  // Initial state
  postId: null,
  blocks: [],
  postMeta: {
    title: '',
    subtitle: '',
    tags: [],
    heroImage: '',
    layoutId: 'editorial',
    paletteId: 'desert-dusk',
    fontPairId: 'expedition',
  },
  isDirty: false,
  isSaving: false,
  lastSaved: null,

  // Actions
  setPostId: (id) => set({ postId: id }),

  loadPost: (post) =>
    set({
      postId: post.id,
      blocks: post.blocks,
      postMeta: {
        title: post.title,
        subtitle: post.subtitle || '',
        tags: post.tags,
        heroImage: post.heroImage || '',
        layoutId: post.layoutId,
        paletteId: post.paletteId,
        fontPairId: post.fontPairId,
      },
      isDirty: false,
    }),

  createNewPost: () =>
    set({
      postId: null,
      blocks: [],
      postMeta: {
        title: 'Untitled Story',
        subtitle: '',
        tags: [],
        heroImage: '',
        layoutId: 'editorial',
        paletteId: 'desert-dusk',
        fontPairId: 'expedition',
      },
      isDirty: false,
      lastSaved: null,
    }),

  loadTemplate: (template) =>
    set({
      postId: null,
      blocks: template.blocks.map((block) => ({
        ...block,
        id: uuidv4(),
      })) as Block[],
      postMeta: {
        title: 'Untitled Story',
        subtitle: '',
        tags: [],
        heroImage: '',
        layoutId: template.layoutId,
        paletteId: template.paletteId,
        fontPairId: template.fontPairId,
      },
      isDirty: false,
      lastSaved: null,
    }),

  // Block actions
  addBlock: (block) =>
    set((state) => ({
      blocks: [...state.blocks, block],
      isDirty: true,
    })),

  updateBlock: (blockId, updates) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === blockId ? { ...block, ...updates } as Block : block
      ),
      isDirty: true,
    })),

  removeBlock: (blockId) =>
    set((state) => ({
      blocks: state.blocks.filter((block) => block.id !== blockId),
      isDirty: true,
    })),

  moveBlockUp: (blockId: string) =>
    set((state) => {
      const index = state.blocks.findIndex((b) => b.id === blockId);
      if (index <= 0) return state;
      
      const newBlocks = [...state.blocks];
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
      
      return { blocks: newBlocks, isDirty: true };
    }),

  moveBlockDown: (blockId: string) =>
    set((state) => {
      const index = state.blocks.findIndex((b) => b.id === blockId);
      if (index === -1 || index >= state.blocks.length - 1) return state;
      
      const newBlocks = [...state.blocks];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      
      return { blocks: newBlocks, isDirty: true };
    }),

  reorderBlocks: (startIndex: number, endIndex: number) =>
    set((state) => {
      const newBlocks = [...state.blocks];
      const [removed] = newBlocks.splice(startIndex, 1);
      newBlocks.splice(endIndex, 0, removed);
      
      return { blocks: newBlocks, isDirty: true };
    }),

  // Post meta actions
  updateTitle: (title) =>
    set((state) => ({
      postMeta: { ...state.postMeta, title },
      isDirty: true,
    })),

  updateSubtitle: (subtitle) =>
    set((state) => ({
      postMeta: { ...state.postMeta, subtitle },
      isDirty: true,
    })),

  updateHeroImage: (heroImage) =>
    set((state) => ({
      postMeta: { ...state.postMeta, heroImage },
      isDirty: true,
    })),

  updateTags: (tags) =>
    set((state) => ({
      postMeta: { ...state.postMeta, tags },
      isDirty: true,
    })),

  updateLayout: (layoutId) =>
    set((state) => ({
      postMeta: { ...state.postMeta, layoutId },
      isDirty: true,
    })),

  updatePalette: (paletteId) =>
    set((state) => ({
      postMeta: { ...state.postMeta, paletteId },
      isDirty: true,
    })),

  updateFont: (fontPairId) =>
    set((state) => ({
      postMeta: { ...state.postMeta, fontPairId },
      isDirty: true,
    })),

  // Save state
  markDirty: () => set({ isDirty: true }),
  markClean: () => set({ isDirty: false }),
  setSaving: (isSaving) => set({ isSaving }),
  setLastSaved: (lastSaved) => set({ lastSaved }),
}));
