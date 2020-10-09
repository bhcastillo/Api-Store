import { Router } from 'express';
import { validateCustomerId, validateProducts } from '../middlewares/validatePurchase';
import { getAll, createPurchase, getProduct } from '../controllers/products.controllers';

const router: Router = Router();

router.get('/getAll', getAll);
router.get('/getProduct/:id', getProduct);
router.post('/createPurchase',[validateCustomerId,validateProducts], createPurchase);

export default router;
