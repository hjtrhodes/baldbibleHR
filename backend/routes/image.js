const express = require("express");
const router = express.Router(); // call the Router method, which returns a router object, which we store in the router constant
const cloudinary = require("../cloudinary/cloudinary");
const auth = require("../middleware/auth"); // import the object exported from middleware/auth.js
const multer = require("../middleware/multer-config"); // import the object exported from middleware/multer-config.js

const ImageController = require("../controllers/image"); // import the object exported from controllers/stuff.js
const UploadController = require("../controllers/upload");

const CommentController = require("../controllers/comment");

router.post("/upload", UploadController.Upload);

router.get("/", ImageController.getAllImage); // call the get method, which adds a route to the router object, the auth middleware is executed before the getAllStuff function, to handle GET requests to the /api/stuff endpoint referencing the getAllStuff function in controllers/stuff.js

router.post("/", auth, multer, ImageController.createImage); // call the post method, which adds a route to the router object, to handle POST requests to the /api/stuff endpoint referencing the createImage function in controllers/stuff.js

router.get("/:id", auth, ImageController.getOneImage); // call the get method, which adds a route to the router object, to handle GET requests to the /:id endpoint referencing the getOneImage function in controllers/stuff.js

router.put("/:id", auth, multer, ImageController.modifyImage); // call the put method, which adds a route to the router object, to handle PUT requests to the /:id endpoint referencing the modifyImage function in controllers/stuff.js

router.delete("/:id", auth, ImageController.deleteImage); // call the delete method, which adds a route to the router object, to handle DELETE requests to the /:id endpoint referencing the deleteImage function in controllers/stuff.js

router.put("/:id/likes", ImageController.AddOrRemoveUserIDFromImageLikesArray);

router.get("/:id/likes", ImageController.GetLikes);

router.post('/:id/comments', auth, CommentController.addComment);

router.get('/:id/comments', auth, CommentController.getAllComments);

router.delete('/:id/comments/:commentId', auth, CommentController.deleteComment);

module.exports = router; // export the router object, so it can be used by other code, e.g. app.jsn
