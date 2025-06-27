import app from './app';
import { config } from './src/config/environments';

app.listen(config.port, () => {
  console.log(
    `Server is running on port ${config.port} in ${config.nodeEnv} mode`
  );
});
