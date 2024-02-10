const PictureSchema = require('./Pictures-Model');
const ErrorResponse = require('../../../middleware/errorResponse');
const asyncHandler = require('../../../middleware/async');

exports.getPictures = asyncHandler(async (req, res, next) => {
  try {
    const pictures = await PictureSchema.find();

    res.status(200).json({ data: pictures });
  } catch (err) {
    return next(new ErrorResponse(`Data not found`, 500));
  }
});

exports.getPicture = asyncHandler(async (req, res, next) => {
  const Picture = await PictureModel.findById(req.params.id);

  if (!Picture) {
    return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({ success: true, data: Picture });
});

exports.createPicture = asyncHandler(async (req, res, next) => {
  const createPicture = await PictureModel.create(req.body);

  res.status(201).json({ success: true, data: createPicture });
});

exports.updatePicture = asyncHandler(async (req, res, next) => {
  let updatePicture = await PictureModel.findById(req.params.id);

  if (!updatePicture) {
    return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
  }

  updatePicture = await PictureModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: updatePicture });
});

exports.deletePicture = asyncHandler(async (req, res, next) => {
  let deletePicture = await PictureModel.findById(req.params.id);

  if (!deletePicture) {
    return next(new ErrorResponse(`Data not found with id of ${req.params.id}`, 404));
  }

  deletePicture.remove();
  res.status(200).json({ success: true, data: {} });
});
