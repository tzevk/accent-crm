import dotenv from "dotenv";
dotenv.config();
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    FRONTEND_URL: z.string().url(),
    SHADOW_DATABASE_URL: z.string().url(),
    PORT: z
      .string()
      .transform(Number)
      .refine((val) => !isNaN(val) && val > 0 && val < 65536, {
        message: "PORT must be a valid number between 1 and 65536",
      }),
    JWT_SECRET: z.string(),
    NODE_ENV: z.string(),
  },

  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  // clientPrefix: "PUBLIC_",

  // client: {
  //   PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  // },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: process.env,

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
});
