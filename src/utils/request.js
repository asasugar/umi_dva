// request 是默认实例可直接使用, extend为可配置方法, 传入一系列默认参数, 返回一个新的request实例, 用法与request一致.
import request from 'umi-request';

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  return ({
    url: `${url}`,
    options: {
      ...options,
    },
  });
});

// response拦截器, 处理response
request.interceptors.response.use((response, options) => {
  return response;
});


const myFetch = ({
  url = "/",
  type = "get",
  data = {}
}, otherConfig = {}) => {
  let config = {
    method: type,
    [type === 'get' ? 'params' : 'data']: data,
    maxCache: 10,
    useCache: true,
    ttl: 10000,
    requestType: 'form',
  }
  Object.assign(config, otherConfig)
  return request(url, config)
}
export default myFetch
