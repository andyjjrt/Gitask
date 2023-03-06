import axios, { AxiosRequestConfig } from "axios";

/*
  Function Usage Sample:
  ajax("/api/user/login", "post", {
    data: {}
    params:{}
  }).then(res => {  
    ...
  })
  
*/

export const ajax = async (
  url: string,
  method: string,
  baseURL?: string,
  options?: AxiosRequestConfig<any>
) => {
  if (options !== undefined) {
    var { params = {}, data } = options;
  } else {
    params = data = null;
  }
  const axiosOptions: AxiosRequestConfig<any> = {
    url: url,
    method: method,
    params: params,
    data: data,
    baseURL: baseURL,
    timeout: 0,
    ...options,
  };
  return axios(axiosOptions)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

export const fetchApi = (
  url: string,
  method: string,
  options?: AxiosRequestConfig<any>
) =>
  ajax(url, method, "/api", {
    ...options,
    headers: {
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

export default ajax;
