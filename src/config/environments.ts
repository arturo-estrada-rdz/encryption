import dotenv from 'dotenv';

dotenv.config();

interface Environment {
  port: string;
  nodeEnv: string;
}

const config: Environment = {
  port: process.env.PORT ?? '3000',
  nodeEnv: process.env.NODE_ENV ?? 'development',
};

export default config;
