import axios from "axios";

export const ApiTmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export const api = axios.create({
  baseURL: "http://localhost:8081/",
});

export type TAxiosTypedReturn<T> = {
  data: T;
};
