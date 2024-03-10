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
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: +process.env.JWT_FGP_COOKIE_EXPIRYTIME,
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
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    };

    res
      .status(status)
      // @ts-expect-error
      .cookie(process.env.JWT_FGP_COOKIENAME, "", cookieOptions)
      // @ts-expect-error
      .cookie("token", "", cookieOptions)
      .json({ status: "success" });
  }
};

export default setTokenResponse;
