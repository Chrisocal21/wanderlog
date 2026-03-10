'use client';

import Link from 'next/link';
import { useEditorStore } from '@/lib/store/editorStore';

interface EditorHeaderProps {
  onOpenTemplates?: () => void;
}

export function EditorHeader({ onOpenTemplates }: EditorHeaderProps) {
  const { postMeta, isDirty } = useEditorStore();

  return (
    <div className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xl font-heading font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            WanderLog
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-600">{postMeta.title || 'Untitled Story'}</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Auto-save indicator */}
          {isDirty && (
            <span className="text-xs text-orange-600 flex items-center gap-1">
              <span className="animate-pulse">●</span>
              Saving...
            </span>
          )}
          {!isDirty && (
            <span className="text-xs text-green-600 flex items-center gap-1">
              <span>✓</span>
              Saved
            </span>
          )}

          {/* Templates button */}
          {onOpenTemplates && (
            <button
              onClick={onOpenTemplates}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
            >
              <span>📋</span>
              <span>Templates</span>
            </button>
          )}

          {/* Drafts button */}
          <Link
            href="/editor/drafts"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
          >
            <span>📁</span>
            <span>Drafts</span>
          </Link>

          {/* Exit button */}
          <Link
            href="/"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            Exit
          </Link>
        </div>
      </div>
    </div>
  );
}
