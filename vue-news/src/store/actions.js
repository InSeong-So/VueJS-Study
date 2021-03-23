import { fetchList, fetchUserInfo, fetchCommentItem, fetchNewsList, fetchJobsList, fetchAskList } from "../api/index.js";

export default {
    // *---------------------async
    async FETCH_NEWS(context) {
        const response = await fetchNewsList();
        context.commit('SET_NEWS', response.data);
        // return을 안해주면 화면에서의 순서를 보장할 수 없음
        return response;
    },
    async FETCH_JOBS({ commit }) {
        try {
            const response = await fetchJobsList();
            commit('SET_JOBS', response.data);
            // 컴포넌트 단에서 공통화를 위한 status 코드를 위한 기타 코드가 필요할 수 있음
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async FETCH_ASK({ commit }) {
        const response = await fetchAskList();
        commit('SET_ASK', response.data);
        // API에서 에러처리를 하므로 try-catch를 걸지 않음
        return response;
    },
    async FETCH_LIST({ commit }, pageName) {
        const response = await fetchList(pageName);
        commit('SET_LIST', response.data);
        return response;
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