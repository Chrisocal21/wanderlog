'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/types';

export default function DraftsPage() {
  const router = useRouter();
  const [drafts, setDrafts] = useState<Post[]>([]);

  useEffect(() => {
    // Load all drafts from localStorage
    const loadDrafts = () => {
      const allDrafts: Post[] = [];
      
      // Check localStorage for draft keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('wanderlog-draft-')) {
          try {
            const draftData = localStorage.getItem(key);
            if (draftData) {
              const post: Post = JSON.parse(draftData);
              allDrafts.push(post);
            }
          } catch (error) {
            console.error('Error loading draft:', error);
          }
        }
      }
      
      // Sort by updated date (most recent first)
      allDrafts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      setDrafts(allDrafts);
    };

    loadDrafts();
  }, []);

  const handleDeleteDraft = (draftId: string) => {
    if (confirm('Are you sure you want to delete this draft? This action cannot be undone.')) {
      localStorage.removeItem(`wanderlog-draft-${draftId}`);
      setDrafts(drafts.filter(d => d.id !== draftId));
    }
  };

  const handleLoadDraft = (draftId: string) => {
    router.push(`/editor?draft=${draftId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/"
                className="text-2xl font-heading font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                WanderLog
              </Link>
              <p className="text-gray-600 mt-1">Manage your drafts</p>
            </div>
            <Link
              href="/editor"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              + New Story
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {drafts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No drafts yet</h2>
            <p className="text-gray-600 mb-6">Start writing your first story</p>
            <Link
              href="/editor"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Create New Story
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Your Drafts</h1>
              <p className="text-gray-600 mt-1">{drafts.length} draft{drafts.length !== 1 ? 's' : ''}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Hero Image or Placeholder */}
                  {draft.heroImage ? (
                    <div className="relative w-full h-48 bg-gray-100">
                      <Image
                        src={draft.heroImage}
                        alt={draft.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-5xl">📄</span>
                    </div>
                  )}

                  {/* Draft Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {draft.title || 'Untitled Story'}
                    </h3>
                    {draft.subtitle && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{draft.subtitle}</p>
                    )}
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <span>{draft.blocks.length} block{draft.blocks.length !== 1 ? 's' : ''}</span>
                      <span>•</span>
                      <span>{formatDate(draft.updatedAt)}</span>
                    </div>

                    {/* Tags */}
                    {draft.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {draft.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {draft.tags.length > 3 && (
                          <span className="text-xs px-2 py-1 text-gray-500">
                            +{draft.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLoadDraft(draft.id)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDraft(draft.id)}
                        className="px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
                        title="Delete draft"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
