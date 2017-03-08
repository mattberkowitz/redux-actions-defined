import { actionExists, validateActionPayload } from './aciton-store';

export default function actionSchemaMiddleware() {
  return store => next => action => {
    if (!actionExists(action.type)) {
      console.error(`Action ${action.type} has not been registerd`);
    } else if (!validateActionPayload(action.type, action.payload)) {
      console.error(`Action ${action.type} has an invalid payload`);
    }
    return next(action);
  };
}
