import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  PROT: process.env.USER_PROT,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
  jwt_access_token_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_token_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
};
