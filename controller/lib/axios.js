import 'dotenv/config'
import axios from 'axios';


export const getAxiosInstance =  (BASE_URL, headers = {}) => {
  console.log('BASE_URL', BASE_URL);
  return {
    get(method, params) {
      return axios.get(`/${method}`, { 
        baseURL: BASE_URL,
        params,
        headers,
       });
    },
    post(method, data) {
      return axios({
        method: "post",
        baseURL: BASE_URL,
        url: `/${method}`,
        data,
        headers,
      });
    },
  };
}