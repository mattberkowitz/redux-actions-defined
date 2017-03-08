export function createReducer(actionFunctions, initialState) {
  return function(state = initialState, action) {
    if(actionFunctions.hasOwnProperty(action.type)) {
      return actionFunctions[key](state, action);
    }
    return state;
  }
}
