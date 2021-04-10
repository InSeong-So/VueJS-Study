import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  // 토큰을 항상 Request.headers의 Authorization에 담아서 보낸다.
  // 기본적인 API 통신 방법
  headers: {
    Authorization: 'test1234',
  },
});

function registerUser(userData) {
  return instance.post('signup', userData);
}

function loginUser(userData) {
  return instance.post('login', userData);
}

export { registerUser, loginUser };
