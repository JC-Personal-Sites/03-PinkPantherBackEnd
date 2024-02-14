import { Request, Response, NextFunction } from "express";
import Crypto from "crypto";
import "dotenv/config";
import jwt from "jsonwebtoken";

const VerifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // if (!req.headers.authorization) {
  //   return res.status(403).json({ message: 'No Authorization' });
  // }
  // const token = req.headers.authorization.split(' ')[1];
  // const userFingerprint = req.cookies[process.env.JWT_FGP_COOKIENAME];

  // if (!token) {
  //   return res.status(403).json({ message: 'No token provided' });
  // }

  // if (!userFingerprint) {
  //   return res.status(403).json({ message: 'No Authorization' });
  // }

  // if (typeof userFingerprint !== 'string') {
  //   return res.status(403).json({ message: 'No Authorization' });
  // }

  try {
    //   const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    //   if (decoded.userFingerPrint !== Crypto.createHash('sha256').update(userFingerprint).digest('hex')) {
    //     return res.status(403).json({ message: 'No Authorization' });
    //   }
    //   req.user = {
    //     userId: decoded.userId,
    //     userTypeId: decoded.userTypeId,
    //     userType: decoded.userType,
    //     userRoles: decoded.roles,
    //     userSideBarId: decoded.userSideBarId,
    //   };
    // next();
  } catch (ex) {
    return res.status(500).json({ message: "Token expired", token: null });
  }
};

export default VerifyToken;
