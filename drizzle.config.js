import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url:'postgresql://neondb_owner:npg_f6gaAxM4nWzp@ep-spring-voice-a8xf3mjq-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
  }
});
