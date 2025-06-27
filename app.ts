import express from 'express';
import messageRouter from './src/routes/message.router';
import { errorHandler } from './src/error/error';

const app = express();

app.use(express.json());

app.use('/messages', messageRouter);

app.use(errorHandler);

export default app;
