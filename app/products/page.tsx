"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useAuthStore } from "../../stores/auth";
import { useCartStore } from "../../stores/cart";
import AuthGuard from "../authGuard";

// Mock product data
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Premium Headphones",
    description:
      "High-quality wireless headphones with active noise cancellation and 30-hour battery life.",
    price: 299.99,
    category: "Electronics",
    rating: 4.5,
    image: "/images/headphones.jpg",
    brand: "AudioTech",
    inStock: true,
    tags: ["wireless", "noise-cancelling", "bluetooth"],
    featured: true,
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    description:
      "Feature-rich smartwatch with health monitoring, GPS, and water resistance.",
    price: 199.99,
    category: "Electronics",
    rating: 4.3,
    image: "/images/smartwatch.jpg",
    brand: "TechWear",
    inStock: true,
    tags: ["fitness", "smartwatch", "water-resistant"],
    featured: false,
  },
  {
    id: 3,
    name: "Gaming Keyboard",
    description:
      "Mechanical gaming keyboard with RGB lighting and programmable macros.",
    price: 129.99,
    category: "Electronics",
    rating: 4.7,
    image: "/images/keyboard.jpg",
    brand: "GameGear",
    inStock: false,
    tags: ["gaming", "mechanical", "rgb"],
    featured: true,
  },
  {
    id: 4,
    name: "Fitness Tracker",
    description:
      "Water-resistant fitness tracker with heart rate monitor and sleep tracking.",
    price: 79.99,
    category: "Fitness",
    rating: 4.2,
    image: "/images/fitness-tracker.jpg",
    brand: "FitLife",
    inStock: true,
    tags: ["fitness", "health", "water-resistant"],
    featured: false,
  },
  {
    id: 5,
    name: "Laptop Stand",
    description:
      "Adjustable aluminum laptop stand for ergonomic workspace setup.",
    price: 49.99,
    category: "Accessories",
    rating: 4.6,
    image: "/images/laptop-stand.jpg",
    brand: "ErgoSpace",
    inStock: true,
    tags: ["ergonomic", "adjustable", "aluminum"],
    featured: false,
  },
  {
    id: 6,
    name: "Wireless Mouse",
    description:
      "Ergonomic wireless mouse with long battery life and precision tracking.",
    price: 39.99,
    category: "Accessories",
    rating: 4.4,
    image: "/images/wireless-mouse.jpg",
    brand: "ClickTech",
    inStock: true,
    tags: ["wireless", "ergonomic", "precision"],
    featured: false,
  },
  {
    id: 7,
    name: "USB-C Hub",
    description: "7-in-1 USB-C hub with 4K HDMI, USB 3.0, and SD card readers.",
    price: 89.99,
    category: "Accessories",
    rating: 4.1,
    image: "/images/usb-c-hub.jpg",
    brand: "ConnectPro",
    inStock: true,
    tags: ["usb-c", "adapter", "multi-port"],
    featured: false,
  },
  {
    id: 8,
    name: "Yoga Mat",
    description: "Non-slip eco-friendly yoga mat with carrying strap.",
    price: 34.99,
    category: "Fitness",
    rating: 4.8,
    image: "/images/yoga-mat.jpg",
    brand: "ZenYoga",
    inStock: true,
    tags: ["yoga", "eco-friendly", "non-slip"],
    featured: true,
  },
];

// ... existing filter options and interfaces ...
// Filter options
const CATEGORIES = ["All", "Electronics", "Fitness", "Accessories"];
const BRANDS = [
  "All",
  "AudioTech",
  "TechWear",
  "GameGear",
  "FitLife",
  "ErgoSpace",
  "ClickTech",
  "ConnectPro",
  "ZenYoga",
];
const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];
const RATINGS = [5, 4, 3, 2, 1];

interface FilterState {
  category: string;
  brand: string;
  priceRange: string;
  minRating: number;
  inStock: boolean;
  featured: boolean;
  searchQuery: string;
}

export default function ProductsPage() {
  const { user } = useAuthStore();
  const { addItem, isInCart } = useCartStore();

  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    brand: "All",
    priceRange: "All Prices",
    minRating: 0,
    inStock: false,
    featured: false,
    searchQuery: "",
  });

  const [sortBy, setSortBy] = useState<"name" | "price" | "rating">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [addedToCart, setAddedToCart] = useState<Number | null>(null);

  // Handle add to cart
  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      inStock: product.inStock,
    };

    addItem(cartItem);
    setAddedToCart(product.id);

    // Reset the added state after 2 seconds
    setTimeout(() => {
      setAddedToCart(null);
    }, 2000);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = MOCK_PRODUCTS.filter((product) => {
      // Search filter
      if (
        filters.searchQuery &&
        !product.name
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) &&
        !product.description
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (filters.category !== "All" && product.category !== filters.category) {
        return false;
      }

      // Brand filter
      if (filters.brand !== "All" && product.brand !== filters.brand) {
        return false;
      }

      // Price range filter
      const priceRange = PRICE_RANGES.find(
        (range) => range.label === filters.priceRange,
      );
      if (
        priceRange &&
        (product.price < priceRange.min || product.price > priceRange.max)
      ) {
        return false;
      }

      // Rating filter
      if (product.rating < filters.minRating) {
        return false;
      }

      // In stock filter
      if (filters.inStock && !product.inStock) {
        return false;
      }

      // Featured filter
      if (filters.featured && !product.featured) {
        return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue: string | number = a[sortBy];
      let bValue: string | number = b[sortBy];

      if (sortBy === "price" || sortBy === "rating") {
        aValue = a[sortBy];
        bValue = b[sortBy];
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [filters, sortBy, sortOrder]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: "All",
      brand: "All",
      priceRange: "All Prices",
      minRating: 0,
      inStock: false,
      featured: false,
      searchQuery: "",
    });
  };

  const activeFilterCount = Object.values(filters).filter(
    (value) =>
      value !== "" &&
      value !== "All" &&
      value !== "All Prices" &&
      value !== false &&
      value !== 0,
  ).length;

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Product Listing
                </h1>
                <p className="text-lg text-gray-600">
                  Browse our collection of premium products
                </p>
              </div>

              {/* Results count */}
              <div className="mt-4 md:mt-0">
                <p className="text-gray-600">
                  Showing{" "}
                  <span className="font-semibold">
                    {filteredProducts.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold">{MOCK_PRODUCTS.length}</span>{" "}
                  products
                </p>
              </div>
            </div>
          </header>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`lg:w-80 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}
              aria-labelledby="filter-heading"
            >
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2
                    id="filter-heading"
                    className="text-lg font-semibold text-gray-900"
                  >
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        {activeFilterCount}
                      </span>
                    )}
                  </h2>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    Clear All
                  </button>
                </div>

                {/* Search Filter */}
                <div className="mb-6">
                  <label
                    htmlFor="search"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Search Products
                  </label>
                  <input
                    id="search"
                    type="text"
                    placeholder="Search by name or description..."
                    value={filters.searchQuery}
                    onChange={(e) =>
                      handleFilterChange("searchQuery", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Category
                  </h3>
                  <div className="space-y-2">
                    {CATEGORIES.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={filters.category === category}
                          onChange={() =>
                            handleFilterChange("category", category)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Brand
                  </h3>
                  <div className="space-y-2">
                    {BRANDS.map((brand) => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="radio"
                          name="brand"
                          checked={filters.brand === brand}
                          onChange={() => handleFilterChange("brand", brand)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Price Range
                  </h3>
                  <div className="space-y-2">
                    {PRICE_RANGES.map((range) => (
                      <label key={range.label} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={filters.priceRange === range.label}
                          onChange={() =>
                            handleFilterChange("priceRange", range.label)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Minimum Rating
                  </h3>
                  <div className="space-y-2">
                    {RATINGS.map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="minRating"
                          checked={filters.minRating === rating}
                          onChange={() =>
                            handleFilterChange("minRating", rating)
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1">& up</span>
                        </span>
                      </label>
                    ))}
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="minRating"
                        checked={filters.minRating === 0}
                        onChange={() => handleFilterChange("minRating", 0)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        All Ratings
                      </span>
                    </label>
                  </div>
                </div>

                {/* Checkbox Filters */}
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) =>
                        handleFilterChange("inStock", e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      In Stock Only
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.featured}
                      onChange={(e) =>
                        handleFilterChange("featured", e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Featured Products
                    </span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                    />
                  </svg>
                  {showFilters ? "Hide Filters" : "Show Filters"}
                  {activeFilterCount > 0 && (
                    <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Sort Controls */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <label
                      htmlFor="sort-by"
                      className="text-sm font-medium text-gray-700"
                    >
                      Sort by:
                    </label>
                    <select
                      id="sort-by"
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(e.target.value as "name" | "price" | "rating")
                      }
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="name">Name</option>
                      <option value="price">Price</option>
                      <option value="rating">Rating</option>
                    </select>

                    <select
                      value={sortOrder}
                      onChange={(e) =>
                        setSortOrder(e.target.value as "asc" | "desc")
                      }
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </div>

                  {/* Active Filters */}
                  <div className="flex flex-wrap gap-2">
                    {filters.category !== "All" && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Category: {filters.category}
                        <button
                          onClick={() => handleFilterChange("category", "All")}
                          className="ml-1 hover:bg-blue-200 rounded-full p-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          aria-label={`Remove category filter ${filters.category}`}
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {filters.brand !== "All" && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Brand: {filters.brand}
                        <button
                          onClick={() => handleFilterChange("brand", "All")}
                          className="ml-1 hover:bg-green-200 rounded-full p-0.5 focus:outline-none focus:ring-1 focus:ring-green-500"
                          aria-label={`Remove brand filter ${filters.brand}`}
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {filters.minRating > 0 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Rating: {filters.minRating}+
                        <button
                          onClick={() => handleFilterChange("minRating", 0)}
                          className="ml-1 hover:bg-yellow-200 rounded-full p-0.5 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                          aria-label="Remove rating filter"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden block"
                  >
                    <article>
                      {/* Product Image */}
                      <div className="h-48 bg-gray-200 flex items-center justify-center relative">
                        <div className="text-gray-400 text-center">
                          <svg
                            className="w-12 h-12 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm mt-2 block">
                            {product.name} Image
                          </span>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-3 left-3 space-y-1">
                          {!product.inStock && (
                            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                              Out of Stock
                            </span>
                          )}
                          {product.featured && (
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                              Featured
                            </span>
                          )}
                        </div>

                        {/* Add to Cart Success Message */}
                        {addedToCart === product.id && (
                          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded shadow-lg">
                            Added to Cart!
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h2 className="text-xl font-semibold text-gray-900">
                            {product.name}
                          </h2>
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                            {product.category}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-2 text-sm">
                          {product.brand}
                        </p>

                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-gray-900">
                            ${product.price}
                          </span>

                          <div className="flex items-center">
                            <div className="flex text-yellow-400 mr-2">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : "fill-gray-300"}`}
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {product.rating}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={!product.inStock || isInCart(product.id)}
                          className={`w-full font-medium py-2 px-4 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            !product.inStock
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : isInCart(product.id)
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          {!product.inStock
                            ? "Out of Stock"
                            : isInCart(product.id)
                              ? "Added to Cart ✓"
                              : "Add to Cart"}
                        </button>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Empty state */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
