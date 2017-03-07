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

export class String extends BaseType {
  static matches(val) {
    return typeof val === 'string';
  }
}

export class Number extends BaseType {
  static matches(val) {
    return typeof val === 'number';
  }
}

export class Boolean extends BaseType {
  static matches(val) {
    return typeof val === 'boolean';
  }
}

export class Array extends BaseType {
  static matches(val) {
    return [].constructor.isArray(val);
  }

  static ofType(memberType) {
    return class ArrayOfType extends this {
      static matches(val) {
        return super.matches(val) && val.every((itemVal) => memberType.matches(itemVal));
      }
    }
  }
}

class ObjectType extends BaseType {
  static matches(val) {
    return typeof val === 'object' && ![].constructor.isArray(val) && val !== null;
  }

  static withDefinition(definition) {
    return class ObjectWithDefinition extends this {
      static matches(val) {
        return super.matches(val)
          && Object.keys(definition).every((key) => definition[key].matches(val[key]))
          && Object.keys(val).every(key => !!definition[key]);
      }
    }
  }
}

// `export Object extends BaseType {}` was breaking when run through babel so do this instead
export { ObjectType as Object };

export class Any extends BaseType {
  static matches(val) {
    return val !== undefined && val !== null;
  }
}

export function unionOf(...unionTypes) {
  return class UnionType extends BaseType {
    static matches(val) {
      return unionTypes.some((type) => type.matches(val));
    }
  }
}
