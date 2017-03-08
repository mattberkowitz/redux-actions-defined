export const nativeTypeMap = new Map()

export function coerce(type) {
  if (typeof type.matches === 'function') {
    return type;
  }
  let derivedType = nativeTypeMap.get(type);
  if (!derivedType) {
    if (Array.isArray(type)) {
      derivedType = ArrayType;
      if (type.length === 1) {
        derivedType = derivedType.ofType(type[0]);
      } else if (type.length > 1) {
        derivedType = derivedType.ofType(unionOf(...type));
      }
    } else if (type.constructor === Object) {
      derivedType = ObjectType;
      const keys = Object.keys(type);
      if (keys.length) {
        derivedType = derivedType.withDefinition(type);
      }
    } else {
      derivedType = class ExtendedObjectType extends type {
        matches(val) {
          return val instanceof type;
        }
      };
    }
  }
  return derivedType;
}

export function matches(type, val) {
  return type.matches(val);
}

export class BaseType {
  static matches(val) {
    console.error(`A matches function needs to be defined for "${this.name}"`);
    return false;
  }

  static optional() {
    return class OptionalType extends this {
      static matches(val) {
        return super.matches(val) || val === undefined || val === null;
      }
    }
  }
}

class StringType extends BaseType {
  static matches(val) {
    return typeof val === 'string';
  }
}

nativeTypeMap.set(String, StringType);

class NumberType extends BaseType {
  static matches(val) {
    return typeof val === 'number';
  }
}

nativeTypeMap.set(Number, NumberType);

class BooleanType extends BaseType {
  static matches(val) {
    return typeof val === 'boolean';
  }
}

nativeTypeMap.set(Boolean, BooleanType);

class ArrayType extends BaseType {
  static matches(val) {
    return Array.isArray(val);
  }

  static ofType(memberType) {
    const coercedType = coerce(memberType)
    return class ArrayOfType extends this {
      static get type() {
        return coercedType;
      }
      static matches(val) {
        return super.matches(val) && val.every((itemVal) => this.type.matches(itemVal));
      }
    }
  }
}

nativeTypeMap.set(Array, ArrayType);

class ObjectType extends BaseType {
  static matches(val) {
    return typeof val === 'object' && !Array.isArray(val) && val !== null;
  }

  static withDefinition(definition) {
    const coercedDefinition = Object.keys(definition).reduce((o, key) => {
      o[key] = coerce(definition[key]);
      return o;
    }, {})
    return class ObjectWithDefinition extends this {
      static get properties() {
        return coercedDefinition;
      }

      static matches(val) {
        return super.matches(val)
          && Object.keys(definition).every((key) => this.properties[key].matches(val[key]))
          && Object.keys(val).every(key => !!this.properties[key]);
      }
    }
  }
}

nativeTypeMap.set(Object, ObjectType);

class AnyType extends BaseType {
  static matches(val) {
    return val !== undefined && val !== null;
  }
}

export class UnionType extends BaseType {
  static get types() {
    console.error('This type is meant to be extended with an overrided static types property. It\'s suggested to use unionOf() to generate a new union')
    return [];
  }
  static matches(val) {
    return this.types.some((type) => type.matches(val));
  }
}

export function unionOf(...unionTypes) {
  const coercedTypes = unionTypes.map(coerce);
  return class DefinedUnionType extends UnionType {
    static get types() {
      return coercedTypes;
    }
  }
}

export {
  StringType as String,
  NumberType as Number,
  BooleanType as Boolean,
  ObjectType as Object,
  ArrayType as Array,
  AnyType as Any,
  UnionType as Union,
};
