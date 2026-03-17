import { z } from 'zod';

export default z.object({
  // Identification
  gw_mac: z
    .string()
    .regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/)
    .optional(),
  id: z.string().optional(),
  // Timestamps
  gwts: z.coerce.number().optional(),
  ts: z.coerce.number().optional(),
  // Signal
  rssi: z.number().optional(),
  // Raw BLE (retained for compatibility, but optional)
  data: z.string().optional(),
  aoa: z.array(z.any()).default([]),
  coords: z.string().optional(),
  // Measurements decoded directly by the gateway
  temperature: z.number().optional(),
  humidity: z.number().optional(),
  pressure: z.number().optional(),
  accelX: z.number().optional(),
  accelY: z.number().optional(),
  accelZ: z.number().optional(),
  voltage: z.number().optional(),
  txPower: z.number().optional(),
  movementCounter: z.number().optional(),
  measurementSequenceNumber: z.number().optional(),
  dataFormat: z.number().optional(),
});
