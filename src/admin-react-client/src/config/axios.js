import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://turtle-ae.azurewebsites.net/adminlogin/"
});
