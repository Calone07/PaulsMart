import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Badge from './ui/Badge';
import ProductImage from './ui/ProductImage';
import { useCart } from '../context/CartContext';

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-4 h-4 ${
          star <= Math.round(rating) ? 'text-accent fill-accent' : 'text-gray-200 fill-gray-200'
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="text-xs text-gray-400 ml-1">({rating})</span>
  </div>
);

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Link to={`/shop/${product._id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        className="group bg-card rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-shadow duration-300 hover:shadow-lg cursor-pointer"
      >
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <ProductImage
            src={product.images?.[0]}
            alt={product.name}
            categoryName={product.category?.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
          {discount > 0 && (
            <Badge color="accent" className="absolute top-3 left-3">
              -{discount}%
            </Badge>
          )}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {product.category?.name && (
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">
              {product.category.name}
            </p>
          )}
          <h3 className="font-semibold text-dark text-sm leading-snug line-clamp-2 mb-1">
            {product.name}
          </h3>
          <StarRating rating={product.rating} />
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl font-bold text-primary">
              ${product.price.toLocaleString()}
            </span>
            {product.comparePrice > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ${product.comparePrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
