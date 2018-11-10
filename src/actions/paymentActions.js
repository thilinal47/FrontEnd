import { userConstants } from "../util";

export const createPayment = paymentData => dispatch => {
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(paymentData)
  };

  fetch("http://localhost:8080/payment", requestOptions)
    .then(res => res.json())
    .then(payment => {
      dispatch({
        type: userConstants.PAYMENT_SUCCESS,
        payload: payment
      });
    });
};
