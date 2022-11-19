import axios from "../../../Axios";

export const getAllInactivePostsApi = (username: string) => {
  return axios.get(`feed/post-status/${username}`).then((res) => res.data);
};

export const getPostStatusApi = (username: string, id: string) => {
  return axios
    .get(`feed/post-status/${username}?id=${id}`)
    .then((res) => res.data);
};
