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

  reset_password_token: process.env.RESET_PASSWORD_TOKEN,
  reset_token_expires_in: process.env.RESET_TOKEN_EXPIRES_IN,
  reset_password_link: process.env.RESET_PASSWORD_LINK,

  sender_email: process.env.EMAIL,
  app_password: process.env.APP_PASSWORD,

  cloud_name: process.env.CLOUD_NAME,
  cloud_api_key: process.env.CLOUD_API_KEY,
  cloud_api_secret: process.env.CLOUD_API_SECRET
};
