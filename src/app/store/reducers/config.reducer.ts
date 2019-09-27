import * as ConfigActions from '../actions/config.actions';
import { Config } from '../models/config.model';

export type Action = ConfigActions.All;

// Default APP State
const defaultAppState: Config = {
  showAdvancedMode: false
};

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};


// reducer function
export function postReducer(state: Config = defaultAppState, action: Action) {
  console.log(action.type, state);

  switch (action.type) {
    case ConfigActions.ADVANCED_MODE:
      return newState(state, { showAdvancedMode: true});
    case ConfigActions.BASIC_MODE:
        return newState(state, { showAdvancedMode: false});
    default:
      return state;
  }
}
