import axios from "axios";
const baseURL = import.meta.env.BASE_URL;
export const Api = axios.create({ baseURL });
