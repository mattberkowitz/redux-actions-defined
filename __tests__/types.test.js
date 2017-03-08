import * as types from '../types';

describe('defined types', () => {
  describe('String', () => {
    test('matches only strings', () => {
      expect(types.String.matches("test")).toBe(true);
      expect(types.String.matches(1)).toBe(false);
      expect(types.String.matches(true)).toBe(false);
      expect(types.String.matches([])).toBe(false);
      expect(types.String.matches({})).toBe(false);
      expect(types.String.matches(null)).toBe(false);
      expect(types.String.matches(undefined)).toBe(false);
    })

    test('optional() matches strings, null, and undefined', () => {
      expect(types.String.optional().matches("test")).toBe(true);
      expect(types.String.optional().matches(1)).toBe(false);
      expect(types.String.optional().matches(true)).toBe(false);
      expect(types.String.optional().matches([])).toBe(false);
      expect(types.String.optional().matches({})).toBe(false);
      expect(types.String.optional().matches(null)).toBe(true);
      expect(types.String.optional().matches(undefined)).toBe(true);
    })
  })

  describe('Number', () => {
    test('Number matches only numbers', () => {
      expect(types.Number.matches("test")).toBe(false);
      expect(types.Number.matches(1)).toBe(true);
      expect(types.Number.matches(true)).toBe(false);
      expect(types.Number.matches([])).toBe(false);
      expect(types.Number.matches({})).toBe(false);
      expect(types.Number.matches(null)).toBe(false);
      expect(types.Number.matches(undefined)).toBe(false);
    })

    test('optional() matches numbers, null, and undefined', () => {
      expect(types.Number.optional().matches("test")).toBe(false);
      expect(types.Number.optional().matches(1)).toBe(true);
      expect(types.Number.optional().matches(true)).toBe(false);
      expect(types.Number.optional().matches([])).toBe(false);
      expect(types.Number.optional().matches({})).toBe(false);
      expect(types.Number.optional().matches(null)).toBe(true);
      expect(types.Number.optional().matches(undefined)).toBe(true);
    })
  })

  describe('Boolean', () => {
    test('matches only strings', () => {
      expect(types.Boolean.matches("test")).toBe(false);
      expect(types.Boolean.matches(1)).toBe(false);
      expect(types.Boolean.matches(true)).toBe(true);
      expect(types.Boolean.matches([])).toBe(false);
      expect(types.Boolean.matches({})).toBe(false);
      expect(types.Boolean.matches(null)).toBe(false);
      expect(types.Boolean.matches(undefined)).toBe(false);
    })

    test('optional() matches booleans, null, and undefined', () => {
      expect(types.Boolean.optional().matches("test")).toBe(false);
      expect(types.Boolean.optional().matches(1)).toBe(false);
      expect(types.Boolean.optional().matches(true)).toBe(true);
      expect(types.Boolean.optional().matches([])).toBe(false);
      expect(types.Boolean.optional().matches({})).toBe(false);
      expect(types.Boolean.optional().matches(null)).toBe(true);
      expect(types.Boolean.optional().matches(undefined)).toBe(true);
    });
  });

  describe('Array', () => {
    test('matches only arrays', () => {
      expect(types.Array.matches("test")).toBe(false);
      expect(types.Array.matches(1)).toBe(false);
      expect(types.Array.matches(true)).toBe(false);
      expect(types.Array.matches([])).toBe(true);
      expect(types.Array.matches({})).toBe(false);
      expect(types.Array.matches(null)).toBe(false);
      expect(types.Array.matches(undefined)).toBe(false);
    })

    test('optional() matches arrays, null, and undefined', () => {
      expect(types.Array.optional().matches("test")).toBe(false);
      expect(types.Array.optional().matches(1)).toBe(false);
      expect(types.Array.optional().matches(true)).toBe(false);
      expect(types.Array.optional().matches([])).toBe(true);
      expect(types.Array.optional().matches({})).toBe(false);
      expect(types.Array.optional().matches(null)).toBe(true);
      expect(types.Array.optional().matches(undefined)).toBe(true);
    })

    describe('ofType()', () => {
      test('matches if the items in the array all match the type', () => {
        expect(types.Array.ofType(types.String).matches(["test"])).toBe(true);
        expect(types.Array.ofType(types.String).matches([1])).toBe(false);
        expect(types.Array.ofType(types.String).matches([false])).toBe(false);
      });

      test('optional() matches if the items in the array all match the type also matches null or undefined', () => {
        expect(types.Array.ofType(types.String).matches(["test"])).toBe(true);
        expect(types.Array.ofType(types.String).matches([1])).toBe(false);
        expect(types.Array.ofType(types.String).matches([false])).toBe(false);
        expect(types.Array.ofType(types.String).matches(undefined)).toBe(false);
        expect(types.Array.ofType(types.String).matches(null)).toBe(false);
      });
    });
  });

  describe('Object', () => {
    test('matches any value except null or undefined', () => {
      expect(types.Object.matches("test")).toBe(false);
      expect(types.Object.matches(1)).toBe(false);
      expect(types.Object.matches(true)).toBe(false);
      expect(types.Object.matches([])).toBe(false);
      expect(types.Object.matches({})).toBe(true);
      expect(types.Object.matches(null)).toBe(false);
      expect(types.Object.matches(undefined)).toBe(false);
    })

    test('optional() matches any value including null or undefined', () => {
      expect(types.Object.optional().matches("test")).toBe(false);
      expect(types.Object.optional().matches(1)).toBe(false);
      expect(types.Object.optional().matches(true)).toBe(false);
      expect(types.Object.optional().matches([])).toBe(false);
      expect(types.Object.optional().matches({})).toBe(true);
      expect(types.Object.optional().matches(null)).toBe(true);
      expect(types.Object.optional().matches(undefined)).toBe(true);
    });

    describe('withDefinition', () => {
      test('requires object to match property types', () => {
        const definedObject = types.Object.withDefinition({
          test: types.String,
          test2: types.Number.optional(),
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
        expect(definedObject.matches("test")).toBe(false);
        expect(definedObject.matches(1)).toBe(false);
        expect(definedObject.matches(true)).toBe(false);
        expect(definedObject.matches([])).toBe(false);
        expect(definedObject.matches({})).toBe(false);
        expect(definedObject.matches(null)).toBe(false);
        expect(definedObject.matches(undefined)).toBe(false);
      });
      test('optional() requires object to match property types or matches null and undefined', () => {
        const definedObject = types.Object.withDefinition({
          test: types.String,
          test2: types.Number.optional(),
        })
        expect(definedObject.optional().matches({
          test: "hello",
          test2: 1,
        })).toBe(true);
        expect(definedObject.optional().matches({
          test: "hello",
        })).toBe(true);
        expect(definedObject.optional().matches({
          test2: 1,
        })).toBe(false);
        expect(definedObject.optional().matches({
          test: "hello",
          test2: 1,
          test3: 'hi',
        })).toBe(false);
        expect(definedObject.optional().matches("test")).toBe(false);
        expect(definedObject.optional().matches(1)).toBe(false);
        expect(definedObject.optional().matches(true)).toBe(false);
        expect(definedObject.optional().matches([])).toBe(false);
        expect(definedObject.optional().matches({})).toBe(false);
        expect(definedObject.optional().matches(null)).toBe(true);
        expect(definedObject.optional().matches(undefined)).toBe(true);
      });
    });
  });

  describe('Any', () => {
    test('matches any value except null or undefined', () => {
      expect(types.Any.matches("test")).toBe(true);
      expect(types.Any.matches(1)).toBe(true);
      expect(types.Any.matches(true)).toBe(true);
      expect(types.Any.matches([])).toBe(true);
      expect(types.Any.matches({})).toBe(true);
      expect(types.Any.matches(null)).toBe(false);
      expect(types.Any.matches(undefined)).toBe(false);
    })

    test('optional() matches any value including null or undefined', () => {
      expect(types.Any.optional().matches("test")).toBe(true);
      expect(types.Any.optional().matches(1)).toBe(true);
      expect(types.Any.optional().matches(true)).toBe(true);
      expect(types.Any.optional().matches([])).toBe(true);
      expect(types.Any.optional().matches({})).toBe(true);
      expect(types.Any.optional().matches(null)).toBe(true);
      expect(types.Any.optional().matches(undefined)).toBe(true);
    })
  });

  describe('unionOf', () => {
    test('matches any of the types in the union', () => {
      const stringOrNumber = types.unionOf(types.String, types.Number);
      expect(stringOrNumber.matches("test")).toBe(true);
      expect(stringOrNumber.matches(1)).toBe(true);
      expect(stringOrNumber.matches(true)).toBe(false);
      expect(stringOrNumber.matches([])).toBe(false);
      expect(stringOrNumber.matches({})).toBe(false);
      expect(stringOrNumber.matches(null)).toBe(false);
      expect(stringOrNumber.matches(undefined)).toBe(false);
    })


    test('matches any of the types in the union, null or undefined', () => {
      const stringOrNumber = types.unionOf(types.String, types.Number);
      expect(stringOrNumber.optional().matches("test")).toBe(true);
      expect(stringOrNumber.optional().matches(1)).toBe(true);
      expect(stringOrNumber.optional().matches(true)).toBe(false);
      expect(stringOrNumber.optional().matches([])).toBe(false);
      expect(stringOrNumber.optional().matches({})).toBe(false);
      expect(stringOrNumber.optional().matches(null)).toBe(true);
      expect(stringOrNumber.optional().matches(undefined)).toBe(true);
    })
  });
});

describe('type coersion', () => {
  describe('Native types', () => {
    test('native String is coerced to defined String', () => {
      expect(types.coerce(String)).toBe(types.String);
    });
    test('native Number is coerced to defined Number', () => {
      expect(types.coerce(Number)).toBe(types.Number);
    });
    test('native Boolean is coerced to defined Boolean', () => {
      expect(types.coerce(Boolean)).toBe(types.Boolean);
    });
    test('native Array is coerced to defined array (no type)', () => {
      expect(types.coerce(Array)).toBe(types.Array);
    });
    test('native Object is coerced ot defined object (no type)', () => {
      expect(types.coerce(Object)).toBe(types.Object);
    })
  });
  describe('Literals', () => {
    test('Array literal ([]) is coerced to defined array (no type)', () => {
      expect(types.coerce([])).toBe(types.Array);
    })
    test('Array literal with type ([String] / [types.String]) is coerced to an array of that type', () => {
      const nativeStringArray = types.coerce([String]);
      const definedStringArray = types.coerce([types.Number]);
      expect(nativeStringArray.prototype instanceof types.Array).toBe(true);
      expect(nativeStringArray.type).toBe(types.String);
      expect(definedStringArray.prototype instanceof types.Array).toBe(true);
      expect(definedStringArray.type).toBe(types.Number);
    });
    test('Array literal with multiple types is coerced to array with a type that is a union of all types listed also coerced', () => {
      const unionArray = types.coerce([String, types.Number]);
      expect(unionArray.prototype instanceof types.Array).toBe(true);
      expect(unionArray.type.prototype instanceof types.Union).toBe(true);
      expect(unionArray.type.types).toEqual(expect.arrayContaining([types.String, types.Number]))
    })
    test('Object literal ({}) is coerced to defined object (no type)', () => {
      expect(types.coerce({})).toBe(types.Object);
    })
    test('Object literal with props ({foo:String}) is coerced to a defined object with its properties also coerced', () => {
      const coercedObject = types.coerce({
        foo: String,
        bar: [types.Number, Object],
        baz: {
          test1: String,
          test2: types.Boolean,
        }
      })
      expect(coercedObject.prototype instanceof types.Object);
      expect(coercedObject.properties.foo).toBe(types.String);
      expect(coercedObject.properties.bar.prototype instanceof types.Array).toBe(true);
      expect(coercedObject.properties.bar.type.prototype instanceof types.Union).toBe(true);
      expect(coercedObject.properties.bar.type.types).toEqual(expect.arrayContaining([types.Number, types.Object]))
      expect(coercedObject.properties.baz.prototype instanceof types.Object).toBe(true);
      expect(coercedObject.properties.baz.properties.test1).toBe(types.String);
      expect(coercedObject.properties.baz.properties.test2).toBe(types.Boolean);
    });
  })
})
