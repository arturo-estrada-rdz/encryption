import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import env from './environments';

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Encrypt API',
      version: '1.0.0',
      description: 'API documentation for Encrypt application',
    },
    servers: [
      {
        url: `http://localhost:${env.port}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
