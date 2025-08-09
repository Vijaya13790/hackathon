import React, { useState, useEffect } from 'react';
import { Product, productList } from './ProductList';
import './Product.css'; // Assuming you have a CSS file for styles
import '../assets/Watch.jpg'

// API Response Interface
interface ApiResponse {
  products: Product[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Mock API function that simulates API call but uses productList data
const fetchProducts = async (page: number, limit: number = 18, searchTerm: string = '', category: string = ''): Promise<ApiResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Simulate potential API error (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Failed to fetch products. Please try again.');
  }

  // Filter products based on search and category
  let filteredProducts = productList;

  // Apply search filter
  if (searchTerm.trim()) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply category filter
  if (category && category !== '') {
    filteredProducts = filteredProducts.filter(product =>
      product.category === category
    );
  }

  // Apply pagination to filtered results
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const products = filteredProducts.slice(startIndex, endIndex);
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / limit);

  return {
    products,
    totalProducts,
    currentPage: page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
};

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tempSearchTerm, setTempSearchTerm] = useState('');

  const productsPerPage = 18;

  // Get unique categories from productList
  const categories = Array.from(new Set(productList.map(product => product.category))).sort();

  // Function to load products
  const loadProducts = async (page: number, search: string = searchTerm, category: string = selectedCategory) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchProducts(page, productsPerPage, search, category);
      setProducts(response.products);
      setTotalProducts(response.totalProducts);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
      setHasNextPage(response.hasNextPage);
      setHasPrevPage(response.hasPrevPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Load initial products on component mount
  useEffect(() => {
    loadProducts(1);
  }, []);

  const handlePageChange = async (pageNumber: number) => {
    await loadProducts(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(tempSearchTerm);
    setCurrentPage(1);
    await loadProducts(1, tempSearchTerm, selectedCategory);
  };

  const handleCategoryFilter = async (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    await loadProducts(1, searchTerm, category);
  };

  const handleClearFilters = async () => {
    setSearchTerm('');
    setTempSearchTerm('');
    setSelectedCategory('');
    setCurrentPage(1);
    await loadProducts(1, '', '');
  };

  const handleAddToCart = (productId: string, productName: string) => {
    // Add your cart logic here
    console.log(`Added ${productName} (ID: ${productId}) to cart`);
    alert(`Cart feature is not available yet. We're working on it!`);
  };

  const handleRetry = () => {
    loadProducts(currentPage);
  };

  // Calculate display indices
  const indexOfFirstProduct = (currentPage - 1) * productsPerPage + 1;
  const indexOfLastProduct = Math.min(currentPage * productsPerPage, totalProducts);

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="container">
          <h1 className="header-title">
            YuzeePoint - Your Ultimate Shopping Destination
          </h1>
        </div>
      </div>

      <div className="container">
        {/* Page Title */}
        <div className="page-title">
          <h1 className="page-title-main">Our Products</h1>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-container">
          {/* Search Bar */}
          <div className="search-section">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search products..."
                value={tempSearchTerm}
                onChange={(e) => setTempSearchTerm(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button" disabled={loading}>
                Search
              </button>
            </form>
          </div>

          {/* Category Filter */}
          <div className="filter-section">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="category-select"
              disabled={loading}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={category + index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          {(searchTerm || selectedCategory) && (
            <div className="clear-filters-section">
              <button
                onClick={handleClearFilters}
                className="clear-filters-button"
                disabled={loading}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {(searchTerm || selectedCategory) && (
          <div className="active-filters">
            <span className="active-filters-label">Active filters:</span>
            {searchTerm && (
              <span className="filter-tag">
                Search: "{searchTerm}"
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setTempSearchTerm('');
                    loadProducts(1, '', selectedCategory);
                  }}
                  className="remove-filter"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="filter-tag">
                Category: {selectedCategory}
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    loadProducts(1, searchTerm, '');
                  }}
                  className="remove-filter"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={handleRetry} className="retry-button">
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <p>Loading products...</p>
            <div className="loading-spinner"></div>
          </div>
        )}

        {/* Products Count */}
        {!loading && !error && (
          <div className="products-info">
            {totalProducts > 0 ? (
              <>
                Showing {indexOfFirstProduct}-{indexOfLastProduct} of {totalProducts} products
                {(searchTerm || selectedCategory) && (
                  <span className="filter-info">
                    {searchTerm && ` matching "${searchTerm}"`}
                    {selectedCategory && ` in ${selectedCategory}`}
                  </span>
                )}
              </>
            ) : (
              <span>No products found</span>
            )}
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <div className="grid">
            {products.map((product, index) => (
              <div
                key={product.id + index}
                className="card"
                onMouseEnter={(e) => {
                  e.currentTarget.classList.add('card-hover');
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.remove('card-hover');
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=250&fit=crop&auto=format';
                  }}
                />
                <div className="card-content">
                  <h3 className="card-title">{product.name}</h3>
                  <p className="card-category">{product.category}</p>
                  <p className="card-description">{product.description}</p>
                  <div className="card-rating">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        style={{
                          color: index < product.rating ? '#ffc107' : '#e0e0e0',
                          fontSize: '1.2rem'
                        }}
                      >
                        ★
                      </span>
                    ))}
                    <span className="rating-text">({product.rating}/5)</span>
                  </div>
                  <p className="card-price">&#x20B9; {product.price.toFixed(2)}</p>
                  <button
                    className="card-button"
                    onClick={() => handleAddToCart(product.id, product.name)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1565c0';
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1976d2';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="empty-state">
            <p>
              {searchTerm || selectedCategory
                ? 'No products found matching your criteria.'
                : 'No products available.'}
            </p>
            {(searchTerm || selectedCategory) && (
              <button onClick={handleClearFilters} className="clear-filters-button">
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && products.length > 0 && totalPages > 1 && (
          <div className="pagination">
            <button
              className={`page-button ${!hasPrevPage ? 'disabled' : ''}`}
              onClick={() => hasPrevPage && handlePageChange(1)}
              disabled={!hasPrevPage || loading}
            >
              First
            </button>

            <button
              className={`page-button ${!hasPrevPage ? 'disabled' : ''}`}
              onClick={() => hasPrevPage && handlePageChange(currentPage - 1)}
              disabled={!hasPrevPage || loading}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(currentPage - 2 + 1, totalPages));
              return (
                <button
                  key={pageNum + i}
                  className={`page-button ${currentPage === pageNum ? 'active-page-button' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={loading}
                >
                  {pageNum}
                </button>
              );
            })}


            <button
              className={`page-button ${!hasNextPage ? 'disabled' : ''}`}
              onClick={() => hasNextPage && handlePageChange(currentPage + 1)}
              disabled={!hasNextPage || loading}
            >
              Next
            </button>

            <button
              className={`page-button ${!hasNextPage ? 'disabled' : ''}`}
              onClick={() => hasNextPage && handlePageChange(totalPages)}
              disabled={!hasNextPage || loading}
            >
              Last
            </button>
          </div>
        )}

        {/* Page Info */}
        {!loading && !error && products.length > 0 && (
          <div className="page-info">
            Page {currentPage} of {totalPages} | Total Products: {totalProducts}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;