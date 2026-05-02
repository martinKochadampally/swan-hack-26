import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || "5001",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",

  supabaseUrl: process.env.SUPABASE_URL || "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",

  clerkSecretKey: process.env.CLERK_SECRET_KEY || "",
};

export function checkEnv() {
  const required = [
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "CLERK_SECRET_KEY",
  ];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  }
}