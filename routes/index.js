import { Router } from "express";

import productsRoutes from './products.js'
import categoryRoutes from './category.js'


const router = Router();

router.use('/products', productsRoutes);
router.use('/category', categoryRoutes);

export default router;