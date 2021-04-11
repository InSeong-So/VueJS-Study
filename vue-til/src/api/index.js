import axios from 'axios';
import { setInterceptors } from './common/interceptors';

// instance setup
function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    // 토큰을 항상 Request.headers의 Authorization에 담아서 보낸다.
    // 기본적인 API 통신 방법
    // headers: {
    // vuex로 header에 token 담기
    // Authorization: store.state.token, : 옳지 못함, 이미 인스턴스가 create 된 상태이므로 authorization의 값을 변경시킬 수 없음
    // axios interceptor로 적용이 가능하다.
    // },
  });

  // 공통설정을 한 뒤 인터셉터로 처리
  return setInterceptors(instance);
}

const instance = createInstance();

function registerUser(userData) {
  return instance.post('signup', userData);
}

function loginUser(userData) {
  return instance.post('login', userData);
}

export { registerUser, loginUser };
