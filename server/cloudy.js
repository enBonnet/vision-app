var cloudinary = require("cloudinary").v2;
require("custom-env").env();

cloudinary.config({
  cloud_name: process.env.CLOUDY_NAME,
  api_key: process.env.CLOUDY_API_KEY,
  api_secret: process.env.CLOUDY_API_SECRET
});

async function uploadImg(image) {
  try {
    const upload = await cloudinary.uploader.upload(image, {
      folder: "vision/",
      height: 1000,
      crop: "fit"
    });
    return upload;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { uploadImg };
