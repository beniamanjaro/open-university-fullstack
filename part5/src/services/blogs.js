import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(token);

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, updateObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updateObject);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  console.log(response);
};

export default { getAll, setToken, create, update, deleteBlog };
