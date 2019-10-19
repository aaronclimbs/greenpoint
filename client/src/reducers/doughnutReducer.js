import { EVENT_LIST_LOADED } from "../actions/types";

const initialState = {
  events: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EVENT_LIST_LOADED:
      return {
        ...state,
        events: action.payload
      };

    default:
      return {
        ...state
      };
  }
}
