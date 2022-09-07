import axios from "axios";

const SERVER_URL = "http://localhost:3000/";

export default () => {
  return axios.create({
    baseURL: SERVER_URL,
  });
};
