import './config/env.config';
import LogStream from './factory/LogStream';
import server from './server';

const port = parseInt(process.env.API_PORT, 10) || 8000;

const handleExit = async (signal, errorCode = 0) => {
  console.log(`Closing application on ${signal}...`);
  LogStream.closeAll();
  await server.close();
  process.exit(errorCode);
};

process.on('SIGINT', handleExit.bind(null, 'SIGINT'));
process.on('SIGTERM', handleExit.bind(null, 'SIGTERM'));
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Server Rejection', err);
  handleExit('UnhandledRejection', 1);
});

const startServer = async () => {
  try {
    await server.ready();
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Server running at port: ${port}`);
  } catch (err) {
    console.error('Failed to start server', err);
    handleExit('StartupError', 1);
  }
};

startServer();
