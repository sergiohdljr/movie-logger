import axios from "axios";

const ApiTmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default ApiTmdb;
