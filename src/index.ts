import { serviceLogger } from './config/logger.config';
import server from './server';

process.on('unhandledRejection', (err) => {
  serviceLogger('Un Handled Server Rejection', err);
  process.exit(1);
});

const port = (process.env.API_PORT as unknown as number) || 8000;
const startServer = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      for (const signal of ['SIGINT', 'SIGTERM']) {
        process.on(signal, () =>
          server.close().then((err) => {
            serviceLogger(`Close application on ${signal}`, err);
            process.exit(err ? 1 : 0);
          })
        );
      }
    }

    await server.ready();
    await server.listen({ port });
  } catch (err) {
    serviceLogger('Failed to start server', err);
  }
};

startServer();
