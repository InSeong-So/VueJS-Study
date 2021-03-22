import { fetchList, fetchUserInfo, fetchCommentItem } from "../api/index.js";

export default {
    // FETCH_NEWS(context) {
    //     fetchNewsList()
    //         .then(response => {
    //             // 담아온 데이터를 state.news에 담고 싶다.
    //             // action은 항상 context라는 객체(변수, 인자)가 제공이된다.
    //             // mutations의 SET_NEWS를 실행한다.
    //             context.commit('SET_NEWS', response.data);
    //             return response;
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // },
    // FETCH_JOBS({ commit }) {
    //     fetchJobsList()
    //         .then(({ data }) => {
    //             commit("SET_JOBS", data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // },
    // // 축약어
    // FETCH_ASK({ commit }) {
    //     fetchAskList()
    //         // 축약어
    //         .then(({ data }) => {
    //             commit("SET_ASK", data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // },
    // #2
    FETCH_LIST({ commit }, pageName) {
        // #3 : promise 체이닝
        return fetchList(pageName)
            .then(({ data }) => {
                commit("SET_LIST", data);
            })
            .catch(error => {
                console.log(error);
            });
    },
    FETCH_USER({ commit }, name) {
        return fetchUserInfo(name)
            .then(({ data }) => {
                commit("SET_USER", data);
            })
            .catch(error => {
                console.log(error);
            });
    },
    FETCH_ITEM({ commit }, id) {
        return fetchCommentItem(id)
            .then(({ data }) => {
                commit("SET_ITEM", data);
            })
            .catch(error => {
                console.log(error);
            });
    },
}