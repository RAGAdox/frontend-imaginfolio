import axios from "../../../Axios";

export const fetchUserDetails = (username: string) => {
  return axios.get(`profile/viewProfile/${username}`).then((res) => res.data);
};

export const fetchUserPosts = ({ username, pageSize, pageNumber }: any) => {
  const offset = pageNumber * pageSize;
  return axios
    .get(`profile/post/${username}?limit=${pageSize}&offset=${offset}`)
    .then((res) => res.data);
};
