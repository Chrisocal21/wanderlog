'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEditorStore } from '@/lib/store/editorStore';
import { EditorHeader } from '@/components/editor/EditorHeader';
import { PalettePicker } from '@/components/editor/PalettePicker';
import { FontPicker } from '@/components/editor/FontPicker';
import { LayoutPicker } from '@/components/editor/LayoutPicker';
import { BlockToolbar } from '@/components/editor/BlockToolbar';
import { EditableBlock } from '@/components/editor/EditableBlock';
import { LivePreview } from '@/components/editor/LivePreview';
import { TemplatePicker } from '@/components/editor/TemplatePicker';
import type { BlogTemplate } from '@/lib/templates';
import type { Post } from '@/types';

function EditorPageContent() {
  const searchParams = useSearchParams();
  const {
    postMeta,
    blocks,
    postId,
    isDirty,
    createNewPost,
    loadTemplate,
    loadPost,
    setPostId,
    updateTitle,
    updateSubtitle,
    updateHeroImage,
    updateTags,
    updateLayout,
    updatePalette,
    updateFont,
    markClean,
  } = useEditorStore();

  const [showPreview, setShowPreview] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    palette: false,
    typography: false,
    layout: false,
    blocks: false,
  });
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const autoSaveInterval = useRef<NodeJS.Timeout | null>(null);

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Initialize editor - check for draft or show template picker
  useEffect(() => {
    if (hasInitialized) return;

    const draftId = searchParams?.get('draft');
    
    if (draftId) {
      // Load existing draft
      const draftData = localStorage.getItem(`wanderlog-draft-${draftId}`);
      if (draftData) {
        try {
          const draft: Post = JSON.parse(draftData);
          loadPost(draft);
          setPostId(draft.id);
          markClean();
        } catch (error) {
          console.error('Error loading draft:', error);
          setShowTemplatePicker(true);
        }
      } else {
        setShowTemplatePicker(true);
      }
    } else {
      // Show template picker for new posts
      setShowTemplatePicker(true);
    }

    setHasInitialized(true);
  }, [searchParams, hasInitialized, loadPost, setPostId, markClean]);

  // Auto-save functionality
  useEffect(() => {
    if (!hasInitialized || !isDirty) return;

    // Save after 5 seconds of inactivity
    const timeoutId = setTimeout(() => {
      saveDraft();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [postMeta, blocks, isDirty, hasInitialized, postId]);

  const saveDraft = () => {
    const id = postId || `draft-${Date.now()}`;
    const draft: Post = {
      id,
      slug: postMeta.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: postMeta.title,
      subtitle: postMeta.subtitle,
      status: 'draft',
      blocks,
      layoutId: postMeta.layoutId,
      paletteId: postMeta.paletteId,
      fontPairId: postMeta.fontPairId,
      heroImage: postMeta.heroImage,
      tags: postMeta.tags,
      readTime: Math.max(1, Math.ceil(blocks.length / 2)),
      authorId: 'demo-author',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(`wanderlog-draft-${id}`, JSON.stringify(draft));
    
    if (!postId) {
      setPostId(id);
    }
    
    markClean();
  };

  const handleTemplateSelect = (template: BlogTemplate) => {
    loadTemplate(template);
    setShowTemplatePicker(false);
  };

  const handleSkipTemplate = () => {
    createNewPost();
    setShowTemplatePicker(false);
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsUploadingHero(true);

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        updateHeroImage(base64String);
        setIsUploadingHero(false);
      };
      reader.onerror = () => {
        alert('Error reading file');
        setIsUploadingHero(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert('Error uploading image');
      setIsUploadingHero(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <EditorHeader onOpenTemplates={() => setShowTemplatePicker(true)} />
      
      <div className="flex-1 flex overflow-hidden relative">
        {/* Floating Toolbar - Top Left */}
        <div className="absolute top-6 left-6 z-20 flex gap-2">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="px-4 py-2.5 bg-white shadow-lg rounded-xl text-sm font-medium hover:bg-gray-50 transition-all border border-gray-200 flex items-center gap-2"
            title="Design Tools"
          >
            <span className="text-lg">🎨</span>
            <span className="font-semibold">Design</span>
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2.5 bg-white shadow-lg rounded-xl text-sm font-medium hover:bg-gray-50 transition-all border border-gray-200 flex items-center gap-2"
            title={showPreview ? 'Hide Preview' : 'Show Preview'}
          >
            <span className="text-lg">{showPreview ? '📝' : '👁️'}</span>
            <span className="font-semibold">{showPreview ? 'Editor Only' : 'Show Preview'}</span>
          </button>
        </div>

        {/* Slide-out Sidebar - Design Tools */}
        <aside 
          className={`absolute inset-y-0 left-0 w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-30 ${
            showSidebar ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full overflow-y-auto">
            {/* Sidebar Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">Design Studio</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="p-6 space-y-4">
              {/* Visual Style Section */}
              <section className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleSection('visualStyle')}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎨</span>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Visual Style</h3>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-transform ${collapsedSections.visualStyle ? '' : 'rotate-180'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {!collapsedSections.visualStyle && (
                  <div className="px-4 pb-4 space-y-6 border-t border-gray-100">
                    <div className="pt-4">
                      <button
                        onClick={() => toggleSection('palette')}
                        className="w-full flex items-center justify-between mb-3"
                      >
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer">
                          Color Palette
                        </label>
                        <svg
                          className={`w-4 h-4 transition-transform ${collapsedSections.palette ? '' : 'rotate-180'}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {!collapsedSections.palette && (
                        <PalettePicker
                          selected={postMeta.paletteId}
                          onSelect={updatePalette}
                        />
                      )}
                    </div>

                    <div>
                      <button
                        onClick={() => toggleSection('typography')}
                        className="w-full flex items-center justify-between mb-3"
                      >
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer">
                          Typography
                        </label>
                        <svg
                          className={`w-4 h-4 transition-transform ${collapsedSections.typography ? '' : 'rotate-180'}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {!collapsedSections.typography && (
                        <FontPicker
                          selected={postMeta.fontPairId}
                          onSelect={updateFont}
                        />
                      )}
                    </div>

                    <div>
                      <button
                        onClick={() => toggleSection('layout')}
                        className="w-full flex items-center justify-between mb-3"
                      >
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer">
                          Layout
                        </label>
                        <svg
                          className={`w-4 h-4 transition-transform ${collapsedSections.layout ? '' : 'rotate-180'}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {!collapsedSections.layout && (
                        <LayoutPicker
                          selected={postMeta.layoutId}
                          onSelect={updateLayout}
                        />
                      )}
                    </div>
                  </div>
                )}
              </section>

              {/* Content Blocks Section */}
              <section className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleSection('blocks')}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📦</span>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Content Blocks</h3>
                  </div>
                  <svg
                    className={`w-5 h-5 transition-transform ${collapsedSections.blocks ? '' : 'rotate-180'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {!collapsedSections.blocks && (
                  <div className="px-4 pb-4 border-t border-gray-100 pt-4">
                    <BlockToolbar />
                  </div>
                )}
              </section>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {showSidebar && (
          <div 
            className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-20 transition-opacity"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Main Editor Area */}
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${showPreview ? '' : ''}`}>
          <div className="max-w-4xl mx-auto px-8 py-24 space-y-8">
            {/* Post Meta Fields */}
            <div className="space-y-6 bg-white rounded-2xl shadow-sm p-10 border border-gray-100">
              <input
                type="text"
                value={postMeta.title}
                onChange={(e) => updateTitle(e.target.value)}
                placeholder="Your story title..."
                className="w-full text-5xl font-bold border-none outline-none focus:ring-0 placeholder-gray-300 bg-transparent"
              />
              
              <input
                type="text"
                value={postMeta.subtitle}
                onChange={(e) => updateSubtitle(e.target.value)}
                placeholder="Add a compelling subtitle..."
                className="w-full text-2xl text-gray-600 border-none outline-none focus:ring-0 placeholder-gray-300 bg-transparent"
              />

              <div className="pt-6 border-t border-gray-100 space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">Hero Image</label>
                  
                  {/* Hero Image Preview */}
                  {postMeta.heroImage && (
                    <div className="relative rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 mb-3">
                      <img 
                        src={postMeta.heroImage} 
                        alt="Hero preview" 
                        className="w-full h-40 object-cover"
                      />
                      <button
                        onClick={() => updateHeroImage('')}
                        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 shadow-lg"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  )}

                  {/* Upload Button */}
                  <input
                    ref={heroFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleHeroImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => heroFileInputRef.current?.click()}
                    disabled={isUploadingHero}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-purple-700 hover:to-blue-700 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-2"
                  >
                    {isUploadingHero ? (
                      <>
                        <span className="animate-spin">⌛</span>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <span>📤</span>
                        <span>Upload Hero Image</span>
                      </>
                    )}
                  </button>

                  {/* OR Divider */}
                  <div className="relative mb-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white text-gray-500 font-semibold">OR</span>
                    </div>
                  </div>

                  {/* URL Input */}
                  <input
                    type="text"
                    value={postMeta.heroImage.startsWith('data:') ? '' : postMeta.heroImage}
                    onChange={(e) => updateHeroImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 bg-gray-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Or paste an image URL</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">Tags</label>
                  <input
                    type="text"
                    value={postMeta.tags.join(', ')}
                    onChange={(e) => updateTags(e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
                    placeholder="adventure, travel, photography"
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Blocks */}
            <div className="space-y-6">
              {blocks.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-200">
                  <div className="text-7xl mb-6 animate-pulse">✍️</div>
                  <p className="text-xl text-gray-700 font-semibold mb-3">
                    Start your story
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Click the <span className="font-bold text-blue-600">🎨 Design</span> button to add content blocks
                  </p>
                  <div className="flex justify-center gap-2">
                    <div className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">Text</div>
                    <div className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">Photos</div>
                    <div className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">Quotes</div>
                    <div className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-600">More...</div>
                  </div>
                </div>
              ) : (
                blocks.map((block, index) => (
                  <EditableBlock 
                    key={block.id} 
                    block={block} 
                    index={index}
                    totalBlocks={blocks.length}
                  />
                ))
              )}
            </div>
          </div>
        </main>

        {/* Right Panel - Live Preview */}
        {showPreview && (
          <aside className="w-1/2 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 border-l border-gray-200 shadow-inner">
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 px-6 py-4 z-10 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live Preview</p>
            </div>
            <LivePreview />
          </aside>
        )}
      </div>

      {/* Template Picker Modal */}
      {showTemplatePicker && (
        <TemplatePicker
          onSelect={handleTemplateSelect}
          onClose={handleSkipTemplate}
        />
      )}
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">✍️</div>
          <p className="text-lg text-gray-600 font-medium">Loading editor...</p>
        </div>
      </div>
    }>
      <EditorPageContent />
    </Suspense>
  );
}
