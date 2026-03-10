'use client';

import { config } from '@/lib/config';
import type { PaletteId } from '@/lib/config';

interface PalettePickerProps {
  selected: PaletteId;
  onSelect: (paletteId: PaletteId) => void;
}

export function PalettePicker({ selected, onSelect }: PalettePickerProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {config.palettes.map((palette) => (
        <button
          key={palette.id}
          onClick={() => onSelect(palette.id)}
          className={`p-3 rounded-xl border-2 transition-all text-left ${
            selected === palette.id
              ? 'border-blue-500 bg-blue-50 shadow-md'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          {/* Color Preview Grid */}
          <div className="grid grid-cols-4 gap-1 mb-3">
            <div 
              className="h-8 rounded col-span-2" 
              style={{ backgroundColor: palette.colors.bg }}
            />
            <div 
              className="h-8 rounded" 
              style={{ backgroundColor: palette.colors.accent }}
            />
            <div 
              className="h-8 rounded" 
              style={{ backgroundColor: palette.colors.surface }}
            />
          </div>

          {/* Palette Info */}
          <div className="text-xs font-bold text-gray-900 mb-1">
            {palette.name}
          </div>
          <div className="text-xs text-gray-500 leading-tight">
            {palette.description}
          </div>
        </button>
      ))}
    </div>
  );
}
