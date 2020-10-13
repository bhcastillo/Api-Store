"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateIdProduct_1 = require("../middlewares/validateIdProduct");
const validatePurchase_1 = require("../middlewares/validatePurchase");
const products_controllers_1 = require("../controllers/products.controllers");
const router = express_1.Router();
router.get('/getAll', products_controllers_1.getAll);
router.get('/getProduct/:id', [validateIdProduct_1.validateProductId], products_controllers_1.getProduct);
router.post('/createPurchase', [validatePurchase_1.validateCustomerId, validatePurchase_1.validateProducts], products_controllers_1.createPurchase);
exports.default = router;
//# sourceMappingURL=routes.js.map