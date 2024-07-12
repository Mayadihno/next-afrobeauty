import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getItem, removeItem } from "./storage";

async function useAuthentication(config: InternalAxiosRequestConfig) {
  const token = await getItem("sessionToken");

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
}

async function useRedirect(response: AxiosResponse) {
  if (
    response.status === 401 ||
    response.status === 403 ||
    Number(response.data.status) === 401 ||
    Number(response.data.status) === 403
  ) {
    await removeItem("sessionToken");
    window.location.href = "/login";
  }

  return response;
}

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 30 * 1000,
});

instance.interceptors.request.use(useAuthentication);
instance.interceptors.response.use(useRedirect);

export default instance;
