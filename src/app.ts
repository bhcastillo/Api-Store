import express, { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
//Routes
import productsRoutes from './routes/routes';
dotenv.config();
const app: Application = express();
//Settings
app.set('PORT', 3000);
//Middlewares
app.use(express.json());
app.use(morgan('dev'));
//Routes
app.use('/api', productsRoutes);
export default app;
