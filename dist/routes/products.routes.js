"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controllers_1 = require("../middlewares/products.controllers");
const router = express_1.Router();
router.get('/products', products_controllers_1.getProducts);
router.get('/product/:id', products_controllers_1.getProduct);
exports.default = router;
//# sourceMappingURL=products.routes.js.map