import type { Post } from '@/types';

const STORAGE_KEY = 'wanderlog_drafts';

export interface DraftMetadata {
  id: string;
  title: string;
  lastModified: string;
}

// Get all drafts metadata
export function getDrafts(): DraftMetadata[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const drafts = localStorage.getItem(STORAGE_KEY);
    return drafts ? JSON.parse(drafts) : [];
  } catch (error) {
    console.error('Error loading drafts:', error);
    return [];
  }
}

// Get a specific draft
export function getDraft(id: string): Partial<Post> | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const draft = localStorage.getItem(`${STORAGE_KEY}_${id}`);
    return draft ? JSON.parse(draft) : null;
  } catch (error) {
    console.error('Error loading draft:', error);
    return null;
  }
}

// Save a draft
export function saveDraft(post: Partial<Post>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const id = post.id || `draft_${Date.now()}`;
    const now = new Date().toISOString();
    
    // Save the full post data
    const postData = {
      ...post,
      id,
      updatedAt: now,
    };
    localStorage.setItem(`${STORAGE_KEY}_${id}`, JSON.stringify(postData));
    
    // Update drafts list
    const drafts = getDrafts();
    const existingIndex = drafts.findIndex(d => d.id === id);
    
    const metadata: DraftMetadata = {
      id,
      title: post.title || 'Untitled Story',
      lastModified: now,
    };
    
    if (existingIndex >= 0) {
      drafts[existingIndex] = metadata;
    } else {
      drafts.push(metadata);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  } catch (error) {
    console.error('Error saving draft:', error);
    throw error;
  }
}

// Delete a draft
export function deleteDraft(id: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(`${STORAGE_KEY}_${id}`);
    
    const drafts = getDrafts().filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  } catch (error) {
    console.error('Error deleting draft:', error);
  }
}
