import { NextFunction, Request, Response } from 'express';
import { connect } from '../database';

export const validateProductId = async (req: Request, res: Response, next: NextFunction) => {
  const conn = await connect();
  const { id } = req.params;
  const validateProductId = await conn.query(`SELECT id FROM products WHERE id = ${id}`);

  if (Object.entries(validateProductId[0]).length === 0) {
    return res.status(400).json({ message: `product id ${id} not valid ` });
  }
  next();
};