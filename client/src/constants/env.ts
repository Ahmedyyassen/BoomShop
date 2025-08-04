import { LOGINFORM, REGISTERFORM } from "@/types/auth";
import { getEnv } from "@/utils/constants";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const SERVER_URL = getEnv("VITE_SERVER_URL");
const API_URL = `${SERVER_URL}/api`;

const REGISTER = `${API_URL}/auth/register`;
const LOGIN = `${API_URL}/auth/login`;
const LOGOUT = `${API_URL}/auth/logout`;
const SYNCUSER = `${API_URL}/users/sync`;
const UPDATE = `${API_URL}/users/profile`;


const useApiClient = ():AxiosInstance=> {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true
})
  axiosInstance.interceptors.response.use(async(res:AxiosResponse) => {
    return Promise.resolve(res);
  },
    (error: AxiosError) => {
      return Promise.reject(error.response?.data);
    }
  );
  return axiosInstance;
}


export default useApiClient;

export const authApi = {
  register: (api: AxiosInstance, data: REGISTERFORM) => api.post(REGISTER, data),
  login: (api: AxiosInstance, data: LOGINFORM) => api.post(LOGIN, data),
  logout: (api: AxiosInstance) => api.post(LOGOUT)
};

export const apiUser = {
  syncUser: (api: AxiosInstance) => api.get(SYNCUSER),
  updateProfile: (api: AxiosInstance, data: FormData) =>
    api.put(UPDATE, data, {
        headers: { "Content-Type": "multipart/form-data" },
       }),
};