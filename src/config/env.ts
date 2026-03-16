import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
export const config = {
  mqtt: {
    protocol: process.env.MQTT_PROTOCOL ?? 'mqtt',
    host: process.env.MQTT_HOST ?? 'localhost',
    port: Number(process.env.MQTT_PORT ?? 1883),
    topic: process.env.MQTT_TOPIC ?? 'ruuvi/#',
    username: process.env.MQTT_USERNAME || undefined,
    password: process.env.MQTT_PASSWORD || undefined,
    ca: process.env.MQTT_CA ? fs.readFileSync(process.env.MQTT_CA) : undefined,
    cert: process.env.MQTT_CERT ? fs.readFileSync(process.env.MQTT_CERT) : undefined,
    key: process.env.MQTT_KEY ? fs.readFileSync(process.env.MQTT_KEY) : undefined,
    rejectUnauthorized: process.env.MQTT_REJECT_UNAUTHORIZED === 'true',
  },
  influx: {
    url: process.env.INFLUX_URL!,
    org: process.env.INFLUX_ORG!,
    bucket: process.env.INFLUX_BUCKET!,
    token: process.env.INFLUX_TOKEN!,
  },
  bufferSize: Number(process.env.BUFFER_SIZE ?? 500),
  flushInterval: Number(process.env.FLUSH_INTERVAL ?? 5000),
  httpPort: Number(process.env.HTTP_PORT ?? 3002),
  companyCode: Number(process.env.COMPANY_CODE ?? 1177), // Ruuvi as default Manufacturer
};