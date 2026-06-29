import api from './api';
import { mockProducts } from '../utils/mockData';

const filterProducts = (params = {}) => {
  let result = [...mockProducts];

  if (params.search) {
    const q = params.search.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  if (params.category) {
    const catIds = params.category.split(',');
    result = result.filter((p) => catIds.includes(p.category._id));
  }

  if (params.minPrice) {
    result = result.filter((p) => p.price >= Number(params.minPrice));
  }

  if (params.maxPrice) {
    result = result.filter((p) => p.price <= Number(params.maxPrice));
  }

  if (params.sort) {
    switch (params.sort) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }

  return result;
};

export const getProducts = async (params = {}) => {
  try {
    const { data } = await api.get('/products', { params });
    return data;
  } catch {
    const filtered = filterProducts(params);
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(params.limit) || 12));
    const total = filtered.length;

    return {
      products: filtered.slice((page - 1) * limit, page * limit),
      page,
      pages: Math.ceil(total / limit),
      total,
    };
  }
};

export const getProduct = async (id) => {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch {
    const product = mockProducts.find((p) => p._id === id);
    if (!product) {
      const err = new Error('Product not found');
      err.response = { status: 404 };
      throw err;
    }
    return product;
  }
};

export const getFeaturedProducts = async () => {
  try {
    const { data } = await api.get('/products/featured');
    return data;
  } catch {
    return mockProducts.filter((p) => p.featured).slice(0, 8);
  }
};
