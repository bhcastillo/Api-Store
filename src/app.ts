import express, { Application } from 'express';
import  cors  from 'cors';

import morgan from 'morgan';
import dotenv from 'dotenv';
//Routes
import productsRoutes from './routes/routes';
dotenv.config();
const app: Application = express();
//Settings
app.set('PORT',process.env.PORT || 3000);
//Middlewares
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
//Routes
app.use('/api', productsRoutes);
export default app;
