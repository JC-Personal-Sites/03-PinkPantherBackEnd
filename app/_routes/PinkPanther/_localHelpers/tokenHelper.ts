import type { Response } from "express";
import type { I_RequestUser } from "../Users/Users-Model";

const setTokenResponse = (req: I_RequestUser, status: number, res: Response): void => {
  const resUser = {
    _id: req.user._id,
    id: req.user.id,
    slug: req.user.slug,
    name: req.user.firstName + " " + req.user.lastName,
    emailAddress: req.user.emailAddress,
    roleId: req.user.roleId,
    role: req.user.role,
    ableToEdit: req.user.ableToEdit,
    createAt: req.user.createAt,
  };

  if (req.user.id === 0) {
    res.status(status).json({ success: true, user: resUser });
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
      .json({ success: true, user: resUser });
  }
};

export default setTokenResponse;
