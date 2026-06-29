import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ProductGrid from '../components/ProductGrid';
import { getFeaturedProducts } from '../services/productService';
import { getCategories } from '../services/categoryService';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getFeaturedProducts()
      .then(setFeatured)
      .catch(() => {})
      .finally(() => setFeaturedLoading(false));
  }, []);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-b from-blue-50 to-surface py-20 lg:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-dark tracking-tight mb-6">
              Premium Tech.{' '}
              <span className="text-primary">Elevated.</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-500 mb-10 max-w-xl mx-auto">
              Discover the latest in electronics — curated for those who demand more.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/shop">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link to="/shop">
                <Button variant="outline" size="lg">
                  Explore Products
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark">Shop by Category</h2>
            <p className="text-gray-500 mt-3">Find exactly what you need.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(categories.length > 0 ? categories : ['Phones', 'Laptops', 'Gaming', 'Accessories']).map((cat, i) => (
            <Link key={cat._id || cat} to={`/shop?category=${cat._id}`} className="block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-white rounded-3xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
              >
                {cat.image && (
                  <img src={cat.image} alt={cat.name} className="w-12 h-12 mx-auto mb-3 object-contain" />
                )}
                <p className="font-semibold text-dark">{cat.name || cat}</p>
              </motion.div>
            </Link>
          ))}
            </div>
          </Container>
        </section>

        {featured.length > 0 && (
          <section className="py-20 bg-white">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between mb-10"
              >
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-dark">Featured Products</h2>
                  <p className="text-gray-500 mt-2">Handpicked just for you.</p>
                </div>
                <Link
                  to="/shop"
                  className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-blue-700 transition-colors"
                >
                  View All
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
              <ProductGrid products={featured} loading={featuredLoading} />
            </Container>
          </section>
        )}
      </div>
  );
}
