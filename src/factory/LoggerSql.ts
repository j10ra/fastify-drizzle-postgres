import { Logger as PgLogger } from 'drizzle-orm';
import Logger from './Logger';

export default class LogSql implements PgLogger {
  logQuery(query: string, params: unknown[]): void {
    if (process.env.NODE_ENV !== 'production') {
      Logger.log(`\x1b[33m[POSTGRESQL]:\x1b[0m ${this.format(query, params)}`);
    }
  }

  format(query: string, params: unknown[]) {
    try {
      let formattedQuery = query;

      params.forEach((param, index) => {
        const value = typeof param === 'string' ? `'${param}'` : param;

        formattedQuery = formattedQuery.replace(`$${index + 1}`, value as any);
      });

      return formattedQuery;
    } catch (err) {
      Logger.error('Error formatting query for postgres:', err);

      return null;
    }
  }
}
