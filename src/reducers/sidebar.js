/* eslint-disable import/no-anonymous-default-export */
import { TOGGLE_SIDEBAR } from "../actions/types";

const initialState = { opened: true };

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case TOGGLE_SIDEBAR:
      return { opened: !state.opened };

    default:
      return state;
  }
}
