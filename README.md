# Ruuvi IoT Ingestion Service
This is a Node.js/TypeScript backend service that collects data from Ruuvi Bluetooth sensors via MQTT and stores it in InfluxDB. It decodes BLE packets, buffers messages, and writes them in batches to InfluxDB.

---
## ⚡ Features
- Connects to Ruuvi gateways via MQTT
- Validates MQTT messages using `zod`
- Decodes Ruuvi BLE packets with [`advlib-ble-manufacturers`](https://github.com/reelyactive/advlib-ble-manufacturers)
- Buffers messages and performs batch writes to InfluxDB
- Supports multiple gateways and tags
- Logging via `pino`
- Configurable via `.env`
---
## 📦 Prerequisites
- Node.js >= 20
- npm >= 9
- InfluxDB 2.x
- One or more Ruuvi Gateways with MQTT support
---
## 🛠 Installation
1. Clone the project and install dependencies :
```bash
git clone https://github.com/hazhargaleh/ruuvi-iot-ingestion.git
cd ruuvi-iot-ingestion
npm install
```
2. Create a `.env` file using the command below, which will copy the `.env.example` file. Change the values of the variables in the `.env` file
```bash
cp .env.example .env
```
## 🚀 Development
Run the service in development mode with automatic reload:
```bash
npm run dev
```
## 🏗 Build and Run
Compile the TypeScript and start the service
```
npm run build
npm start
```
## 🔧 Project Structure
```
├── dist # Compiled TypeScript -> JavaScript
├── schema
│   └── ruuvi_mqtt_data_with_timestamps.schema.json # MQTT: Time-stamped data from Bluetooth-sensors
├── src
  ├── config # Environment variables
  ├── http # Http sevice for API
  ├── influx # InfluxDB service
  ├── logger # Logging with pino
  ├── mqtt
  ├── pipeline
  ├── ruuvi # BLE decoding and models
  └── types
  ├── index.ts # Entry point

```
## 📝 Logging
- Logs are generated with pino
- Key events such as MQTT message reception and decode errors are logged
- Invalid messages or incomplete BLE packets are filtered and logged as WARN
- In production, logs can be redirected to files or centralized logging services

## ⚙️ Configuration
- `BUFFER_SIZE`: Number of messages to buffer before batch writing to InfluxDB 
- `FLUSH_INTERVAL`: Interval (ms) for automatic flush
- `COMPANY_CODE`: Manufacturer code (default `0x0499` for Ruuvi)
- `MQTT_TOPIC`: MQTT topic to subscribe to (e.g., `ruuvi/#`)
- `INFLUX_*`: Connection parameters for InfluxDB 2.x

## 🔍 Debugging
- Check logs to verify that MQTT messages are received and decoded correctly
- Incomplete BLE packets or invalid messages are logged as warnings

## 💡 Optimizations
- Increase `BUFFER_SIZE` to reduce InfluxDB write operations
- Adjust `FLUSH_INTERVAL` based on message volume
- Use a local `MQTT` broker to reduce latency
- Enable compression and retention policies in InfluxDB to store more data efficiently

## 📄 License
MIT License – open source project

## Author
[Hazhar Galeh](https://github.com/hazhargaleh)