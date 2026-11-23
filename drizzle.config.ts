import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'
import { resolveDbConfig } from './src/db/config.ts'

config({ path: '.env.local' })

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'turso',
  dbCredentials: resolveDbConfig(),
})
