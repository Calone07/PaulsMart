import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProductImage from '../components/ui/ProductImage';
import ProductGrid from '../components/ProductGrid';
import { getProduct, getProducts } from '../services/productService';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSelectedImage(0);
    setQuantity(1);

    getProduct(id)
      .then((data) => {
        setProduct(data);
        return getProducts({
          category: data.category?._id,
          limit: 4,
        });
      })
      .then((data) => {
        setRelated(data.products?.filter((p) => p._id !== id) || []);
      })
      .catch((err) => {
        setError(err.response?.status === 404 ? 'Product not found' : 'Failed to load product');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container className="py-12">
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-4 w-48 bg-gray-200 rounded-lg mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-200 rounded-3xl" />
            <div className="space-y-4">
              <div className="h-4 w-20 bg-gray-200 rounded-full" />
              <div className="h-8 w-3/4 bg-gray-200 rounded-lg" />
              <div className="h-4 w-32 bg-gray-200 rounded-lg" />
              <div className="h-10 w-40 bg-gray-200 rounded-lg mt-6" />
              <div className="h-24 w-full bg-gray-200 rounded-2xl mt-6" />
            </div>
          </div>
        </div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-20">
        <div className="text-center max-w-md mx-auto">
          <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-dark mb-2">
            {error === 'Product not found' ? 'Product Not Found' : 'Oops!'}
          </h2>
          <p className="text-gray-500 mb-6">
            {error === 'Product not found'
              ? "The product you're looking for doesn't exist or has been removed."
              : error || 'Something went wrong.'}
          </p>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </Container>
    );
  }

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const images = product.images?.length > 0 ? product.images : [];

  return (
    <Container className="py-8 lg:py-12">
      <div className="max-w-6xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-gray-600 truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-square rounded-3xl overflow-hidden mb-4">
              <ProductImage
                src={images[selectedImage]}
                alt={product.name}
                categoryName={product.category?.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-colors ${
                      i === selectedImage ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <ProductImage src={img} alt={product.name} categoryName={product.category?.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            {product.category?.name && (
              <Badge color="primary" className="mb-3 self-start">
                {product.category.name}
              </Badge>
            )}

            <h1 className="text-3xl lg:text-4xl font-bold text-dark leading-tight mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(product.rating)
                        ? 'text-accent fill-accent'
                        : 'text-gray-200 fill-gray-200'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-400">
                {product.rating} ({product.numReviews} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-primary">
                ${product.price.toLocaleString()}
              </span>
              {product.comparePrice > 0 && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.comparePrice.toLocaleString()}
                  </span>
                  <Badge color="accent">-{discount}%</Badge>
                </>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {product.specs?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-dark uppercase tracking-wide mb-3">
                  Key Specs
                </h3>
                <div className="space-y-2">
                  {product.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-2xl text-sm"
                    >
                      <span className="text-gray-500">{spec.label}</span>
                      <span className="font-medium text-dark">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-12 text-center font-medium text-dark text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <Button size="lg" className="flex-1" onClick={() => addItem(product, quantity)}>
                Add to Cart
              </Button>
              <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-2xl text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <p className="text-xs text-gray-400 flex items-center gap-1.5">
              {product.stock > 0 ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  In Stock ({product.stock} available)
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Out of Stock
                </>
              )}
            </p>
          </motion.div>
        </div>

        {product.specs?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-dark mb-6">Full Specifications</h2>
            <div className="bg-card rounded-3xl border border-gray-100 overflow-hidden">
              <table className="w-full">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-500 w-1/3">
                        {spec.label}
                      </td>
                      <td className="px-6 py-4 text-sm text-dark">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-dark mb-6">Related Products</h2>
            <ProductGrid products={related.slice(0, 4)} />
          </motion.div>
        )}
      </div>
    </Container>
  );
}
