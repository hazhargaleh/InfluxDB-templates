import { describe, it, expect } from 'vitest';
import { GatewayConfigurationSchema } from '../ruuvi/gatewayConfigurationSchema.js';

const minimalConfig = {
  remote_cfg_use: true,
  remote_cfg_url: 'https://example.com/ruuvi-gw-cfg',
  remote_cfg_auth_type: 'basic',
  remote_cfg_refresh_interval_minutes: 60,
  use_mqtt: true,
  mqtt_transport: 'SSL',
  mqtt_server: 'mqtt.example.com',
  mqtt_port: 8883,
};

describe('GatewayConfigurationSchema', () => {
  it('should accept a minimal valid config', () => {
    const result = GatewayConfigurationSchema.safeParse(minimalConfig);
    expect(result.success).toBe(true);
  });

  it('should accept an empty object (all fields optional)', () => {
    const result = GatewayConfigurationSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid mqtt_transport value', () => {
    const result = GatewayConfigurationSchema.safeParse({ ...minimalConfig, mqtt_transport: 'INVALID' });
    expect(result.success).toBe(false);
  });

  it('should reject invalid mqtt_data_format value', () => {
    const result = GatewayConfigurationSchema.safeParse({ ...minimalConfig, mqtt_data_format: 'bad_format' });
    expect(result.success).toBe(false);
  });

  it('should reject invalid remote_cfg_auth_type', () => {
    const result = GatewayConfigurationSchema.safeParse({ ...minimalConfig, remote_cfg_auth_type: 'oauth' });
    expect(result.success).toBe(false);
  });

  it('should reject invalid lan_auth_type', () => {
    const result = GatewayConfigurationSchema.safeParse({ ...minimalConfig, lan_auth_type: 'lan_auth_invalid' });
    expect(result.success).toBe(false);
  });

  it('should accept all valid mqtt_transport values', () => {
    for (const transport of ['TCP', 'SSL', 'WS', 'WSS']) {
      const result = GatewayConfigurationSchema.safeParse({ mqtt_transport: transport });
      expect(result.success, `transport ${transport} should be valid`).toBe(true);
    }
  });

  it('should accept all valid mqtt_data_format values', () => {
    for (const fmt of ['ruuvi_raw', 'ruuvi_raw_and_decoded', 'ruuvi_decoded']) {
      const result = GatewayConfigurationSchema.safeParse({ mqtt_data_format: fmt });
      expect(result.success, `format ${fmt} should be valid`).toBe(true);
    }
  });

  it('should apply default values for optional fields', () => {
    const result = GatewayConfigurationSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.mqtt_port).toBe(1883);
      expect(result.data.mqtt_transport).toBe('TCP');
      expect(result.data.use_mqtt).toBe(false);
      expect(result.data.eth_dhcp).toBe(true);
      expect(result.data.ntp_server1).toBe('time.google.com');
    }
  });

  it('should passthrough unknown fields', () => {
    const result = GatewayConfigurationSchema.safeParse({ unknown_field: 'value' });
    expect(result.success).toBe(true);
  });

  it('should accept a full real-world config', () => {
    const full = {
      use_eth: true,
      eth_dhcp: true,
      use_mqtt: true,
      mqtt_transport: 'SSL',
      mqtt_data_format: 'ruuvi_raw_and_decoded',
      mqtt_server: 'example.com',
      mqtt_port: 8883,
      mqtt_use_ssl_client_cert: true,
      mqtt_use_ssl_server_cert: true,
      remote_cfg_use: true,
      remote_cfg_url: 'https://example.com/ruuvi-gw-cfg',
      remote_cfg_auth_type: 'basic',
      remote_cfg_auth_basic_user: 'username',
      remote_cfg_auth_basic_pass: 'secret',
      remote_cfg_refresh_interval_minutes: 60,
      scan_filter_allow_listed: true,
      scan_filter_list: ['C5:7D:66:B1:0C:36', 'CE:52:DE:73:84:F2'],
      company_id: 1177,
      ntp_server1: 'time.google.com',
      lan_auth_type: 'lan_auth_ruuvi',
    };
    const result = GatewayConfigurationSchema.safeParse(full);
    expect(result.success).toBe(true);
  });
});
