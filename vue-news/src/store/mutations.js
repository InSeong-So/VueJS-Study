export default {
    // SET_NEWS:function() 축약어
    // mutations에서 state로 값을 넘기려면 state 인자를 받아야 한다.
    // 두번째 인자는 actions에서 넘기는 데이터이다.
    SET_NEWS(state, news) {
        state.news = news;
    },
    SET_JOBS(state, jobs) {
        state.jobs = jobs;
    },
    SET_ASK(state, ask) {
        state.ask = ask;
    },
    SET_USER(state, user) {
        state.user = user;
    },
    SET_ITEM(state, item) {
        state.item = item;
    },
}