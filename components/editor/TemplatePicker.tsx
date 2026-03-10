'use client';

import { blogTemplates, type BlogTemplate } from '@/lib/templates';
import { config } from '@/lib/config';
import type { Block } from '@/types';

interface TemplatePickerProps {
  onSelect: (template: BlogTemplate) => void;
  onClose: () => void;
}

// Visual representation of each block type
function BlockPreview({ block, palette }: { block: Omit<Block, 'id'>; palette: any }) {
  const getBlockIcon = () => {
    switch (block.type) {
      case 'text':
        return (
          <div className="space-y-2 p-4 h-full flex flex-col justify-center bg-white">
            <div className="h-2 bg-gray-400 rounded w-full"></div>
            <div className="h-2 bg-gray-300 rounded w-11/12"></div>
            <div className="h-2 bg-gray-300 rounded w-10/12"></div>
            <div className="text-xs font-semibold text-gray-500 mt-2">TEXT BLOCK</div>
          </div>
        );
      case 'heading':
        return (
          <div className="p-4 h-full flex flex-col justify-center bg-white">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="text-xs font-semibold text-gray-500">HEADING</div>
          </div>
        );
      case 'photo':
        return (
          <div 
            className="w-full h-full relative flex flex-col items-center justify-center"
            style={{ backgroundColor: palette.colors.accent, opacity: 0.4 }}
          >
            <div className="text-4xl mb-2">📷</div>
            <div className="text-sm font-bold text-gray-700">PHOTO</div>
          </div>
        );
      case 'gallery':
        return (
          <div className="w-full h-full p-3 flex flex-col bg-white">
            <div className="flex-1 grid grid-cols-3 gap-2 mb-2">
              <div style={{ backgroundColor: palette.colors.accent, opacity: 0.3 }} className="rounded"></div>
              <div style={{ backgroundColor: palette.colors.accent, opacity: 0.4 }} className="rounded"></div>
              <div style={{ backgroundColor: palette.colors.accent, opacity: 0.3 }} className="rounded"></div>
            </div>
            <div className="text-xs font-semibold text-gray-500 text-center">GALLERY</div>
          </div>
        );
      case 'pullquote':
        return (
          <div 
            className="p-4 h-full flex flex-col justify-center border-l-4 bg-white"
            style={{ borderColor: palette.colors.accent }}
          >
            <div className="text-xl mb-2 opacity-40">"</div>
            <div className="h-3 bg-gray-400 rounded w-11/12 mb-2"></div>
            <div className="h-2 bg-gray-300 rounded w-1/2"></div>
            <div className="text-xs font-semibold text-gray-500 mt-2">PULL QUOTE</div>
          </div>
        );
      case 'divider':
        return (
          <div className="flex flex-col items-center justify-center h-full px-4 gap-2 bg-white">
            <div 
              className="w-full border-t-4 rounded"
              style={{ borderColor: palette.colors.accent, opacity: 0.5 }}
            ></div>
            <div className="text-xs font-semibold text-gray-500">DIVIDER</div>
          </div>
        );
      case 'map':
        return (
          <div 
            className="w-full h-full relative flex flex-col items-center justify-center"
            style={{ backgroundColor: palette.colors.surface }}
          >
            <div className="text-4xl mb-2">📍</div>
            <div className="text-sm font-bold text-gray-700">MAP</div>
            <div className="text-xs text-gray-500 mt-1">Location</div>
          </div>
        );
      case 'video':
        return (
          <div 
            className="w-full h-full relative flex flex-col items-center justify-center"
            style={{ backgroundColor: palette.colors.accent, opacity: 0.3 }}
          >
            <div className="text-4xl mb-2">▶️</div>
            <div className="text-sm font-bold text-gray-700">VIDEO</div>
          </div>
        );
      case 'code':
        return (
          <div 
            className="p-4 h-full flex flex-col justify-center space-y-2"
            style={{ backgroundColor: palette.colors.surface }}
          >
            <div className="h-2 bg-gray-400 rounded w-3/4"></div>
            <div className="h-2 bg-gray-300 rounded w-2/3"></div>
            <div className="h-2 bg-gray-300 rounded w-4/5"></div>
            <div className="text-xs font-semibold text-gray-500 mt-2">CODE BLOCK</div>
          </div>
        );
      default:
        return null;
    }
  };

  // Calculate appropriate height based on block height value
  const heightClass = block.position.h <= 2 ? 'min-h-[80px]' : 
                      block.position.h <= 4 ? 'min-h-[120px]' : 
                      block.position.h <= 8 ? 'min-h-[160px]' : 'min-h-[200px]';

  return (
    <div 
      className={`rounded-lg overflow-hidden border-3 shadow-sm hover:shadow-md transition-shadow ${heightClass}`}
      style={{ 
        gridColumn: `span ${Math.min(block.position.w, 12)}`,
        borderColor: palette.colors.accent,
        borderWidth: '3px',
        borderStyle: 'solid'
      }}
    >
      {getBlockIcon()}
    </div>
  );
}

// Full template preview showing actual blocks layout
function TemplatePreview({ template }: { template: BlogTemplate }) {
  const palette = config.palettes.find(p => p.id === template.paletteId) || config.palettes[0];
  const fonts = config.fontPairings.find(f => f.id === template.fontPairId) || config.fontPairings[0];

  const previewStyles = {
    backgroundColor: palette.colors.bg,
    color: palette.colors.text,
  };

  // If no blocks, show empty state
  if (template.blocks.length === 0) {
    return (
      <div className="w-full h-full overflow-hidden flex items-center justify-center" style={previewStyles}>
        <div className="text-center space-y-3 p-6">
          <div className="text-6xl opacity-40">⬜</div>
          <div className="text-base font-bold text-gray-700">Blank Canvas</div>
          <div className="text-sm text-gray-600" style={{ fontFamily: fonts.body }}>
            Start completely from scratch
          </div>
        </div>
      </div>
    );
  }

  // Render blocks in a grid layout
  return (
    <div className="w-full h-full overflow-hidden p-4" style={previewStyles}>
      <div className="w-full h-full flex flex-col">
        {/* Header area */}
        <div className="mb-3 pb-3 border-b-2 flex-shrink-0" style={{ borderColor: palette.colors.accent }}>
          <div 
            className="text-sm font-bold mb-1"
            style={{ color: palette.colors.accent, fontFamily: fonts.heading }}
          >
            {template.name}
          </div>
          <div className="text-xs text-gray-600 font-medium">{template.blocks.length} Content Blocks</div>
        </div>

        {/* Blocks visualization - scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-12 gap-3">
            {template.blocks.slice(0, 6).map((block, index) => (
              <BlockPreview key={index} block={block} palette={palette} />
            ))}
          </div>
        </div>

        {/* Show count if more blocks */}
        {template.blocks.length > 6 && (
          <div className="mt-3 text-center text-sm font-semibold text-gray-600 flex-shrink-0 pt-3 border-t-2" style={{ borderColor: palette.colors.accent }}>
            + {template.blocks.length - 6} More Blocks Below
          </div>
        )}
      </div>
    </div>
  );
}

export function TemplatePicker({ onSelect, onClose }: TemplatePickerProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Choose a Template</h2>
              <p className="text-gray-700 mt-1 text-base">Each preview shows the actual blocks and content sections included in the template</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogTemplates.map((template) => {
              const palette = config.palettes.find(p => p.id === template.paletteId);
              const layout = config.layouts.find(l => l.id === template.layoutId);
              const fonts = config.fontPairings.find(f => f.id === template.fontPairId);

              return (
                <button
                  key={template.id}
                  onClick={() => onSelect(template)}
                  className="group relative bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-2xl transition-all text-left"
                >
                  {/* Full Page Preview */}
                  <div className="w-full h-[500px] border-b-2 border-gray-200 group-hover:border-blue-500 transition-colors">
                    <TemplatePreview template={template} />
                  </div>

                  {/* Template Details */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">{template.description}</p>
                        
                        {/* Key Info */}
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-700">{template.blocks.length}</span>
                            <span className="text-gray-600">blocks</span>
                          </div>
                          <div className="w-px h-4 bg-gray-300"></div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-700">{palette?.name}</span>
                            <div className="flex gap-1">
                              <div 
                                className="w-4 h-4 rounded border border-gray-300" 
                                style={{ backgroundColor: palette?.colors.bg }}
                                title="Background"
                              />
                              <div 
                                className="w-4 h-4 rounded border border-gray-300" 
                                style={{ backgroundColor: palette?.colors.accent }}
                                title="Accent"
                              />
                            </div>
                          </div>
                          <div className="w-px h-4 bg-gray-300"></div>
                          <div className="text-gray-600">{layout?.name} layout</div>
                        </div>
                      </div>
                      <span className="text-4xl flex-shrink-0">{template.thumbnail}</span>
                    </div>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute inset-0 border-4 border-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="absolute top-4 right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                      Click to Select
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-sm text-gray-700">
              <span className="font-bold">Block Types:</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">📷 Photo</span>
                <span className="flex items-center gap-1.5">▶️ Video</span>
                <span className="flex items-center gap-1.5">📍 Map</span>
                <span className="flex items-center gap-1.5">💬 Quote</span>
                <span>+ Text, Headings, Galleries, Code</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              ✨ Fully customizable after selection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
