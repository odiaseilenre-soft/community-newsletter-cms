import { cleanEnv, str, port } from "envalid";

const env = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),

  MONGO_URI: str(),

  ACCESS_TOKEN_SECRET: str(),
  REFRESH_TOKEN_SECRET: str(),

  ACCESS_TOKEN_EXPIRES_IN: str(),
  REFRESH_TOKEN_EXPIRES_IN: str(),

  CLIENT_URL: str(),
  SERVER_URL: str(),

  NODE_ENV: str({
    default: "development",
    choices: ["development", "production", "test"],
  }),
});

export default env;