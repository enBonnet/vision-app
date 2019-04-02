let request = require("request");

const subscriptionKey = process.env.VISION_KEY;
const uriBase =
  "https://brazilsouth.api.cognitive.microsoft.com/vision/v2.0/analyze?visualFeatures=Categories";

function doRequest(imageUrl) {
  const params = {
    visualFeatures:
      "Categories,Description,Color,Adult,Brands,Faces,ImageType,Objects,Tags",
    details: "",
    language: "en"
  };

  const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": subscriptionKey
    }
  };

  return new Promise(function(resolve, reject) {
    request.post(options, function(error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

async function getVision(imageUrl) {
  let res = await doRequest(imageUrl);
  return res;
}

module.exports = { getVision };
