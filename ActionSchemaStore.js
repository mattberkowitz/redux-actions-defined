const actionSchemaStore = {};

import { OneOf } from './types';

export default class ActionSchemaStore {
  static addAction(type, schema) {
    if (actionSchemaStore[type]) {
      console.error(`An action already exists for type ${type}`);
    }
    actionSchemaStore[type] = schema;
  }

  static validatePayload(type, payload) {
    if (!actionSchemaStore[type]) {
      // console.error(`There is no action in the store matching ${type}`);
      return false;
    }

    return Object.keys(actionSchemaStore[type]).every((key) => {
      const schemaType = actionSchemaStore[type][key];
      const payloadVal = payload[key];

      function testVal(val, type) {
        return val instanceof type ||
          val === undefined && type.isOptional
      }

      if (schemaType instanceof OneOf) {
        return schemaType.types.some((t) => testVal(payloadVal, t));
      } else {
        return testVal(payloadVal, schemaType);
      }
    });
  }

  static middleware() {
    return store => next => action => {
      if (!actionSchemaStore[action.type]) {
        console.error(`Action ${action.type} has not been registerd`);
      } else if (!this.validatePayload(action.type, action.payload)) {
        console.error(`Action ${action.type} has an invalid payload`);
      }
      return next(action);
    };
  }
}
