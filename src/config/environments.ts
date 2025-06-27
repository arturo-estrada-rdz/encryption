import dotenv from 'dotenv';

dotenv.config();

interface Environment {
  port: number;
  nodeEnv: string;
}

export const config: Environment = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
};
