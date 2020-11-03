import axios from 'axios';
import { Toast } from 'vant';

const baseURL = 'http://127.0.0.1:5000';

const wechatBaseURL = 'https://hemc.100steps.net/2020/wechat';

// axios配置
const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (err) => {
    if (!err.response) {
      Toast.fail({
        message: '服务器无法响应，请稍后再试',
      });
    } else {
      console.log(err.response);
      switch (err.response.status) {
        // 未登录
        case 401:
          window.location.href = `${wechatBaseURL}/auth?state=${encodeURIComponent(
            window.location.href
          )}`;
          break;
        // 服务器错误
        case 500:
          Toast.fail({
            message: '服务器错误，请稍后再试',
          });
          break;
        default:
          return Promise.reject(err);
      }
    }
    return new Promise(() => {});
  }
);

export default instance;