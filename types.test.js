import { String, Number, Boolean, Array, Object, Any, unionOf } from './types';

test('String.match matches only strings', () => {
  expect(String.matches("test")).toBe(true);
  expect(String.matches(1)).toBe(false);
  expect(String.matches(true)).toBe(false);
  expect(String.matches([])).toBe(false);
  expect(String.matches({})).toBe(false);
  expect(String.matches(null)).toBe(false);
  expect(String.matches(undefined)).toBe(false);
})

test('String.optional().match matches strings, null, and undefined', () => {
  expect(String.optional().matches("test")).toBe(true);
  expect(String.optional().matches(1)).toBe(false);
  expect(String.optional().matches(true)).toBe(false);
  expect(String.optional().matches([])).toBe(false);
  expect(String.optional().matches({})).toBe(false);
  expect(String.optional().matches(null)).toBe(true);
  expect(String.optional().matches(undefined)).toBe(true);
})

test('Number.match matches only numbers', () => {
  expect(Number.matches("test")).toBe(false);
  expect(Number.matches(1)).toBe(true);
  expect(Number.matches(true)).toBe(false);
  expect(Number.matches([])).toBe(false);
  expect(Number.matches({})).toBe(false);
  expect(Number.matches(null)).toBe(false);
  expect(Number.matches(undefined)).toBe(false);
})

test('Number.optional().match matches numbers, null, and undefined', () => {
  expect(Number.optional().matches("test")).toBe(false);
  expect(Number.optional().matches(1)).toBe(true);
  expect(Number.optional().matches(true)).toBe(false);
  expect(Number.optional().matches([])).toBe(false);
  expect(Number.optional().matches({})).toBe(false);
  expect(Number.optional().matches(null)).toBe(true);
  expect(Number.optional().matches(undefined)).toBe(true);
})

test('Boolean.match matches only strings', () => {
  expect(Boolean.matches("test")).toBe(false);
  expect(Boolean.matches(1)).toBe(false);
  expect(Boolean.matches(true)).toBe(true);
  expect(Boolean.matches([])).toBe(false);
  expect(Boolean.matches({})).toBe(false);
  expect(Boolean.matches(null)).toBe(false);
  expect(Boolean.matches(undefined)).toBe(false);
})

test('Boolean.optional().match matches booleans, null, and undefined', () => {
  expect(Boolean.optional().matches("test")).toBe(false);
  expect(Boolean.optional().matches(1)).toBe(false);
  expect(Boolean.optional().matches(true)).toBe(true);
  expect(Boolean.optional().matches([])).toBe(false);
  expect(Boolean.optional().matches({})).toBe(false);
  expect(Boolean.optional().matches(null)).toBe(true);
  expect(Boolean.optional().matches(undefined)).toBe(true);
})


test('Array.match matches only arrays', () => {
  expect(Array.matches("test")).toBe(false);
  expect(Array.matches(1)).toBe(false);
  expect(Array.matches(true)).toBe(false);
  expect(Array.matches([])).toBe(true);
  expect(Array.matches({})).toBe(false);
  expect(Array.matches(null)).toBe(false);
  expect(Array.matches(undefined)).toBe(false);
})

test('Array.optional().match matches arrays, null, and undefined', () => {
  expect(Array.optional().matches("test")).toBe(false);
  expect(Array.optional().matches(1)).toBe(false);
  expect(Array.optional().matches(true)).toBe(false);
  expect(Array.optional().matches([])).toBe(true);
  expect(Array.optional().matches({})).toBe(false);
  expect(Array.optional().matches(null)).toBe(true);
  expect(Array.optional().matches(undefined)).toBe(true);
})

test('Array.ofType().matches if the items in the array all match the type', () => {
  expect(Array.ofType(String).matches(["test"])).toBe(true);
  expect(Array.ofType(String).matches([1])).toBe(false);
  expect(Array.ofType(String).matches([false])).toBe(false);
});

test('Array.ofType().optional().matches if the items in the array all match the type also matches null or undefined', () => {
  expect(Array.ofType(String).matches(["test"])).toBe(true);
  expect(Array.ofType(String).matches([1])).toBe(false);
  expect(Array.ofType(String).matches([false])).toBe(false);
  expect(Array.ofType(String).matches(undefined)).toBe(false);
  expect(Array.ofType(String).matches(null)).toBe(false);
})

test('Object.match matches any value except null or undefined', () => {
  expect(Object.matches("test")).toBe(false);
  expect(Object.matches(1)).toBe(false);
  expect(Object.matches(true)).toBe(false);
  expect(Object.matches([])).toBe(false);
  expect(Object.matches({})).toBe(true);
  expect(Object.matches(null)).toBe(false);
  expect(Object.matches(undefined)).toBe(false);
})

test('Object.optional().match matches any value including null or undefined', () => {
  expect(Object.optional().matches("test")).toBe(false);
  expect(Object.optional().matches(1)).toBe(false);
  expect(Object.optional().matches(true)).toBe(false);
  expect(Object.optional().matches([])).toBe(false);
  expect(Object.optional().matches({})).toBe(true);
  expect(Object.optional().matches(null)).toBe(true);
  expect(Object.optional().matches(undefined)).toBe(true);
})

test('Object.withDefinition().match requires object to match property types', () => {
  const definedObject = Object.withDefinition({
    test: String,
    test2: Number.optional(),
  })
  expect(definedObject.matches({
    test: "hello",
    test2: 1,
  })).toBe(true);
  expect(definedObject.matches({
    test: "hello",
  })).toBe(true);
  expect(definedObject.matches({
    test2: 1,
  })).toBe(false);
  expect(definedObject.matches({
    test: "hello",
    test2: 1,
    test3: 'hi',
  })).toBe(false);
  expect(definedObject.matches({})).toBe(false);
})

test('Any.match matches any value except null or undefined', () => {
  expect(Any.matches("test")).toBe(true);
  expect(Any.matches(1)).toBe(true);
  expect(Any.matches(true)).toBe(true);
  expect(Any.matches([])).toBe(true);
  expect(Any.matches({})).toBe(true);
  expect(Any.matches(null)).toBe(false);
  expect(Any.matches(undefined)).toBe(false);
})

test('Any.optional().match matches any value including null or undefined', () => {
  expect(Any.optional().matches("test")).toBe(true);
  expect(Any.optional().matches(1)).toBe(true);
  expect(Any.optional().matches(true)).toBe(true);
  expect(Any.optional().matches([])).toBe(true);
  expect(Any.optional().matches({})).toBe(true);
  expect(Any.optional().matches(null)).toBe(true);
  expect(Any.optional().matches(undefined)).toBe(true);
})

test('unionOf().match matches any of the types in the union', () => {
  const stringOrNumber = unionOf(String, Number);
  expect(stringOrNumber.matches("test")).toBe(true);
  expect(stringOrNumber.matches(1)).toBe(true);
  expect(stringOrNumber.matches(true)).toBe(false);
  expect(stringOrNumber.matches([])).toBe(false);
  expect(stringOrNumber.matches({})).toBe(false);
  expect(stringOrNumber.matches(null)).toBe(false);
  expect(stringOrNumber.matches(undefined)).toBe(false);
})


test('unionOf().match matches any of the types in the union, null or undefined', () => {
  const stringOrNumber = unionOf(String, Number);
  expect(stringOrNumber.optional().matches("test")).toBe(true);
  expect(stringOrNumber.optional().matches(1)).toBe(true);
  expect(stringOrNumber.optional().matches(true)).toBe(false);
  expect(stringOrNumber.optional().matches([])).toBe(false);
  expect(stringOrNumber.optional().matches({})).toBe(false);
  expect(stringOrNumber.optional().matches(null)).toBe(true);
  expect(stringOrNumber.optional().matches(undefined)).toBe(true);
})
