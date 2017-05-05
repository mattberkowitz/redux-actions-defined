export function createReducer(actionFunctions, initialState) {
  return function generatedReducer(state = initialState, action) {
    if (actionFunctions.hasOwnProperty(action.type)) {
      return actionFunctions[action.type](state, action.payload);
    }
    return state;
  };
}
