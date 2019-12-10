const router = require("express").Router();
const db = require("./images-model.js");

const { cloudinaryConfig, uploader } = require('../cloudinary/cloudConfig.js');
const { multerUploads, dataUri } = require('../cloudinary/multer.js');
cloudinaryConfig(router);

router.get("/", (req, res) => {
    db.getAll()
      .then(images => {
        res.status(200).json(images);
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
});

router.post('/upload', multerUploads, (req, res) => {
    if(req.file) {
      const file = dataUri(req).content;
      return uploader.upload(file).then(result => {
        const image = result.url;
        return res.status(200).json({ message: "Your image has been successfully uploaded to cloudinary!", data: { image }})
      })
      .catch(err => {
        res.status(400).json({ message: "An error occurred while processing your request.", err: err })
      })
    };
})

module.exports = router;