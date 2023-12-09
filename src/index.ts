import './config/env.config';
import LogStream from './factory/LogStream';
import server from './server';

const port = (process.env.API_PORT as unknown as number) || 8000;
const startServer = async () => {
  try {
    await server.ready();
    await server.listen({ port });
    console.log(`Server running at port: ${port}`);

    for (const signal of ['SIGINT', 'SIGTERM']) {
      process.on(signal, () => {
        server.close().then((err) => {
          LogStream.closeAll();
          console.log(`close application on ${signal}`);
          process.exit(err ? 1 : 0);
        });
      });
    }
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

process.on('unhandledRejection', async (err) => {
  console.error('Unhandled Server Rejection', err);
  process.exit(1);
});

// ensure that s
process.on('SIGINT', () => {
  LogStream.closeAll();
  process.exit(0);
});

startServer();
