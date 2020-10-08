import { Router } from 'express';
import { getAll, createPurchase } from '../controllers/products.controllers';

const router: Router = Router();

router.get('/getAll', getAll);
router.post('/createPurchase', createPurchase);

export default router;
