// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const setTokenResponse = (userDetails, status, res) => {
  const tokenData = userDetails.getToken();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: +process.env.JWT_FGP_COOKIE_EXPIRYTIME,
  };

  res
    .status(status)
    .cookie(process.env.JWT_FGP_COOKIENAME, tokenData.fingerPrint, cookieOptions)
    .cookie("token", tokenData.token, cookieOptions)
    .json({ success: true });
};

export default setTokenResponse;
