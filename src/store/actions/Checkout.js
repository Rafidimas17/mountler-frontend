import { CHECKOUT_BOOKING } from "../types";
import axios from "../../configs/axios";

export const checkoutBooking = (payload) => (dispatch) => {
  dispatch({
    type: CHECKOUT_BOOKING,
    payload: payload,
  });
};
const token = "iO3quoYg265hlzq30E8RelQc0LOKle4R0yk6CMbgeHgGNcm_mR";
export const submitBooking = (payload) => () => {
  return axios.post(`/booking-page`, payload, {
    headers: {
      contentType: "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
