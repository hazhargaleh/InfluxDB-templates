import Fastify from "fastify";
import { config } from "../config/env.js";
import { register, collectDefaultMetrics } from "prom-client";
export async function startHttpServer() {
  const fastify = Fastify();
  fastify.addHook("onRequest", async (req, reply) => {
    // We're using the same API key for HTTP; perhaps we should create a separate API key!
    if (req.headers['x-api-key'] !== process.env.INFLUX_TOKEN) {
      reply.code(401).send();
    }
  });
  collectDefaultMetrics();
  fastify.get("/health", async () => {
    return { status: "ok" };
  });
  fastify.get("/metrics", async (_, reply) => {
    reply.header("Content-Type", register.contentType);
    return register.metrics();
  });
  await fastify.listen({
    port: config.httpPort,
    host: "0.0.0.0"
  });
}
