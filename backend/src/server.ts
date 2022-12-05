import fastify from "fastify";

const server = fastify({
  maxParamLength: 5000,
});

async function main() {
  try {
    await server.listen({ host: "0.0.0.0", port: 3000 });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

main();
