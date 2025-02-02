import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import { Message } from './models/message.model.js';
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

//* Socket.io
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    },
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('sendMessage', async ({ sender, receiver, content }) => {
        const message = new Message({ sender, receiver, content });
        await message.save();
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

//*  Routes import
import userRouter from './routes/user.route.js';
import adminRouter from './routes/admin.route.js';
import messageRouter from './routes/message.route.js';

//* Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/message', messageRouter);

//* Global Error Handler
app.use(errorHandler);

export { server };
