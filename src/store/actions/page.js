import { FETCH_PAGE } from "../types";
import axios from "../../configs/axios";

const token = "iO3quoYg265hlzq30E8RelQc0LOKle4R0yk6CMbgeHgGNcm_mR";
export const fetchPage = (url, page) => (dispatch) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axios
    .get(url, { headers })
    .then((response) => {
      // console.log(response.data.message);
      dispatch({
        type: FETCH_PAGE,
        payload: {
          [page]: response.data,
        },
      });
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status === 500) {
        return error.response.data.message;
      } else {
        return error.response.data.message;
        // console.error(error);
      }
    });
};
