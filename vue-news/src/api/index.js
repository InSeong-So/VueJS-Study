import axios from 'axios';

// 1. HTTP Request & Response 관련된 기본 설정을 한다.
const config = {
    baseUrl: 'https://api.hnpwa.com/v0/',
};

// 2. API 함수들을 정리한다.
function fetchNewsList() {
    // ES5 : 문자열 합치기
    // return axios.get(config.baseUrl + '/news/1.json');
    // ES6 : 문자열 템플릿(백틱)
    return axios.get(`${config.baseUrl}news/1.json`);
}
function fetchAskList() {
    return axios.get(`${config.baseUrl}ask/1.json`);
}
function fetchJobsList() {
    return axios.get(`${config.baseUrl}jobs/1.json`);
}

// export
export {
    fetchNewsList,
    fetchAskList,
    fetchJobsList
}