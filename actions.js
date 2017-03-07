import * as types from './types'
const actionSchemaStore = {};

export function getActionSchema(type) {
  return actionSchemaStore[type];
}

export function clearActions() {
  Object.keys(actionSchemaStore).forEach((key) => {
    Reflect.deleteProperty(actionSchemaStore, key)
  });
}

export function validatePayload(type, payload) {
  if (!actionSchemaStore[type]) {
    return false;
  }

  const definedObject = types.Object.withDefinition(actionSchemaStore[type]);

  return definedObject.matches(payload);
}

export function createAction(type, schema) {
  if (!!actionSchemaStore[type]) {
    console.error(`An action with type "${type}" already exists`);
    return null;
  }
  actionSchemaStore[type] = schema;
  return {
    type,
    schema,
    creator(payload) {
      validatePayload(type, payload);
      return {
        type,
        payload,
      };
    },
  };
}

export function middleware() {
  return store => next => action => {
    if (!actionSchemaStore[action.type]) {
      console.error(`Action ${action.type} has not been registerd`);
    } else if (!this.validatePayload(action.type, action.payload)) {
      console.error(`Action ${action.type} has an invalid payload`);
    }
    return next(action);
  };
}
