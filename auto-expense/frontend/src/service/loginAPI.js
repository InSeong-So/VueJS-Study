import axios from 'axios'

const getUserInfo = (uid, password) => {
  return axios.get('http://localhost:8226/api/login', {
    params: {
      'uid': uid,
      'password': password
    }
  })
};

const isFinished = uid => {
  return axios.get('http://localhost:8226/api/loginCheck', {
    params: {
      'uid': uid
    }
  })
};

export default {
  async login(uid, password) {
    try {
      const getUserInfoPromise = await getUserInfo(uid, password);
      const isFinishedPromise = await isFinished(uid);
      const [userInfoResponse, isFinishedResponse] = await Promise.all([getUserInfoPromise, isFinishedPromise]);
      if (userInfoResponse.data.length === 0) return 'noAuth';
      if (isFinishedResponse.data[0].CNT > 0) return 'done';
      return userInfoResponse;
    } catch (err) {
      console.error(err);
    }

  }
}
