import { NextFunction, Request, Response } from 'express';
import { connect } from '../database';
import { IPurchase } from '../models/customer';

export const validateCustomerId = async (req: Request, res: Response, next: NextFunction) => {
  const conn = await connect();
  const { customerId } = req.body;
  const validateCustomerId = await conn.query(`SELECT id FROM customer WHERE id = ${customerId}`);

  if (Object.entries(validateCustomerId[0]).length === 0) {
    return res.status(400).json({ message: `customer id ${customerId} not valid ` });
  }
  next();
};
export const validateProducts = async (req: Request, res: Response, next: NextFunction) => {
  const conn = await connect();
  const products: IPurchase[] = req.body.products;

  for (let product of products) {
    const validateProductId = await conn.query(`SELECT id FROM products WHERE id = ${product.id}`);

    if (Object.entries(validateProductId[0]).length === 0) {
      return res.status(400).json({ message: `product id ${product.id} not valid` });
    }
  }
  next();
};
