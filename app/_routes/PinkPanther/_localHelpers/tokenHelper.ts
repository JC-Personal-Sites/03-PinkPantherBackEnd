import type { Response } from "express";
import type { I_RequestUser } from "../Users/Users-Model";

const setTokenResponse = (req: I_RequestUser, status: number, res: Response, task: "login" | "logout"): void => {
  if (task === "login") {
    const userData = req.user.getUser();
    if (req.user.id === 0) {
      res.status(status).json({ status: "success", data: userData });
    } else {
      const tokenData = req.user.getToken();

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
        .json({ status: "success", data: userData });
    }
  } else if (task === "logout") {
    res.status(status).cookie("", "", {}).json({ status: "success" });
  }
};

export default setTokenResponse;
