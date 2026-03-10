'use client';

import { config } from '@/lib/config';
import type { LayoutId } from '@/lib/config';

interface LayoutPickerProps {
  selected: LayoutId;
  onSelect: (layoutId: LayoutId) => void;
}

// Visual layout wireframes
const layoutPreviews: Record<LayoutId, React.ReactNode> = {
  editorial: (
    <div className="space-y-1.5">
      <div className="h-2 bg-gray-400 rounded w-1/3"></div>
      <div className="grid grid-cols-3 gap-1.5">
        <div className="col-span-2 space-y-1">
          <div className="h-1 bg-gray-300 rounded"></div>
          <div className="h-1 bg-gray-300 rounded w-5/6"></div>
          <div className="h-1 bg-gray-300 rounded w-4/5"></div>
        </div>
        <div className="h-12 bg-gradient-to-br from-orange-300 to-pink-400 rounded"></div>
      </div>
    </div>
  ),
  'full-bleed': (
    <div className="relative h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-2">
        <div className="h-1 bg-white/90 rounded w-2/3"></div>
      </div>
    </div>
  ),
  minimal: (
    <div className="space-y-1.5 py-2">
      <div className="h-2 bg-gray-400 rounded w-1/2 mx-auto"></div>
      <div className="h-1 bg-gray-300 rounded w-3/4 mx-auto"></div>
      <div className="h-1 bg-gray-300 rounded w-2/3 mx-auto"></div>
      <div className="h-1 bg-gray-300 rounded w-3/4 mx-auto"></div>
    </div>
  ),
  'split-screen': (
    <div className="grid grid-cols-2 gap-1 h-20">
      <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded"></div>
      <div className="space-y-1 flex flex-col justify-center">
        <div className="h-1.5 bg-gray-300 rounded"></div>
        <div className="h-1.5 bg-gray-300 rounded w-4/5"></div>
        <div className="h-1.5 bg-gray-300 rounded w-3/5"></div>
      </div>
    </div>
  ),
  'gallery-lead': (
    <div className="space-y-1.5">
      <div className="grid grid-cols-3 gap-1 mb-1.5">
        <div className="h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded"></div>
        <div className="h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded"></div>
        <div className="h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded"></div>
      </div>
      <div className="h-1.5 bg-gray-300 rounded w-3/4"></div>
      <div className="h-1.5 bg-gray-300 rounded w-2/3"></div>
    </div>
  ),
};

export function LayoutPicker({ selected, onSelect }: LayoutPickerProps) {
  return (
    <div className="space-y-2">
      {config.layouts.map((layout) => (
        <button
          key={layout.id}
          onClick={() => onSelect(layout.id)}
          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
            selected === layout.id
              ? 'border-blue-500 bg-blue-50 shadow-md'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          {/* Visual Preview */}
          <div className="mb-3 p-3 bg-gray-50 rounded-lg">
            {layoutPreviews[layout.id]}
          </div>

          {/* Layout Info */}
          <div className="space-y-1">
            <div className="text-xs font-bold text-gray-900">
              {layout.name}
            </div>
            <div className="text-xs text-gray-500">
              {layout.description}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
