import { json, Request, Response } from 'express';
import { connect } from '../database';
import { map } from 'rxjs/operators';

export const getAll = async (req: Request, res: Response): Promise<Response> => {
  const conn = await connect();
  const categories = await conn.query('SELECT * FROM categories');
  let productsQuery = await conn.query(`
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
  products.forEach((product: any) => {
    product.categories = JSON.parse(product.categories);
  });

  const query = { categories: categories[0], products: products };
  return res.status(200).json(query);
};
export const createPurchase = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id;
  const conn = await connect();
  const product = await conn.query(`SELECT * FROM products WHERE id =${id} `);
  return res.status(200).json(product[0]);
};
