import { userConstants } from "../util";

const initialState = {
  payment: []
};
export function payment(state = initialState, action) {
  switch (action.type) {
    case userConstants.PAYMENT_SUCCESS:
      return {
        payment: action.payload
      };
    default:
      return state;
  }
}
