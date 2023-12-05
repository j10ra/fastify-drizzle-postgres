import fs from 'fs';
import path from 'path';

class LogStream {
  logBaseDir: string;
  streams: { [key: string]: fs.WriteStream };

  constructor(logBaseDir: string = 'logs') {
    this.logBaseDir = logBaseDir;
    this.streams = {};
  }

  prefix(type: string = 'default') {
    // Provide a no-op function for non-production environments
    if (process.env.NODE_ENV !== 'production') {
      return {
        write: () => {},
        end: () => {},
      };
    }

    if (this.streams[type]) {
      return this.streams[type];
    }

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = date.toISOString().split('T')[0];

    const logDirectory = path.join(__dirname, `../../${this.logBaseDir}`, String(year), month);
    fs.mkdirSync(logDirectory, { recursive: true });

    const logFilePath = path.join(logDirectory, `${type}-${day}.txt`);
    this.streams[type] = fs.createWriteStream(logFilePath, { flags: 'a' });

    this.streams[type].on('error', (err) => {
      console.error(`Error in LogStream for type ${type}:`, err);
    });

    return this.streams[type];
  }

  closeAll() {
    for (const type in this.streams) {
      if (this.streams.hasOwnProperty(type)) {
        this.streams[type].end();
        delete this.streams[type];
      }
    }
  }
}

export default new LogStream();
