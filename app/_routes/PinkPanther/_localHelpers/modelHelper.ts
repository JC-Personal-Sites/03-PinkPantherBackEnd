import type { Request } from "express";
import type * as jwt from "jsonwebtoken";

export interface I_RequestUser extends Request {
  user: {
    _id: string;
    id: string;
    slug: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    roleId: string;
    role: string;
    ableToEdit: boolean;
    logonData: {};
    createAt: Date;
  };
}

export interface I_JWTToken extends jwt.JwtPayload {
  userId: string;
  user: string;
  userRoleId: string;
  userRole: string;
  ableToEdit: boolean;
  userFingerPrint: string;
  iat: number;
  exp: number;
}

export default I_RequestUser;
