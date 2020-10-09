import { Router } from 'express';
import { validateCustomerId, validateProducts } from '../middlewares/validatePurchase';
import { getAll, createPurchase } from '../controllers/products.controllers';

const router: Router = Router();

router.get('/getAll', getAll);
router.post('/createPurchase',[validateCustomerId,validateProducts], createPurchase);

export default router;
