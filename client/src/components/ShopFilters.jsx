import { useState, useEffect, useCallback } from 'react';
import { getCategories } from '../services/categoryService';

export default function ShopFilters({ filters, onFilterChange, mobileOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState(filters.search || '');

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  const debouncedSearch = useCallback(() => {
    const timer = setTimeout(() => {
      onFilterChange({ search: searchValue });
    }, 400);
    return () => clearTimeout(timer);
  }, [searchValue, onFilterChange]);

  useEffect(() => {
    const cleanup = debouncedSearch();
    return cleanup;
  }, [debouncedSearch]);

  const handleCategoryChange = (catId) => {
    const current = filters.category ? filters.category.split(',') : [];
    const next = current.includes(catId)
      ? current.filter((id) => id !== catId)
      : [...current, catId];
    onFilterChange({ category: next.join(',') || undefined });
  };

  const handlePriceChange = (type, value) => {
    const num = value ? Number(value) : undefined;
    onFilterChange({ [type]: num });
  };

  const clearFilters = () => {
    setSearchValue('');
    onFilterChange({
      search: undefined,
      category: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      sort: 'newest',
    });
  };

  const hasActiveFilters = filters.search || filters.category || filters.minPrice || filters.maxPrice;

  const content = (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-dark uppercase tracking-wide mb-3">
          Search
        </h3>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-dark uppercase tracking-wide mb-3">
          Categories
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories.map((cat) => {
            const selected = filters.category?.includes(cat._id);
            return (
              <label
                key={cat._id}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={!!selected}
                  onChange={() => handleCategoryChange(cat._id)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-600 group-hover:text-dark transition-colors">
                  {cat.name}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-dark uppercase tracking-wide mb-3">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => handlePriceChange('minPrice', e.target.value)}
            className="w-full px-3 py-2 rounded-2xl border border-gray-200 bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
            className="w-full px-3 py-2 rounded-2xl border border-gray-200 bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-dark uppercase tracking-wide mb-3">
          Sort By
        </h3>
        <select
          value={filters.sort || 'newest'}
          onChange={(e) => onFilterChange({ sort: e.target.value })}
          className="w-full px-4 py-2.5 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2.5 text-sm font-medium text-primary hover:text-blue-700 transition-colors border border-primary rounded-2xl hover:bg-blue-50"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-card rounded-3xl shadow-sm border border-gray-100 p-5">
          {content}
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-surface p-6 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-dark">Filters</h2>
              <button onClick={onClose} className="p-1.5 hover:bg-gray-200 rounded-xl transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
