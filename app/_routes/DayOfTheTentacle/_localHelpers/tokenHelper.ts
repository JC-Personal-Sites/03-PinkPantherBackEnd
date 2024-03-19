import type { Response } from "express";
import type { I_RequestUser } from "../Users/Users-Model";

const setTokenResponse = (req: I_RequestUser, status: number, res: Response, task: "login" | "logout"): void => {
  if (task === "login") {
    const userData = req.user.getUser();
    const tokenData = req.user.getToken();
    if (req.user.id === 0) {
      // @ts-expect-error
      res.status(status).set("userCsrf", tokenData.csrf).json({ status: "success", data: userData });
    } else {
      const cookieOptions = {
        httpOnly: process.env.COOKIE_HTTPONLY,
        secure: process.env.COOKIE_SECURE,
        sameSite: process.env.COOKIE_SAMESITE, // Set to 'None' as honested in different locations, update this for real world production
        maxAge: +process.env.COOKIE_MAXAGE,
      };

      res
        .status(status)
        // @ts-expect-error
        .cookie(process.env.JWT_FGP_COOKIENAME, tokenData.fingerPrint, cookieOptions)
        // @ts-expect-error
        .cookie("token", tokenData.token, cookieOptions)
        // @ts-expect-error
        .set("userCsrf", tokenData.csrf)
        .json({ status: "success", data: userData });
    }
  } else if (task === "logout") {
    res
      .status(status)
      .cookie(process.env.JWT_FGP_COOKIENAME, "", { httpOnly: true, maxAge: +new Date(0) })
      .cookie("token", "", { httpOnly: true, maxAge: +new Date(0) })
      .json({ status: "success" });
  }
};

export default setTokenResponse;
