import { z } from "zod"
// Generate by npx json-schema-to-zod -i schema/ruuvi_mqtt_data_with_timestamps.schema.json -o src/ruuvi/ruuvi_mqtt_data_with_timestamps.schema.ts
export default z.object({ "gw_mac": z.string().regex(new RegExp("^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$")).optional(), "rssi": z.number().int().optional(), "aoa": z.array(z.any()).default([]), "gwts": z.coerce.number().optional(), "ts": z.coerce.number().optional(), "data": z.string(), "coords": z.string().optional() })
