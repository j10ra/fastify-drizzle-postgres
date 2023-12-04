import fs from 'fs';
import path from 'path';

class LogStreamGenerator {
  logBaseDir: string;
  streams: { [key: string]: fs.WriteStream };

  constructor(logBaseDir: string = 'logs') {
    this.logBaseDir = logBaseDir;
    this.streams = {};
  }

  getLogStream(type: string = 'default') {
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

    return this.streams[type];
  }
}

export default new LogStreamGenerator();
