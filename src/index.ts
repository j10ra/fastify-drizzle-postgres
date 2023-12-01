import server from './server';

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

const port = (process.env.API_PORT as unknown as number) || 8000;
const startServer = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      for (const signal of ['SIGINT', 'SIGTERM']) {
        process.on(signal, () =>
          server.close().then((err) => {
            console.log(`close application on ${signal}`);
            process.exit(err ? 1 : 0);
          })
        );
      }
    }

    await server.listen({ port });
  } catch (err) {
    console.error(err);
  }
};

startServer();
