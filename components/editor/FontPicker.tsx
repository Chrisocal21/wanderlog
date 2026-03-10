'use client';

import { config } from '@/lib/config';
import type { FontPairId } from '@/lib/config';

interface FontPickerProps {
  selected: FontPairId;
  onSelect: (fontPairId: FontPairId) => void;
}

export function FontPicker({ selected, onSelect }: FontPickerProps) {
  return (
    <div className="space-y-2">
      {config.fontPairings.map((fontPair) => (
        <button
          key={fontPair.id}
          onClick={() => onSelect(fontPair.id)}
          className={`w-full p-4 rounded-xl border-2 transition-all text-left overflow-hidden ${
            selected === fontPair.id
              ? 'border-blue-500 bg-blue-50 shadow-md'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          {/* Visual Font Preview */}
          <div 
            className="mb-3 pb-3 border-b border-gray-200"
            data-font={fontPair.id}
          >
            <div className="text-xl font-heading font-bold text-gray-900 mb-1">
              Heading Style
            </div>
            <div className="text-sm font-body text-gray-600">
              Body text appears like this
            </div>
          </div>

          {/* Font Info */}
          <div className="space-y-1">
            <div className="text-xs font-bold text-gray-900">
              {fontPair.name}
            </div>
            <div className="text-xs text-gray-500">
              {fontPair.heading} + {fontPair.body}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
