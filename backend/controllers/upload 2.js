const Image = require("../models/image");
const cloudinary = require("../cloudinary/cloudinary");

const ImageController = {
  Upload: async (req, res) => {
    const { image, username, userId } = req.body;
    try {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        upload_preset: "unsigned_upload",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfig", "webp"],
      });
      console.log(uploadedImage);
      const imageUrl = uploadedImage.secure_url;
      const dateAdded = uploadedImage.created_at;

      // Create a new instance of the Image model
      const newImage = new Image({
        userId: userId,
        username: username,
        imageUrl: imageUrl,
        dateAdded: dateAdded // Corrected property name to match the schema
      });

      // Save the newImage to the database
      await newImage.save();

      res.status(201).json({ message: "Image saved successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = ImageController;
//   },
//   Create: (req, res) => {
//     const Image = new Image(req.body, localStorage.user_id);
//     userID = localStorage.userID
//     ImageURL = req.body.ImageURL;
//     console.log(Image);
//     }

module.exports = ImageController;

// exports.addImage = (req, res, next) => {
//   console.log('you have reached the addImage controller');
//   const { src, altText, userId, username, userAvatar } = req.body;
//   console.log('src:', src, '& altText:', altText, '& userId:', userId);
//   const image = new Image({
//     src,
//     altText,
//     userId,
//     username,
//     userAvatar,
//   });
//   image
//     .save()
//     .then(() => res.status(201).json({ message: 'Image saved successfully!' }))
//     .catch((error) => res.status(400).json({ error: error }));
// };
