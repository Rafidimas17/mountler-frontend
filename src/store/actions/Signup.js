import { SIGNUP} from "../types";
import axios from "../../configs/axios";


export const signup = (payload) => (dispatch) => {
  dispatch({
    type: SIGNUP,
    payload: payload,
  });
};

export const submitSignup = (payload) => () => {
  return axios.post('/signup', payload).then((response)=>{
    console.log(response)
  });
};
