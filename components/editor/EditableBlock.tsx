'use client';

import { useState, useEffect } from 'react';
import { useEditorStore } from '@/lib/store/editorStore';
import { BlockRenderer } from '@/components/BlockRenderer';
import type { Block, TextBlock as TextBlockType, HeadingBlock as HeadingBlockType, PhotoBlock as PhotoBlockType, PullQuoteBlock as PullQuoteBlockType, MapBlock as MapBlockType, VideoBlock as VideoBlockType, CodeBlock as CodeBlockType } from '@/types';

interface EditableBlockProps {
  block: Block;
  index: number;
  totalBlocks: number;
}

export function EditableBlock({ block, index, totalBlocks }: EditableBlockProps) {
  const { updateBlock, removeBlock, moveBlockUp, moveBlockDown } = useEditorStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDelete = () => {
    if (confirm('Delete this block?')) {
      removeBlock(block.id);
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', block.id);
    e.dataTransfer.setData('blockIndex', index.toString());
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData('blockIndex'));
    
    if (draggedIndex !== index && !isNaN(draggedIndex)) {
      const reorderBlocks = useEditorStore.getState().reorderBlocks;
      reorderBlocks(draggedIndex, index);
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`group relative border-2 border-dashed rounded-xl p-6 transition-all bg-white ${
        isDragging 
          ? 'border-blue-500 opacity-50 shadow-xl scale-105' 
          : 'border-transparent hover:border-blue-300 hover:shadow-md'
      }`}
    >
      {/* Drag handle & controls */}
      <div className="absolute -top-3 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-between z-10">
        {/* Left side - Drag handle and move buttons */}
        <div className="flex items-center gap-1 bg-white rounded-lg shadow-lg border border-gray-200 p-1">
          <div
            className="px-2.5 py-1.5 rounded text-xs font-bold cursor-grab active:cursor-grabbing hover:bg-gray-100 text-gray-600 transition-colors"
            title="Drag to reorder"
          >
            ⋮⋮
          </div>
          <div className="w-px h-5 bg-gray-200"></div>
          <button
            onClick={() => moveBlockUp(block.id)}
            disabled={index === 0}
            className="px-2.5 py-1.5 rounded text-sm font-medium hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Move up"
          >
            ↑
          </button>
          <button
            onClick={() => moveBlockDown(block.id)}
            disabled={index === totalBlocks - 1}
            className="px-2.5 py-1.5 rounded text-sm font-medium hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Move down"
          >
            ↓
          </button>
        </div>

        {/* Right side - Edit and delete */}
        <div className="flex items-center gap-1 bg-white rounded-lg shadow-lg border border-gray-200 p-1">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1.5 rounded text-xs font-semibold hover:bg-blue-50 text-blue-600 transition-colors"
          >
            {isEditing ? '✓ Done' : '✏️ Edit'}
          </button>
          <div className="w-px h-5 bg-gray-200"></div>
          <button
            onClick={handleDelete}
            className="px-2.5 py-1.5 rounded text-sm hover:bg-red-50 text-red-600 transition-colors"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Block content */}
      <div className={isDragging ? 'pointer-events-none' : ''}>
        {isEditing ? (
          <BlockEditor block={block} onClose={() => setIsEditing(false)} />
        ) : (
          <BlockRenderer block={block} isEditor />
        )}
      </div>
    </div>
  );
}

function BlockEditor({ block, onClose }: { block: Block; onClose: () => void }) {
  const updateBlock = useEditorStore((state) => state.updateBlock);

  const handleSave = (updatedBlock: Block) => {
    updateBlock(block.id, updatedBlock);
    onClose();
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
      {/* Text Block Editor */}
      {block.type === 'text' && (
        <TextBlockEditor block={block} onSave={handleSave} onCancel={onClose} />
      )}

      {/* Heading Block Editor */}
      {block.type === 'heading' && (
        <HeadingBlockEditor block={block} onSave={handleSave} onCancel={onClose} />
      )}

      {/* Photo Block Editor */}
      {block.type === 'photo' && (
        <PhotoBlockEditor block={block} onSave={handleSave} onCancel={onClose} />
      )}

      {/* Pull Quote Editor */}
      {block.type === 'pullquote' && (
        <PullQuoteBlockEditor block={block} onSave={handleSave} onCancel={onClose} />
      )}

      {/* Map Editor */}
      {block.type === 'map' && (
        <MapBlockEditor block={block} onSave={handleSave} onCancel={onClose} />
      )}

      {/* Video Editor */}
      {block.type === 'video' && (
        <VideoBlockEditor block={block} onSave={handleSave} onCancel={onClose} />
      )}

      {/* Code Editor */}
      {block.type === 'code' && (
        <CodeBlockEditor block={block} onSave={handleSave} onCancel={onClose} />
      )}

      {/* Other blocks */}
      {(block.type === 'gallery' || block.type === 'divider') && (
        <div className="text-center py-6">
          <div className="text-4xl mb-3">🚧</div>
          <p className="text-sm text-gray-700 font-medium mb-4">
            {block.type === 'gallery' ? 'Gallery' : 'Divider'} editing coming soon
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 shadow-sm border border-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

function TextBlockEditor({ block, onSave, onCancel }: { block: TextBlockType; onSave: (block: Block) => void; onCancel: () => void }) {
  const [content, setContent] = useState(block.content.html.replace(/<\/?p>/g, ''));
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useState<HTMLDivElement | null>(null)[0];

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const createLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerHTML);
  };

  const handleSave = () => {
    onSave({ ...block, content: { ...block.content, html: `<p>${content}</p>` } });
  };

  // Handle Escape key to exit fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isFullscreen]);

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col">
        {/* Google Docs-like Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Edit Text Block</h2>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                title="Exit Fullscreen (Esc)"
              >
                Exit Fullscreen
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                ✓ Save
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="px-6 py-2 flex items-center gap-1 border-t border-gray-100">
            <button
              type="button"
              onClick={() => formatText('bold')}
              className="p-2.5 hover:bg-gray-100 rounded transition-colors group"
              title="Bold (Ctrl+B)"
            >
              <span className="font-bold text-gray-700 group-hover:text-gray-900">B</span>
            </button>
            <button
              type="button"
              onClick={() => formatText('italic')}
              className="p-2.5 hover:bg-gray-100 rounded transition-colors group"
              title="Italic (Ctrl+I)"
            >
              <span className="italic font-serif text-gray-700 group-hover:text-gray-900">I</span>
            </button>
            <button
              type="button"
              onClick={() => formatText('underline')}
              className="p-2.5 hover:bg-gray-100 rounded transition-colors group"
              title="Underline (Ctrl+U)"
            >
              <span className="underline text-gray-700 group-hover:text-gray-900">U</span>
            </button>
            <button
              type="button"
              onClick={() => formatText('strikeThrough')}
              className="p-2.5 hover:bg-gray-100 rounded transition-colors group"
              title="Strikethrough"
            >
              <span className="line-through text-gray-700 group-hover:text-gray-900">S</span>
            </button>
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <button
              type="button"
              onClick={createLink}
              className="p-2.5 hover:bg-gray-100 rounded transition-colors"
              title="Insert Link (Ctrl+K)"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => formatText('unlink')}
              className="p-2.5 hover:bg-gray-100 rounded transition-colors"
              title="Remove Link"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <button
              type="button"
              onClick={() => formatText('insertOrderedList')}
              className="p-2.5 hover:bg-gray-100 rounded transition-colors"
              title="Numbered List"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => formatText('insertUnorderedList')}
              className="p-2.5 hover:bg-gray-100 rounded transition-colors"
              title="Bullet List"
            >
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="2" />
                <circle cx="6" cy="12" r="2" />
                <circle cx="6" cy="18" r="2" />
                <rect x="10" y="5" width="10" height="2" rx="1" />
                <rect x="10" y="11" width="10" height="2" rx="1" />
                <rect x="10" y="17" width="10" height="2" rx="1" />
              </svg>
            </button>
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <button
              type="button"
              onClick={() => formatText('justifyLeft')}
              className="p-2.5 hover:bg-gray-100 rounded transition-colors"
              title="Align Left"
            >
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="2" rx="1" />
                <rect x="3" y="9" width="14" height="2" rx="1" />
                <rect x="3" y="13" width="16" height="2" rx="1" />
                <rect x="3" y="17" width="12" height="2" rx="1" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => formatText('justifyCenter')}
              className="p-2.5 hover:bg-gray-100 rounded transition-colors"
              title="Align Center"
            >
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="2" rx="1" />
                <rect x="5" y="9" width="14" height="2" rx="1" />
                <rect x="4" y="13" width="16" height="2" rx="1" />
                <rect x="6" y="17" width="12" height="2" rx="1" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => formatText('justifyRight')}
              className="p-2.5 hover:bg-gray-100 rounded transition-colors"
              title="Align Right"
            >
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="2" rx="1" />
                <rect x="7" y="9" width="14" height="2" rx="1" />
                <rect x="5" y="13" width="16" height="2" rx="1" />
                <rect x="9" y="17" width="12" height="2" rx="1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Document-like Editing Area */}
        <div className="flex-1 overflow-y-auto py-12 px-4">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg min-h-[calc(100vh-250px)]">
            <div
              ref={(el) => {
                if (el && !editorRef) {
                  el.innerHTML = content;
                }
              }}
              contentEditable
              onInput={handleInput}
              className="px-16 py-12 focus:outline-none text-gray-900 leading-relaxed"
              style={{ fontSize: '16px', lineHeight: '1.8' }}
            />
          </div>
          <div className="text-center mt-4 text-xs text-gray-500">
            Tip: Select text to format it with the toolbar above
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Content</span>
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            Fullscreen Editor
          </button>
        </div>
        
        {/* Rich Text Toolbar */}
        <div className="flex flex-wrap gap-1 p-2 bg-gray-100 rounded-t-xl border-2 border-b-0 border-gray-200">
          <button
            type="button"
            onClick={() => formatText('bold')}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Bold (Ctrl+B)"
          >
            <span className="font-bold text-gray-700">B</span>
          </button>
          <button
            type="button"
            onClick={() => formatText('italic')}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Italic (Ctrl+I)"
          >
            <span className="italic font-serif text-gray-700">I</span>
          </button>
          <button
            type="button"
            onClick={() => formatText('underline')}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Underline (Ctrl+U)"
          >
            <span className="underline text-gray-700">U</span>
          </button>
          <button
            type="button"
            onClick={() => formatText('strikeThrough')}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Strikethrough"
          >
            <span className="line-through text-gray-700">S</span>
          </button>
          <div className="w-px bg-gray-300 mx-1"></div>
          <button
            type="button"
            onClick={createLink}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Insert Link"
          >
            🔗
          </button>
          <button
            type="button"
            onClick={() => formatText('unlink')}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Remove Link"
          >
            ⛓️‍💥
          </button>
          <div className="w-px bg-gray-300 mx-1"></div>
          <button
            type="button"
            onClick={() => formatText('insertOrderedList')}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Numbered List"
          >
            1️⃣
          </button>
          <button
            type="button"
            onClick={() => formatText('insertUnorderedList')}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Bullet List"
          >
            •
          </button>
          <div className="w-px bg-gray-300 mx-1"></div>
          <button
            type="button"
            onClick={() => formatText('justifyLeft')}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Align Left"
          >
            ⬅️
          </button>
          <button
            type="button"
            onClick={() => formatText('justifyCenter')}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Align Center"
          >
            ↔️
          </button>
          <button
            type="button"
            onClick={() => formatText('justifyRight')}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Align Right"
          >
            ➡️
          </button>
        </div>

        {/* Rich Text Editor */}
        <div
          ref={(el) => {
            if (el && !editorRef) {
              el.innerHTML = content;
            }
          }}
          contentEditable
          onInput={handleInput}
          className="min-h-[200px] px-4 py-3 border-2 border-gray-200 rounded-b-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm focus:outline-none"
          style={{ maxHeight: '400px', overflowY: 'auto' }}
        />
        <p className="text-xs text-gray-500 mt-2">
          Tip: Select text to format it with the toolbar above
        </p>
      </div>

      <div className="flex gap-2 pt-4">
        <button
          onClick={handleSave}
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors"
        >
          ✓ Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-3 bg-white text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 border border-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function HeadingBlockEditor({ block, onSave, onCancel }: { block: HeadingBlockType; onSave: (block: Block) => void; onCancel: () => void }) {
  const [text, setText] = useState(block.content.text);
  const [level, setLevel] = useState(block.content.level);

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Heading Text</span>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
          placeholder="Your heading..."
        />
      </label>
      <label className="block">
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Level</span>
        <select
          value={level}
          onChange={(e) => setLevel(Number(e.target.value) as 1 | 2 | 3)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        >
          <option value={1}>H1</option>
          <option value={2}>H2</option>
          <option value={3}>H3</option>
        </select>
      </label>
      <div className="flex gap-2 pt-4">
        <button
          onClick={() => onSave({ ...block, content: { ...block.content, text, level } })}
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors"
        >
          ✓ Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-3 bg-white text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 border border-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function PhotoBlockEditor({ block, onSave, onCancel }: { block: PhotoBlockType; onSave: (block: Block) => void; onCancel: () => void }) {
  const [url, setUrl] = useState(block.content.url);
  const [caption, setCaption] = useState(block.content.caption || '');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useState<HTMLInputElement | null>(null)[0];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setUrl(base64String);
        setIsUploading(false);
      };
      reader.onerror = () => {
        alert('Error reading file');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert('Error uploading image');
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Image Preview */}
      {url && (
        <div className="relative rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200">
          <img 
            src={url} 
            alt="Preview" 
            className="w-full h-48 object-cover"
          />
          <button
            onClick={() => setUrl('')}
            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 shadow-lg"
          >
            ✕ Remove
          </button>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex gap-2">
        <input
          ref={(ref) => { if (ref) (fileInputRef as any) = ref; }}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={() => (fileInputRef as any)?.click()}
          disabled={isUploading}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-purple-700 hover:to-blue-700 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <span className="animate-spin">⌛</span>
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <span>📤</span>
              <span>Upload from Device</span>
            </>
          )}
        </button>
      </div>

      {/* OR Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-500 font-semibold">OR</span>
        </div>
      </div>

      {/* URL Input */}
      <label className="block">
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Image URL</span>
        <input
          type="text"
          value={url.startsWith('data:') ? '' : url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
        <p className="text-xs text-gray-500 mt-1">Paste an image URL from the web</p>
      </label>

      {/* Caption */}
      <label className="block">
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Caption</span>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Optional caption..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
      </label>

      {/* Save/Cancel Buttons */}
      <div className="flex gap-2 pt-4">
        <button
          onClick={() => onSave({ ...block, content: { ...block.content, url, caption } })}
          disabled={!url || isUploading}
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✓ Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-3 bg-white text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 border border-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function PullQuoteBlockEditor({ block, onSave, onCancel }: { block: PullQuoteBlockType; onSave: (block: Block) => void; onCancel: () => void }) {
  const [text, setText] = useState(block.content.text);
  const [attribution, setAttribution] = useState(block.content.attribution || '');

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Quote</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
          placeholder="Your inspiring quote..."
        />
      </label>
      <label className="block">
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Attribution (optional)</span>
        <input
          type="text"
          value={attribution}
          onChange={(e) => setAttribution(e.target.value)}
          placeholder="— Author"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
      </label>
      <div className="flex gap-2 pt-4">
        <button
          onClick={() => onSave({ ...block, content: { ...block.content, text, attribution } })}
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors"
        >
          ✓ Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-3 bg-white text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 border border-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function MapBlockEditor({ block, onSave, onCancel }: { block: MapBlockType; onSave: (block: Block) => void; onCancel: () => void }) {
  const [location, setLocation] = useState(block.content.location);
  const [latitude, setLatitude] = useState(block.content.latitude);
  const [longitude, setLongitude] = useState(block.content.longitude);
  const [zoom, setZoom] = useState(block.content.zoom);
  const [style, setStyle] = useState(block.content.style);
  const [showMarker, setShowMarker] = useState(block.content.showMarker);
  const [caption, setCaption] = useState(block.content.caption || '');

  // Popular travel locations for quick selection
  const popularLocations = [
    { name: 'Reykjavik, Iceland', lat: 64.1466, lng: -21.9426 },
    { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503 },
    { name: 'Petra, Jordan', lat: 30.3285, lng: 35.4444 },
    { name: 'Patagonia, Chile', lat: -50.9423, lng: -73.4068 },
    { name: 'Santorini, Greece', lat: 36.3932, lng: 25.4615 },
    { name: 'Banff, Canada', lat: 51.1784, lng: -115.5708 },
    { name: 'Marrakech, Morocco', lat: 31.6295, lng: -7.9811 },
    { name: 'Queenstown, New Zealand', lat: -45.0312, lng: 168.6626 },
  ];

  const handleLocationSelect = (loc: typeof popularLocations[0]) => {
    setLocation(loc.name);
    setLatitude(loc.lat);
    setLongitude(loc.lng);
  };

  return (
    <div className="space-y-4">
      {/* Quick Location Picker */}
      <div>
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Quick Pick Location</span>
        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
          {popularLocations.map((loc) => (
            <button
              key={loc.name}
              onClick={() => handleLocationSelect(loc)}
              className={`px-3 py-2 text-xs rounded-lg border-2 transition-all text-left ${
                location === loc.name
                  ? 'border-blue-500 bg-blue-50 font-semibold'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              📍 {loc.name}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Location */}
      <label className="block">
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Location Name</span>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., Yosemite National Park, USA"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
      </label>

      {/* Coordinates */}
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Latitude</span>
          <input
            type="number"
            step="0.0001"
            value={latitude}
            onChange={(e) => setLatitude(parseFloat(e.target.value))}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Longitude</span>
          <input
            type="number"
            step="0.0001"
            value={longitude}
            onChange={(e) => setLongitude(parseFloat(e.target.value))}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
          />
        </label>
      </div>

      {/* Zoom Level */}
      <label className="block">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">Zoom Level</span>
          <span className="text-xs text-gray-500 font-mono">{zoom}</span>
        </div>
        <input
          type="range"
          min="1"
          max="18"
          value={zoom}
          onChange={(e) => setZoom(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>World</span>
          <span>Street</span>
        </div>
      </label>

      {/* Map Style */}
      <div>
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Map Style</span>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setStyle('color')}
            className={`p-3 rounded-xl border-2 transition-all ${
              style === 'color'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="h-12 rounded bg-gradient-to-br from-green-400 to-blue-400 mb-2"></div>
            <div className="text-xs font-semibold text-center">Color</div>
          </button>
          <button
            onClick={() => setStyle('grayscale')}
            className={`p-3 rounded-xl border-2 transition-all ${
              style === 'grayscale'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="h-12 rounded bg-gradient-to-br from-gray-300 to-gray-400 mb-2"></div>
            <div className="text-xs font-semibold text-center">Grayscale</div>
          </button>
          <button
            onClick={() => setStyle('blackwhite')}
            className={`p-3 rounded-xl border-2 transition-all ${
              style === 'blackwhite'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="h-12 rounded bg-gradient-to-br from-gray-800 to-gray-200 mb-2"></div>
            <div className="text-xs font-semibold text-center">B&W</div>
          </button>
        </div>
      </div>

      {/* Show Marker */}
      <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer">
        <input
          type="checkbox"
          checked={showMarker}
          onChange={(e) => setShowMarker(e.target.checked)}
          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
        />
        <div>
          <div className="text-sm font-semibold text-gray-900">Show Location Marker</div>
          <div className="text-xs text-gray-500">Display a pin on the map</div>
        </div>
      </label>

      {/* Caption */}
      <label className="block">
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Caption (optional)</span>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Our starting point for the glacier hike..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
      </label>

      {/* Save/Cancel Buttons */}
      <div className="flex gap-2 pt-4">
        <button
          onClick={() => onSave({ 
            ...block, 
            content: { 
              location, 
              latitude, 
              longitude, 
              zoom, 
              style, 
              showMarker, 
              caption 
            } 
          })}
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors"
        >
          ✓ Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-3 bg-white text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 border border-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function VideoBlockEditor({ block, onSave, onCancel }: { block: VideoBlockType; onSave: (block: Block) => void; onCancel: () => void }) {
  const [url, setUrl] = useState(block.content.url);
  const [platform, setPlatform] = useState<'youtube' | 'vimeo'>(block.content.platform);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '4:3' | '1:1'>(block.content.aspectRatio);
  const [caption, setCaption] = useState(block.content.caption || '');

  // Auto-detect platform from URL
  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    if (newUrl.includes('youtube.com') || newUrl.includes('youtu.be')) {
      setPlatform('youtube');
    } else if (newUrl.includes('vimeo.com')) {
      setPlatform('vimeo');
    }
  };

  return (
    <div className="space-y-4">
      {/* Video URL */}
      <label className="block">
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Video URL</span>
        <input
          type="url"
          value={url}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm font-mono text-sm"
        />
        <p className="text-xs text-gray-500 mt-2">Supports YouTube and Vimeo URLs</p>
      </label>

      {/* Platform */}
      <div>
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Platform</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setPlatform('youtube')}
            className={`p-3 rounded-xl border-2 transition-all ${
              platform === 'youtube'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="text-2xl mb-1">📺</div>
            <div className="text-xs font-semibold text-center">YouTube</div>
          </button>
          <button
            onClick={() => setPlatform('vimeo')}
            className={`p-3 rounded-xl border-2 transition-all ${
              platform === 'vimeo'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="text-2xl mb-1">🎬</div>
            <div className="text-xs font-semibold text-center">Vimeo</div>
          </button>
        </div>
      </div>

      {/* Aspect Ratio */}
      <div>
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Aspect Ratio</span>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setAspectRatio('16:9')}
            className={`p-3 rounded-xl border-2 transition-all ${
              aspectRatio === '16:9'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="h-6 rounded bg-gray-300 mb-2" style={{ aspectRatio: '16/9' }}></div>
            <div className="text-xs font-semibold text-center">16:9</div>
          </button>
          <button
            onClick={() => setAspectRatio('4:3')}
            className={`p-3 rounded-xl border-2 transition-all ${
              aspectRatio === '4:3'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="h-6 rounded bg-gray-300 mb-2" style={{ aspectRatio: '4/3' }}></div>
            <div className="text-xs font-semibold text-center">4:3</div>
          </button>
          <button
            onClick={() => setAspectRatio('1:1')}
            className={`p-3 rounded-xl border-2 transition-all ${
              aspectRatio === '1:1'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="h-6 rounded bg-gray-300 mb-2" style={{ aspectRatio: '1/1' }}></div>
            <div className="text-xs font-semibold text-center">1:1</div>
          </button>
        </div>
      </div>

      {/* Caption */}
      <label className="block">
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Caption (optional)</span>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Describe the video..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
      </label>

      {/* Save/Cancel Buttons */}
      <div className="flex gap-2 pt-4">
        <button
          onClick={() => onSave({ ...block, content: { url, platform, aspectRatio, caption } })}
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors"
        >
          ✓ Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-3 bg-white text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 border border-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function CodeBlockEditor({ block, onSave, onCancel }: { block: CodeBlockType; onSave: (block: Block) => void; onCancel: () => void }) {
  const [code, setCode] = useState(block.content.code);
  const [language, setLanguage] = useState(block.content.language);
  const [showLineNumbers, setShowLineNumbers] = useState(block.content.showLineNumbers);
  const [caption, setCaption] = useState(block.content.caption || '');

  const languages = [
    'javascript', 'typescript', 'python', 'html', 'css', 'json', 
    'bash', 'sql', 'jsx', 'tsx', 'php', 'ruby', 'go', 'rust',
    'java', 'cpp', 'c', 'swift', 'kotlin'
  ];

  return (
    <div className="space-y-4">
      {/* Code Input */}
      <label className="block">
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Code</span>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={12}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900 text-gray-100 font-mono text-sm shadow-sm"
          placeholder="// Your code here..."
          spellCheck={false}
        />
      </label>

      {/* Language */}
      <label className="block">
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Language</span>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
      </label>

      {/* Show Line Numbers */}
      <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer">
        <input
          type="checkbox"
          checked={showLineNumbers}
          onChange={(e) => setShowLineNumbers(e.target.checked)}
          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
        />
        <div>
          <div className="text-sm font-semibold text-gray-900">Show Line Numbers</div>
          <div className="text-xs text-gray-500">Display line numbers in the code block</div>
        </div>
      </label>

      {/* Caption */}
      <label className="block">
        <span className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wide">Caption (optional)</span>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Explain the code snippet..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
      </label>

      {/* Save/Cancel Buttons */}
      <div className="flex gap-2 pt-4">
        <button
          onClick={() => onSave({ ...block, content: { code, language, showLineNumbers, caption } })}
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors"
        >
          ✓ Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-3 bg-white text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 border border-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
