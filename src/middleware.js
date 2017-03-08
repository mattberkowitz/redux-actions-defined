import { actionExists, validateActionPayload } from './action-store';

export default function reduxActionsDefinedMiddleware() {
  return store => next => action => {
    if (!actionExists(action.type)) {
      console.error(`Action ${action.type} has not been registerd`);
    } else if (!validateActionPayload(action.type, action.payload)) {
      console.error(`Action ${action.type} has an invalid payload`);
    }
    return next(action);
  };
}
