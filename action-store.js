import * as types from './types'

// look at redoing some of this
// maybe export a static class rather than a bunch of functions

const actionSchemaStore = {};

export function getActionSchema(type) {
  if (!actionExists(type)) {
    return undefined;
  }
  return actionSchemaStore[type].coerced;
}

export function getRawActionSchema(type) {
  if (!actionExists(type)) {
    return undefined;
  }
  return actionSchemaStore[type].raw;
}

export function getActions() {
  return Object.keys(actionSchemaStore);
}

export function actionExists(type) {
  return !!actionSchemaStore[type];
}

export function addAction(type, schema) {
  actionSchemaStore[type] = {
    raw: schema,
    coerced: types.coerce(schema)
  };
}

export function removeAction(type) {
  Reflect.deleteProperty(actionSchemaStore, type);
}

export function clearActions() {
  Object.keys(actionSchemaStore).forEach(removeAction);
}

export function validateActionPayload(type, payload) {
  if (!actionExists(type)) {
    return false;
  }

  return getActionSchema(type).matches(payload);
}

export function getCreatorForAction(type) {
  function actionCreator(payload) {
    if (!validateActionPayload(type, payload)) {
      console.error(`The provided payload does not match the schema for "${type}"`)
    }
    return {
      type,
      payload,
    };
  }

  actionCreator.newCreator = function generatorCreator(creatorFn) {
    return function(...args) {
      cosnt payload = creatorFn(...args)
      if (!validateActionPayload(type, payload)) {
        console.error(`The provided payload does not match the schema for "${type}"`)
      }
      return {
        type,
        payload
      }
    }
  }

  return actionCreator;
}
