import CONFIG from '@/config';
import axios from 'axios';
import { message } from 'antd';

const request = axios.create({
  // baseURL: BASEURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

request.interceptors.request.use(
  (configs = {}) => {
    // 加token
    const { HOST } = CONFIG;
    let { url } = configs;
    if (!url) throw Error('未找到接口请求地址');
    if (!url.includes('http://') && !url.includes('https://')) {
      if (url.indexOf('/') === 0) {
        url = `${HOST}${url}`;
      } else {
        url = `${HOST}/${url}`;
      }
    }
    // 接到请求进入loading
    // stores.globalStore.incLoadNum();
    return {
      ...configs,
      url,
      headers: {
        ...configs.headers,
      },
    };
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    try {
      const { data } = response;
      // 全局异常处理

      const pathname = ['/login']; // 不需要验证的路由，如登录 注册找回密码
      if (!pathname.includes(window.location.pathname) && (data.code === '40106' || data.code === '40107')) {
        message.warning('身份验证失效');

        const pathnameStr = window.location.pathname;
        const urlStr = encodeURIComponent(pathnameStr);
        const callUrl = urlStr.includes('/login') ? '/' : urlStr;
        window.location.href = `/login?callUrl=${callUrl}`;
      }
    } catch (e) {
      message.error('请求异常，请稍后再试！');
    }
    return Promise.resolve(response);
  },
  (error) => {
    // console.log('response error', stores);
    // 返回响应结束loading
    // stores.globalStore.decLoadNum();
    console.log(error);
    // 对响应错误做点什么
    try {
      const { data } = error.response;
      // 全局异常处理

      const pathname = ['/login']; // 不需要验证的路由，如登录 注册找回密码
      if (!pathname.includes(window.location.pathname) && (data.code === '40106' || data.code === '40107')) {
        message.warning('身份验证失效');

        const pathnameStr = window.location.pathname;
        const urlStr = encodeURIComponent(pathnameStr);
        const callUrl = urlStr.includes('/login') ? '/' : urlStr;
        window.location.href = `/login?callUrl=${callUrl}`;
      }
    } catch (e) {
      message.error('请求异常，请稍后再试！');
    }
    return Promise.reject(error.response);
  },
);

// export default request;
const HTTP = ({ url, method = 'POST', data = {}, options = {} }) => {
  const json = {
    url,
    method,
    ...options,
  };

  if (method.toLocaleLowerCase() === 'get') {
    json.params = data;
  } else {
    json.data = data;
  }

  return request(json);
};

export default HTTP;
