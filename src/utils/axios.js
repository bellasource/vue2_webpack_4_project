import axios from 'axios';

import { notification } from 'ant-design-vue';
// 引入Nprogress插件,可以在发送请求或者作出响应的时候有进度条的效果
// import Nprogress from 'nprogress';
// 引入该插件的样式文件
// import 'nprogress/nprogress.css';
const SUCCESS_HTTP_CODE = 0; //操作成功的返回码
notification.config({
  duration: 3,
});
var fnnn = function fn(num) {
  return num + 2;
};
fnnn()
const requestOnFulfilledFunc = (request) => {
  // Nprogress.start();
  return Promise.resolve(request);
};

const requestOnRejectedFunc = (error) => {
  return Promise.reject(error);
};

const responseOnFulfilledFunc = (response) => {
  // Nprogress.done();
  if (response.data.code !== SUCCESS_HTTP_CODE) {
    notification.error({
      message: response.data.msg,
    });
    return Promise.reject(response.data);
  }
  return Promise.resolve(response.data?.data || {});
};

const responseOnRejectedFunc = (error) => {
  // Nprogress.done();
  if (codeMessage[error.response.status.toString()]) {
    notification.error({ message: `请求${codeMessage[error.response.status]}` });
  }
  return Promise.reject(error, 'error');
};

const interceptorsContext = {
  default: {
    requestOnFulfilledFunc,
    requestOnRejectedFunc,
    responseOnFulfilledFunc,
    responseOnRejectedFunc,
  },
};

const interceptorsRegister = (instance, model = 'default') => {
  instance.interceptors.request.use(
    interceptorsContext[model].requestOnFulfilledFunc,
    interceptorsContext[model].requestOnRejectedFunc
  );
  instance.interceptors.response.use(
    interceptorsContext[model].responseOnFulfilledFunc,
    interceptorsContext[model].responseOnRejectedFunc
  );
};
const axiosInstance = axios.create({ baseURL: '/mock' });

interceptorsRegister(axiosInstance);
const codeMessage = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限（令牌、用户名、密码错误）',
  404: '针对的是不存在的记录，服务器没有进行操作',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};
export default axiosInstance;
