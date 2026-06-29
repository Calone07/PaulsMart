const categoryConfig = {
  phones: { gradient: 'from-blue-500 to-blue-700', icon: 'M10 4h4l1 3h4v10H5V7h4l1-3z M10 14a2 2 0 100-4 2 2 0 000 4' },
  laptops: { gradient: 'from-purple-500 to-purple-700', icon: 'M4 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-4l-1 3h-2l-1-3H6a2 2 0 01-2-2V6z M8 13v-2 M16 13v-2 M12 13v-2' },
  gaming: { gradient: 'from-red-500 to-red-700', icon: 'M6 12a2 2 0 100-4 2 2 0 000 4 M18 12a2 2 0 100-4 2 2 0 000 4 M12 14a2 2 0 100-4 2 2 0 000 4 M6 18h12-12z M3 12a9 9 0 1118 0 9 9 0 01-18 0' },
  headphones: { gradient: 'from-emerald-500 to-emerald-700', icon: 'M8 8v4a4 4 0 008 0V8a6 6 0 00-12 0v4a2 2 0 01-2 2H2a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V8a4 4 0 118 0' },
  'smart-watches': { gradient: 'from-teal-500 to-teal-700', icon: 'M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2 M9 7h6 M9 17h6 M12 10v4 M10 12h4' },
  speakers: { gradient: 'from-pink-500 to-pink-700', icon: 'M12 2a10 10 0 00-10 10v4a2 2 0 002 2h2a2 2 0 002-2v-4a6 6 0 1112 0v4a2 2 0 002 2h2a2 2 0 002-2v-4A10 10 0 0012 2 M8 16v2a2 2 0 002 2h4a2 2 0 002-2v-2' },
  televisions: { gradient: 'from-indigo-500 to-indigo-700', icon: 'M4 6h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2 M8 2l4 4 4-4 M10 18h4 M12 14v4' },
  tablets: { gradient: 'from-sky-500 to-sky-700', icon: 'M6 3h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2 M8 7h8 M8 17h8 M12 10v4' },
  accessories: { gradient: 'from-amber-500 to-amber-700', icon: 'M12 4v16 M4 12h16 M6 8l3 3-3 3 M18 8l-3 3 3 3 M8 6l3 3-3 3 M16 6l-3 3 3 3' },
};

const defaultConfig = { gradient: 'from-gray-400 to-gray-500', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' };

function getCategoryKey(name) {
  if (!name) return null;
  const key = name.toLowerCase().replace(/\s+/g, '-');
  return categoryConfig[key] ? key : null;
}

export default function ProductImage({ src, alt, categoryName, className = '' }) {
  if (src) {
    return <img src={src} alt={alt} className={className} />;
  }

  const catKey = getCategoryKey(categoryName);
  const config = catKey ? categoryConfig[catKey] : defaultConfig;

  return (
    <div className={`flex flex-col items-center justify-center bg-gradient-to-br ${config.gradient} ${className}`}>
      <svg className="w-1/3 h-1/3 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={config.icon} />
      </svg>
      {alt && (
        <span className="absolute bottom-3 left-3 right-3 text-xs text-white/70 font-medium truncate text-center">
          {alt}
        </span>
      )}
    </div>
  );
}
