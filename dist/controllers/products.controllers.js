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
exports.createPurchase = exports.getProduct = exports.getAll = void 0;
const database_1 = require("../database");
exports.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield database_1.connect();
    const categories = yield conn.query("SELECT * FROM categories");
    const bestSellerId = yield bestSellingProduct(conn);
    const productsQuery = yield conn.query(`SELECT 
    products.id, 
    products.name, 
    concat('[', GROUP_CONCAT(categories.id ORDER BY categories.id ASC SEPARATOR ', ') , ']') AS categories, 
    NULL AS available,
    NULL AS bestSeller, 
    products.quantity,
    products.price,
    products.img,
    products.description
  FROM categories 
  INNER JOIN categoriesproducts ON categories.id = categoriesproducts.category_id
  INNER JOIN products ON categoriesproducts.product_id = products.id GROUP BY products.id`);
    const products = JSON.parse(JSON.stringify(productsQuery[0]));
    products.forEach((product) => {
        product.categories = JSON.parse(product.categories);
        product.available = product.quantity > 0 ? true : false;
        product.bestSeller = bestSellerId === product.id ? true : false;
        //delete product.quantity;
    });
    const query = { categories: categories[0], products: products };
    return res.status(200).json(query);
});
exports.getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ message: "id not provide" });
    const conn = yield database_1.connect();
    const bestSellerId = yield bestSellingProduct(conn);
    const productsQuery = yield conn.query(`
  SELECT 
    products.id, 
    products.name, 
    concat('[', GROUP_CONCAT(categories.id ORDER BY categories.id ASC SEPARATOR ', ') , ']') AS categories, 
    NULL AS available,
    NULL AS bestSeller,
    products.quantity,
    products.price,
    products.img,
    products.description
  FROM categories 
  INNER JOIN categoriesproducts ON categories.id = categoriesproducts.category_id
  INNER JOIN products ON categoriesproducts.product_id = products.id
  WHERE products.id =${id} GROUP BY products.id`);
    const product = JSON.parse(JSON.stringify(productsQuery[0]));
    product[0].categories = JSON.parse(product[0].categories);
    product[0].available = product[0].quantity > 0 ? true : false;
    product[0].bestSeller = bestSellerId === product[0].id ? true : false;
    return res.status(200).json(product);
});
exports.createPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { products, customerId } = req.body;
    const conn = yield database_1.connect();
    products.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
        yield conn.query(`
          INSERT INTO sold_products (id, customer_id, product_id, quantity, dateCreate) 
          VALUES (NULL, ${customerId}, ${product.id}, ${product.quantity}, '${dateCreate()}')`);
    }));
    return res.status(400).json({ message: "purchase completed" });
});
const bestSellingProduct = (conn) => __awaiter(void 0, void 0, void 0, function* () {
    const bestSellerQuery = yield conn.query(`
    SELECT product_id as idProductBestSeller, SUM(quantity)as bestSeller 
    FROM sold_products 
    GROUP BY product_id 
    ORDER BY bestSeller DESC 
    LIMIT 1`);
    const bestSeller = JSON.parse(JSON.stringify(bestSellerQuery[0]));
    return bestSeller[0].idProductBestSeller;
});
const dateCreate = () => {
    const today = new Date();
    return `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
};
//# sourceMappingURL=products.controllers.js.map