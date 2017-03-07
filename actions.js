export function createAction() {
  ActionSchemaStore.addAction(type, schema);
  return {
    type,
    schema,
    creator(payload) {
      ActionSchemaStore.validatePayload(type, payload);
      return {
        type,
        payload,
      };
    },
  };
}
