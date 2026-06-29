import api from './api';
import { mockCategories } from '../utils/mockData';

export const getCategories = async () => {
  try {
    const { data } = await api.get('/categories');
    return data;
  } catch {
    return mockCategories;
  }
};
