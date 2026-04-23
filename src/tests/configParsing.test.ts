import { describe, it, expect } from 'vitest';

// Helper to test parseMacMap and toBoolean in isolation
// We re-implement them here to avoid loading the whole env module
function parseMacMap(envVar: string | undefined): Record<string, string> {
  if (!envVar) return {};
  try {
    const parsed = JSON.parse(envVar);
    if (typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return parsed as Record<string, string>;
  } catch {
    return {};
  }
}

function toBoolean(value: string | undefined, defaultValue = false): boolean {
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true';
}

describe('parseMacMap', () => {
  it('should return empty object for undefined input', () => {
    expect(parseMacMap(undefined)).toEqual({});
  });

  it('should return empty object for empty string', () => {
    expect(parseMacMap('')).toEqual({});
  });

  it('should parse valid JSON MAC map', () => {
    const result = parseMacMap('{"F3:2D:EF:E7:2E:78":"Station 1"}');
    expect(result).toEqual({ 'F3:2D:EF:E7:2E:78': 'Station 1' });
  });

  it('should parse multiple entries', () => {
    const result = parseMacMap('{"AA:BB:CC:DD:EE:FF":"Fridge 1","11:22:33:44:55:66":"Freezer"}');
    expect(result['AA:BB:CC:DD:EE:FF']).toBe('Fridge 1');
    expect(result['11:22:33:44:55:66']).toBe('Freezer');
  });

  it('should return empty object for invalid JSON', () => {
    expect(parseMacMap('not-json')).toEqual({});
  });

  it('should return empty object for JSON array', () => {
    expect(parseMacMap('["not","an","object"]')).toEqual({});
  });

  it('should return empty object for JSON primitive', () => {
    expect(parseMacMap('"string"')).toEqual({});
  });
});

describe('toBoolean', () => {
  it('should return true for "true"', () => {
    expect(toBoolean('true')).toBe(true);
  });

  it('should return true for "TRUE" (case insensitive)', () => {
    expect(toBoolean('TRUE')).toBe(true);
  });

  it('should return false for "false"', () => {
    expect(toBoolean('false')).toBe(false);
  });

  it('should return false for any non-true string', () => {
    expect(toBoolean('yes')).toBe(false);
    expect(toBoolean('1')).toBe(false);
    expect(toBoolean('on')).toBe(false);
  });

  it('should return defaultValue when undefined', () => {
    expect(toBoolean(undefined)).toBe(false);
    expect(toBoolean(undefined, true)).toBe(true);
  });
});
