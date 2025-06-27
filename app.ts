import express from 'express';
import { errorHandler } from './src/error/error';
import messageRouter from './src/routes/message.router';

const app = express();

app.use(express.json());

app.use('/messages', messageRouter);

app.use(errorHandler);

export default app;
