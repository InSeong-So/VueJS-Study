import Vue from 'vue';
import Vuex from 'vuex';
import { fetchAskList, fetchJobsList, fetchNewsList } from "../api/index.js";

Vue.use(Vuex);

// 상태관리도구
// 상태라는 것은 여러 컴포넌트 간에 공유되는 데이터 속성이다.
export const store = new Vuex.Store({
    state: {
        news: [],
        jobs: [],
        ask: []
    },
    getters: {
        fetchedAsk(state) {
            return state.ask;
        }
    },
    mutations: {
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
        }
    },
    actions: {
        FETCH_NEWS(context) {
            fetchNewsList()
                .then(response => {
                    // 담아온 데이터를 state.news에 담고 싶다.
                    // action은 항상 context라는 객체(변수, 인자)가 제공이된다.
                    // mutations의 SET_NEWS를 실행한다.
                    context.commit('SET_NEWS', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        FETCH_JOBS({ commit }) {
            fetchJobsList()
                .then(({ data }) => {
                    commit("SET_JOBS", data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 축약어
        FETCH_ASK({ commit }) {
            fetchAskList()
                // 축약어
                .then(({ data }) => {
                    commit("SET_ASK", data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
});