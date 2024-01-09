const Image = require('../models/image');
const cloudinary = require('../cloudinary/cloudinary')

const ImageController = {
  Upload: async (req, res) => {
    const { image, username, userId } = req.body;
    try {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        upload_preset: "unsigned_upload",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfig", "webp"],
      });
      res.status(200).json(uploadedImage);
      console.log(uploadedImage)
      req.body.imageURL = uploadedImage.secure_url
    } catch (err) {
      console.log(err);
    }
  },
  Create: (req, res) => {
    const Image = new Image(req.body, localStorage.user_id);
    userID = localStorage.userID
    ImageURL = req.body.ImageURL;
    console.log(Image);
    }
}

module.exports = ImageController

