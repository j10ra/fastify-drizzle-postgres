import { Logger } from 'drizzle-orm';

export default class LoggerSql implements Logger {
  logQuery(query: string, params: unknown[]): void {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`\x1b[33m[POSTGRESQL]:\x1b[0m ${this.format(query, params)}`);
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
      console.error('Error formatting query for postgres:', err);

      return null;
    }
  }
}
