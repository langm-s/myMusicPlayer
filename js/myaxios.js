(function () {
  /* 
  1.配置commonURL
  2.响应拦截器
*/

  const instance = axios.create({
    baseURL: "https://apimusic.linweiqin.com/",
    // timeout: timeout
    // headers: headers
  });
  instance.interceptors.response.use(response => {
    // Do something before response is sent
    return response.data;
  }, error => {
    // Do something with response error
    return Promise.reject(error);
  });
  window.myaxios = instance;
})()