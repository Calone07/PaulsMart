import { Router } from 'express';
import {
  getProducts,
  getProduct,
  getFeaturedProducts,
} from '../controllers/productController.js';

const router = Router();

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProduct);

export default router;
