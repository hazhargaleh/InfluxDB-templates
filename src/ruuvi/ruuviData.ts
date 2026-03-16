export class RuuviData {
  temperature?: number;
  humidity?: number;
  pressure?: number;

  accelerationX?: number;
  accelerationY?: number;
  accelerationZ?: number;

  batteryVoltage?: number;
  txPower?: number;
  movementCounter?: number;
  measurementSequenceNumber?: number;
  dataFormat?: number;
  constructor(
    public coordinates: string,
    public deviceId: string,
    public gatewayId: string,
    public providerId: string,
    public rawData: string,
    public rssi: number | undefined,
    public timestamp: number
  ) {}
}