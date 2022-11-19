import axios from "../../../Axios";
export const getFeedApi = (
  username: string,
  pageSize: number,
  pageNumber: number
) => {
  const offset = pageNumber * pageSize;
  const limit = pageSize;
  return axios
    .get(`/feed/${username}?limit=${limit}&offset=${offset}`)
    .then((res) => res.data);
};
