import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: [
    './src/db/user-schema.ts',
  ],
  dialect: 'turso',
  dbCredentials: {
    url: "http://127.0.0.1:8080",
    authToken: "xxx",
  },
});