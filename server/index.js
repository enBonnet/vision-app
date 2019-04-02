const fastify = require("fastify")();
require("custom-env").env();

fastify.register(require("fastify-cors"), { origin: true });
fastify.register(require("fastify-multipart"));
fastify.register(require("./routes"));

fastify.listen(process.env.SERVER_PORT, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
