import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './src/config/swagger-options';
import { errorHandler } from './src/error/error';
import messageRouter from './src/routes/message.router';
import payloadRouter from './src/routes/payload.router';
import userRouter from './src/routes/user.router';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/payload', payloadRouter);
app.use('/user', userRouter);
app.use('/message', messageRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

export default app;
