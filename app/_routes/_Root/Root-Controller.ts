import asyncHandler from "express-async-handler";

const getRoot = asyncHandler(async (req, res, next) => {
  try {
    res.status(200).json({ data: { hi: "Hi Justin How Are you?" } });
  } catch (err) {
    res.status(500).json({ error: `Data not found` });
  }
});

export default getRoot;
