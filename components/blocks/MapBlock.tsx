import type { MapBlock as MapBlockType } from '@/types';

interface MapBlockProps {
  block: MapBlockType;
  isEditor?: boolean;
}

export function MapBlock({ block, isEditor = false }: MapBlockProps) {
  const { latitude, longitude, zoom, style, showMarker, caption, location } = block.content;

  // OpenStreetMap tile URL
  const tileSize = 256;
  const mapWidth = isEditor ? 600 : 800;
  const mapHeight = isEditor ? 400 : 500;
  
  // Calculate tile coordinates
  const scale = Math.pow(2, zoom);
  const worldCoordX = ((longitude + 180) / 360) * scale;
  const worldCoordY = ((1 - Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI / 180)) / Math.PI) / 2) * scale;
  
  // Use OpenStreetMap static map via staticmap service
  const mapUrl = `https://tile.openstreetmap.org/${zoom}/${Math.floor(worldCoordX)}/${Math.floor(worldCoordY)}.png`;
  
  // Better approach: use a static map API
  const staticMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude-0.01},${latitude-0.01},${longitude+0.01},${latitude+0.01}&layer=mapnik&marker=${latitude},${longitude}`;

  // For a production app, you'd use Mapbox, Google Maps, or similar
  // For now, using OSM iframe embed
  
  // Apply CSS filter based on style
  const getStyleFilter = () => {
    switch (style) {
      case 'grayscale':
        return 'grayscale(100%) contrast(1.1)';
      case 'blackwhite':
        return 'grayscale(100%) contrast(2) brightness(1.1)';
      default:
        return 'none';
    }
  };

  return (
    <figure className="my-8">
      <div 
        className="relative w-full rounded-xl overflow-hidden shadow-md border-2 border-gray-200"
        style={{ 
          height: `${mapHeight}px`,
          filter: getStyleFilter(),
        }}
      >
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={staticMapUrl}
          style={{ border: 0 }}
          title={`Map of ${location}`}
          loading="lazy"
        />
        
        {/* Location label overlay */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📍</span>
            <span className="font-semibold text-gray-900">{location}</span>
          </div>
        </div>
      </div>
      
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-gray-600 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
