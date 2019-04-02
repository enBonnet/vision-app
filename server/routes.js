const fs = require("file-system");
const pump = require("pump");

const { uploadImg } = require("./cloudy");
const { getVision } = require("./vision");

async function routes(fastify, options) {
  fastify.get("/", async (req, res) => {
    res.send({ hello: "Hola mundo!" });
  });

  fastify.post("/image", async (req, res) => {
    const mp = req.multipart(handler, function(err) {
      console.log("Upload completed");
    });

    mp.on("field", function(key, value) {
      console.log("form-data", key, value);
    });

    async function handler(field, file, filename, encoding, mimetype) {
      const fileSaved = `./src/files/${filename}`;
      pump(file, fs.createWriteStream(fileSaved));
      const response = await uploadImg(fileSaved);
      res.send(response);
    }
  });

  fastify.post("/vision", async (req, res) => {
    const vision = await getVision(req.body.url);
    var json = JSON.stringify(eval("(" + vision + ")"));
    return json;
  });
}

module.exports = routes;
