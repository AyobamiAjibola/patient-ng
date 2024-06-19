import http from 'http';
import 'dotenv/config';
import app from './app';
import startup from './startup';
import AppLogger from './utils/AppLogger';

const logger = AppLogger.init('server').logger;
const port = process.env.PORT || 5010;

const server = http.createServer(app);

async function startServer() {
  try {
    await startup();
    await server.listen(port, () => logger.info(`Server running on port: ${port}`));
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

startServer();