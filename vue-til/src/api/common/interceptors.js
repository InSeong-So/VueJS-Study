import store from '@/store/index';

export function setInterceptors(instance) {
  instance.interceptors.request.use(
    function(config) {
      // Do somthing before request is sent
      //   console.log(config);
      console.log(store.state.token);
      config.headers.Authorization = store.state.token;
      return config;
    },
    function(error) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function(config) {
      return config;
    },
    function(error) {
      return Promise.reject(error);
    },
  );
  return instance;
}
