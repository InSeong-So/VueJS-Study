import ListVue from './ListView.vue';
import bus from '../utils/bus.js';

// export default로 function을 꺼내는 행위
export default function createListView(name) {
    // 재사용할 인스턴스(컴포넌트) 옵션들이 들어갈 자리
    return {
        // 'NewsView', 'JobsView', 'AskView'
        // name: 'HOC Component',
        name,
        created() {
            bus.$emit("start:spinner");
            // setTimeout(() => {
            this.$store
                .dispatch("FETCH_LIST", this.$route.name)
                .then(() => {
                    console.log("fetched");
                    bus.$emit("end:spinner");
                })
                .catch((error) => {
                    console.log(error);
                });
            // }, 3000);
        },
        // 내부적으로 어떤 템플릿을 컴파일레이션이라는 변환을 해주고, 해당 변환 시 렌더 함수를 사용한다.
        // 렌더 함수로 컴포넌트를 로딩하는 행위이다.
        render(createElement) {
            return createElement(ListVue);
        }
    }
}