import { addAction, actionExists, validateActionPayload, getCreatorForAction } from './action-store'

export function createAction(type, schema) {
  if (!actionExists(type)) {
    addAction(type, schema);
    return {
      type,
      schema,
      creator: getCreatorForAction(type),
    };
  }
  console.error(`An action with type "${type}" already exists`);
  return null;
}
