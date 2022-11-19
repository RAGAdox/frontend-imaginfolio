import axios from "../../../Axios";
export const generateUserPostApi = async (
  username: string,
  file: any,
  tags: any[],
  caption: string
) => {
  const formData = new FormData();
  formData.append("file", file, file.path);
  formData.append("tags", tags.join(","));
  formData.append("caption", caption);
  return axios.post(`/feed/create-post/${username}`, formData);
};

export const getPostStatusApi = (username: string, id: string) => {
  return axios
    .get(`feed/post-status/${username}?id=${id}`)
    .then((res) => res.data);
};
