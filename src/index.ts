import { startHttpServer } from "./http/healthServer.js";
import { startMqtt } from "./mqtt/mqttService.js";
import { logger } from "./logger/logger.js";
import { config } from "./config/env.js";
async function main() {
  await startHttpServer();
  logger.info(
    {
      gateways: config.gatewayNames,
      tags: config.tagNames,
    },
    'Loaded MAC name mappings',
  );
  startMqtt();
  logger.info("Ruuvi ingestion service started");
}
main();
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
async function shutdown() {
  logger.info("Shutting down service...");
  process.exit(0);
}