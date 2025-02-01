import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler.js';
dotenv.config();

const app = express();

//* Middleware
app.use(express.json());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

//*  Routes import
import userRouter from './routes/user.route.js';

//* Routes
app.use('/api/v1/register', userRouter);

//* Global Error Handler
app.use(errorHandler);

export { app };
