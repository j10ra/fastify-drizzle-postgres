import 'dotenv/config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, connection } from '../src/db';

(async () => {
  try {
    // Path to your migrations folder
    const migrationsFolder = './migrations';

    // Run migrations
    await migrate(db, { migrationsFolder });

    // Close the connection
    await connection.end();
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
})();
