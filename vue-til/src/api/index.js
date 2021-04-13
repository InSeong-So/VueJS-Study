import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
}

// 액시오스 초기화 함수
function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
  });
  return setInterceptors(instance);
}
export const instance = createInstance();
// 기본 url이 posts가 된 변수
export const posts = createInstanceWithAuth('posts');

// GET - posts
// POST - posts
// PUT - posts {id}
// DELETE - posts {id}
