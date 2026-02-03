import { useState, useMemo, useEffect } from "react";
import type { Product } from "../../types";
import ProductDisplay from "../../components/atoms/ProductDisplay";
import Button from "../../components/atoms/Button";
import { useDebounce } from "../../hooks/useDebounce";
import { api } from "../../api/mockApi";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [sortBy, setSortBy] = useState<
    "price-asc" | "price-desc" | "popularity"
  >("popularity");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000000 });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.products.getAll();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (products.length === 0) return;

      try {
        const results = await api.products.search(debouncedSearchQuery);
        setProducts(results);
      } catch (err) {
        console.error(err);
      }
    };

    if (debouncedSearchQuery) {
      searchProducts();
    }
  }, [debouncedSearchQuery, products.length]);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;
      return matchesPrice;
    });

    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      filtered.sort((a, b) => b.sold - a.sold);
    }

    return filtered;
  }, [products, sortBy, priceRange]);

  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-lg bg-white border border-gray-200 p-6 shadow-sm">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Search Products
          </label>
          <input
            type="text"
            placeholder="Search by name, merchant, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "price-asc" | "price-desc" | "popularity",
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-green-500 focus:outline-none"
            >
              <option value="popularity">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Max Price: Rp {priceRange.max.toLocaleString("id-ID")}
            </label>
            <input
              type="range"
              min="0"
              max="2000000"
              step="50000"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({
                  ...priceRange,
                  max: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
        </div>

        <Button
          onClick={() => {
            setSearchQuery("");
            setSortBy("popularity");
            setPriceRange({ min: 0, max: 2000000 });
          }}
          variant="outline"
          size="sm"
        >
          Reset Filters
        </Button>
      </div>

      <div>
        {loading && (
          <div className="rounded-lg bg-white border border-gray-200 py-12 text-center shadow-sm">
            <div className="space-y-2">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 shadow-sm">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              {filteredAndSortedProducts.length} Products Found
            </h2>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="rounded-lg bg-white border border-gray-200 py-12 text-center shadow-sm">
                <p className="text-gray-600">
                  No products found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {filteredAndSortedProducts.map((product) => (
                  <ProductDisplay key={product.id} item={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
