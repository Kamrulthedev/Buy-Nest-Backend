import jwt, { Secret } from "jsonwebtoken";

export const generateToken = (payload: any, secret: string, expiresIn: string) => {
  const token = jwt.sign(payload, secret, { algorithm: "HS256", expiresIn });

  return token;
};

export const VerifyToken = (Token : string, secret : Secret) =>{
  return jwt.verify(Token, secret);
};