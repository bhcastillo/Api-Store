"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPurchase = exports.getAll = void 0;
const database_1 = require("../database");
exports.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield database_1.connect();
    const categories = yield conn.query('SELECT * FROM categories');
    let productsQuery = yield conn.query(`
  SELECT 
    products.id, 
    products.name, 
    concat('[', GROUP_CONCAT(categories.id ORDER BY categories.id ASC SEPARATOR ', ') , ']') AS categories, 
    products.price,
    products.img,
    products.description
  FROM categories 
  INNER JOIN categoriesproducts ON categories.id = categoriesproducts.category_id
  INNER JOIN products ON categoriesproducts.product_id = products.id
  GROUP BY products.id`);
    let productsStringify = JSON.stringify(productsQuery[0]);
    let products = JSON.parse(productsStringify);
    products.forEach((product) => {
        product.categories = JSON.parse(product.categories);
    });
    const query = { categories: categories[0], products: products };
    return res.status(200).json(query);
});
exports.createPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const conn = yield database_1.connect();
    const product = yield conn.query(`SELECT * FROM products WHERE id =${id} `);
    return res.status(200).json(product[0]);
});
//# sourceMappingURL=products.controllers.js.map