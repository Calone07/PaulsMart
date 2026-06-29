import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/ui/Container';
import ProductGrid from '../components/ProductGrid';
import ShopFilters from '../components/ShopFilters';
import { getProducts } from '../services/productService';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filters = useMemo(() => ({
    search: searchParams.get('search') || undefined,
    category: searchParams.get('category') || undefined,
    minPrice: searchParams.get('minPrice') || undefined,
    maxPrice: searchParams.get('maxPrice') || undefined,
    sort: searchParams.get('sort') || 'newest',
  }), [searchParams]);

  const fetchProducts = useCallback(async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = { ...filters, page: pageNum };
      Object.keys(params).forEach((k) => {
        if (!params[k]) delete params[k];
      });
      const data = await getProducts(params);
      setProducts(data.products);
      setPage(data.page);
      setPages(data.pages);
      setTotal(data.total);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const handleFilterChange = (newFilters) => {
    const merged = { ...filters, ...newFilters };
    const params = {};
    Object.keys(merged).forEach((k) => {
      if (merged[k] !== undefined && merged[k] !== '') params[k] = merged[k];
    });
    setSearchParams(params, { replace: true });
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pages) return;
    fetchProducts(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resultLabel = total === 1 ? '1 product' : `${total} products`;

  return (
    <Container className="py-8 lg:py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-dark tracking-tight">Shop</h1>
          <p className="text-gray-500 text-sm mt-1">
            {loading ? 'Loading...' : resultLabel}
          </p>
        </div>
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-2xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm4 6a1 1 0 011-1h8a1 1 0 010 2H8a1 1 0 01-1-1zm2 6a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z" />
          </svg>
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        <ShopFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          mobileOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
        />

        <div className="flex-1 min-w-0">
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            onRetry={() => fetchProducts(page)}
            search={filters.search}
            category={filters.category}
          />

          {pages > 1 && !loading && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className="px-4 py-2 rounded-2xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {Array.from({ length: pages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === pages || Math.abs(p - page) <= 1)
                .map((p, idx, arr) => (
                  <span key={p} className="flex items-center">
                    {idx > 0 && arr[idx - 1] !== p - 1 && (
                      <span className="px-1 text-gray-400">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(p)}
                      className={`w-10 h-10 rounded-2xl text-sm font-medium transition-colors ${
                        p === page
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {p}
                    </button>
                  </span>
                ))}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= pages}
                className="px-4 py-2 rounded-2xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
