const uploadImage = (req, res, next) => {
  try {
    const { filename } = req.file;

    return res.status(200).json({ fileUrl: `/image/${filename}` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImage,
};
