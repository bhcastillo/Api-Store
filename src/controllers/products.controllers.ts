import { Request, Response } from 'express';
import { connect } from '../database';
import { IPurchase } from 'models/customer';

const getAllQuery = `SELECT 
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
  `
export const getAll = async (req: Request, res: Response): Promise<Response> => {
  const conn = await connect();
  const categories = await conn.query('SELECT * FROM categories');
  const bestSellerId = await bestSellingProduct(conn);
  const productsQuery = await conn.query(`${getAllQuery} GROUP BY products.id`);
  const products = JSON.parse(JSON.stringify(productsQuery[0]));
  products.forEach((product: any) => {
    product.categories = JSON.parse(product.categories);
    product.available = product.quantity > 0 ? true : false;
    product.bestSeller = bestSellerId === product.id ? true : false;
    delete product.quantity;
  });

  const query = { categories: categories[0], products: products };
  return res.status(200).json(query);
};
export const getProduct = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  if (!id) return res.status(400).json({message:'id not provide'});
  
  const conn = await connect();
  const bestSellerId = await bestSellingProduct(conn);
  const productsQuery = await conn.query(`${getAllQuery} WHERE products.id =${id} GROUP BY products.id`);
  const product = JSON.parse(JSON.stringify(productsQuery[0]));
  product[0].categories = JSON.parse(product[0].categories);
  product[0].available = product[0].quantity > 0 ? true : false;
  product[0].bestSeller = bestSellerId === product[0].id ? true : false;
  delete product[0].quantity;

  return res.status(200).json(product);
};
export const createPurchase = async (req: Request, res: Response): Promise<Response> => {
  const { products, customerId } = req.body;
  const conn = await connect();
  products.forEach(async (product: IPurchase) => {
    await conn.query(`
          INSERT INTO sold_products (id, customer_id, product_id, quantity, dateCreate) 
          VALUES (NULL, ${customerId}, ${product.id}, ${product.quantity}, '${dateCreate()}')`);
  });
  return res.status(400).json({ message: 'purchase completed' });
};

const bestSellingProduct = async (conn: any) => {
  const bestSellerQuery = await conn.query(`
    SELECT product_id as idProductBestSeller, SUM(quantity)as bestSeller 
    FROM sold_products 
    GROUP BY product_id 
    ORDER BY bestSeller DESC 
    LIMIT 1`);
  const bestSeller = JSON.parse(JSON.stringify(bestSellerQuery[0]));
  return bestSeller[0].idProductBestSeller;
};
const dateCreate =()=>{
  const today = new Date();
  return `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`
}