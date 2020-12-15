import axios from "axios";
const apiClient = axios.create({
  baseURL: `http://127.0.0.1:3000`,
  withCredentials: false,
  headers: {
    Accept: "application/json",

    "Content-Type": "application/json"
  }
});
export default {
  getFundraisings() {
    return apiClient.get("/fundraisings");
  },
  getFundraising(id) {
    return apiClient.get("/fundraisings/" + id);
  },
  getChart() {
    return apiClient.get("/chart/");
  },
  getPoints() {
    return apiClient.get("/points/");
  },
  getRates() {
    return apiClient.get("/rates/");
  }
};
