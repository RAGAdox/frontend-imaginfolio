import axios from "../../../Axios";
// TODO :- GENERALIZE NETWORK ERRORS AND GENERAL ERRORS AND THROW THE SAME SO THAT THUNK IS REJECTED

export const authenticationApi = (username: string, password: string) => {
  return axios
    .post("auth/login", { username, password })
    .then((res) => res.data);
};

export const getProfileApi = (username: string, token: string) => {
  return axios
    .get(`profile/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return { user: res.data, token };
    });
  //.catch((err) => err?.response?.data||{success:false,message:err.message});
};
