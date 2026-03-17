CREATE DATABASE IF NOT EXISTS ruuvi
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ruuvi;

-- Main table of measurements
CREATE TABLE IF NOT EXISTS measurements (
                                            id                        BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    -- Timestamp (millisecond precision)
                                            ts                        DATETIME(3) NOT NULL,
    -- Identification
    device_id                 VARCHAR(17)  NOT NULL COMMENT 'MAC address of tag',
    device_name               VARCHAR(100) NOT NULL,
    gateway_id                VARCHAR(17)  NOT NULL COMMENT 'MAC address of gateway',
    gateway_name              VARCHAR(100) NOT NULL,
    -- Signal
    rssi                      SMALLINT,
    -- Raw measurements
    temperature               DECIMAL(7,4),
    humidity                  DECIMAL(7,4),
    pressure                  INT UNSIGNED  COMMENT 'Pa',
    acceleration_x            DECIMAL(7,4),
    acceleration_y            DECIMAL(7,4),
    acceleration_z            DECIMAL(7,4),
    battery_voltage           DECIMAL(5,3),
    tx_power                  TINYINT,
    movement_counter          SMALLINT UNSIGNED,
    measurement_sequence_number MEDIUMINT UNSIGNED,
    data_format               TINYINT UNSIGNED,
    -- Derived fields
    absolute_humidity         DECIMAL(8,4)  COMMENT 'g/m³',
    equilibrium_vapor_pressure DECIMAL(10,4) COMMENT 'Pa',
    air_density               DECIMAL(8,6)  COMMENT 'kg/m³',
    dew_point                 DECIMAL(7,4)  COMMENT '°C',
    frost_point               DECIMAL(7,4)  COMMENT '°C',
    vapor_pressure_deficit    DECIMAL(8,5)  COMMENT 'kPa',
    acceleration_total        DECIMAL(7,4),
    acceleration_angle_x      DECIMAL(7,4)  COMMENT 'degrees',
    acceleration_angle_y      DECIMAL(7,4)  COMMENT 'degrees',
    acceleration_angle_z      DECIMAL(7,4)  COMMENT 'degrees',
    battery_percentage        DECIMAL(5,2)  COMMENT '%',

    -- Index of frequently asked questions
    INDEX idx_ts              (ts),
    INDEX idx_device          (device_id, ts),
    INDEX idx_device_name     (device_name, ts),
    INDEX idx_gateway_name    (gateway_name, ts)
    ) ENGINE=InnoDB
    ROW_FORMAT=COMPRESSED
    COMMENT='RuuviTag raw and derived metrics';

-- Practical view: last measurement per device
CREATE OR REPLACE VIEW latest_measurements AS
SELECT m.*
FROM measurements m
         INNER JOIN (
    SELECT device_id, MAX(ts) AS max_ts
    FROM measurements
    GROUP BY device_id
) latest ON m.device_id = latest.device_id AND m.ts = latest.max_ts;