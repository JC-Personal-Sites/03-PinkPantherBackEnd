import type { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler"; // This handler allows to implement DRY and remove the try catch blocks https://www.npmjs.com/package/express-async-handler or https://www.acuriousanimal.com/blog/20180315/express-async-middleware

// This is what the code looked like before using the asyncHandler
// const getRoot = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     res.status(200).json({ data: { hi: "Hi Justin How Are You?" } });
//   } catch (err) {
//     //Because we added the error handler in the 'app' tree all errors go through this.
//     // No need to write a local error message here. i.e. next(res.status(500).json({ error: `Data not found` }));
//     next(err)
//   }
// };

const getRoot = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ status: "success", data: { hi: "Hi Justin How Are You?" } });
});

export default getRoot;
