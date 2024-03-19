import type * as jwt from "jsonwebtoken";

export interface I_JWTToken extends jwt.JwtPayload {
  userId: string;
  userFingerPrint: string;
  iat: number;
  exp: number;
}

export default I_JWTToken;
