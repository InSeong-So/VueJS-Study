# Vue.Js Study
- 보일러 템플릿 작성

- [webpack devServer](https://joshua1988.github.io/webpack-guide/devtools/webpack-dev-server.html)

- [eslint / prettier란](https://joshua1988.github.io/web-development/vuejs/boost-productivity/)

- IDE 세팅 / vscode 

- 절대경로와 상대경로 : webpack resolve 옵션인 @/로 접근할 수 있게 설정
  - 지금 설정하는건 vscode가 제공하는 기능이므로 에디터/IDE에 맞게 설정

- 코드 스플리팅

- 보일러 플레이트 적용

<hr>

## 개발 시 주의사항
1. 공통 된 태그, 함수는 컴포넌트/모듈로 분리한다.
2. 페이지 역할을 하는 컴포넌트는 최대한 라우팅이라든지, 데이터를 패치해오는 로직이 들어가는 건 좋지 않은 설계방식이다.
  - Vue에 들어가는 컴포넌트의 깊이가 더 깊어지거나, 설계가 변경된 경우 유연하게 대처하기 위해서는 컴포넌트가 라우팅 정보만 담고 있고 데이터를 불러오는 기능은 별도의 컴포넌트를 정의해야 한다.
3. 화살표 함수를 습관화 할 것. this 객체 등의 제어 때문도 있다.
4. Scalable하게, 확장가능하게 만들기 위해서는 아래를 따른다.
  - HTTP Request & Response 관련된 기본 설정을 한다.
  - API 관련된 함수들을 정리한다.
4-1. 공통적으로 사용할 수 있는 설정/함수들은 모듈로 분리한다.
4-2. 공통적으로 API 모듈 또는 기능별 함수를 구현하지 않는다면 각 컴포넌트 또는 파일별로 라이브러리를 import 하거나 동일한 함수들을 각각 정의하고 작성해야한다. 즉, 중복된 코드가 계속 발생하게 된다.
5. [Vue가 화면을 그리는 원리](https://vuejs.org/v2/guide/reactivity.html#ad)

<hr>

## CLI 2.x vs CLI 3.x
### 명령어
- 2.x : vue init `프로젝트 템플릿` `이름 파일 위치`
- 3.x : vue create `프로젝트 이름`

### 웹팩 설정 파일
- 2.x : 노출됨(webpack.config.js)
- 3.x : 노출되지 않음
  - 설정 파일도 복잡하므로 라이브러리 내부에서 처리하겠다.
  - [webpack 설정 document](https://cli.vuejs.org/guide/webpack.html#working-with-webpack)

### 프로젝트 구성
- 2.x : 깃헙의 템플릿 다운로드
  - clone과 동일
  - `npm install`을 실행해야함
- 3.x : 플러그인 기반으로 기능(feature) 다운로드
  - router, store 등 자동 추가

### ES6 이해도
- 2.x : 필요하지 않음
  - App.vue 에 이해가 가능하게끔 소스가 작성되어 있음
- 3.x : 필요함
  - App.vue 에 축약어, 컴포넌트 등 ES6의 문법이 많이 사용됨

<hr>

## ESLint
### ESLint란?
- 문법을 강제하거나, 교정이 필요한 경우 하이라이팅 해준다.
    ```js
    // 1
    var a = 10;

    // 2
    var a = 10

    import AppHeader from './components/AppHeader'
    import Vue from 'vue'

    if(a === 10){
        console.log('10 이다.');
    }

    if(a === 1) console.log('10이다.') b() c()

    // 트레일링 콤마 - trailing comma
    components: {
        '컴포넌트 이름': 컴포넌트 내용,
    }
    ```

### 적용 방법
- 기본
    ```js
    <script>
    // 스크립트 태그 최상단에
    /* eslint-disable */
    // 정의

    </script>
    ```
    - 또한 터미널에서 명령어로 제어할 수 있다.

- vue.config.js 를 이용한 방법
    ```js
    // eslint를 적용하지 않을 때
    // 모든 파일에 작성하기 힘들고 귀찮으니까 
    module.exports = {
        lintOnSave: false,
    }
    ```

<hr>

## router
### 설치
```sh
npm i vue-router --save
```

### 적용
- 기본적인 방법, main.js에 정의
    ```js
    import Vue from 'vue'
    import App from './App.vue'
    import VueRouter from 'vue-router';

    Vue.config.productionTip = false

    Vue.use(VueRouter);

    const router = new VueRouter({
    routes: [

    ]
    })

    new Vue({
    render: h => h(App),
    router,
    }).$mount('#app')
    ```
    - 프로젝트 규모가 커지면 router에 정의해야하는 함수, 기능이 많다.

    - main.js에 담기에는 너무 방대해진다.

- 분리
    ```js
    /* src/router/index.js */
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    // 컴포넌트 페이지 import
    import NewsView from '../views/NewsView.vue'
    import AskView from '../views/AskView.vue'
    import JobsView from '../views/JobsVieww.vue'
    // + 같은 단어 동시 선택 단축키 : Ctrl + D, Cmd + D

    Vue.use(VueRouter);

    export const router = new VueRouter({
        routes: [
            {
                // path : url 주소
                path: '/news',
                // component : 특정 url 주소로 갔을 때 표시될 컴포넌트
                component: NewsView,
            },
            {
                path: '/ask',
                component: AskView,
            },
            {
                path: '/jobs',
                component: JobsView,
            }
        ]
    })
    ```
    ```js
    /* src/main.js */
    import Vue from 'vue';
    import App from './App.vue';
    // 분리한 router 모듈
    import {router} from './router/index.js';

    Vue.config.productionTip = false

    new Vue({
        render: h => h(App),
        // Vue 인스턴스에 연결, router:router의 축약어
        router,
    }).$mount('#app')
    ```

### 동작
- App.vue는 Vue App의 진입점이므로 main.js에 정의한 vue instance의 내용을 그대로 가져간다.
    ```html
    <template>
    <div id="app">
        <!-- url이 만약 news -->
        <NewsView></NewsView>
        <!-- url이 만약에 path에 일치하는 주소라면 -->
        <router-view></router-view>
    </div>
    </template>
    ```
    - router에 설정했던 path, component는 해당 프로그램에서부터 유효하다.

### redirect 속성과 router-link
- redirect
    ```js
    export const router = new VueRouter({
        routes: [
            {
                path: '/',
                redirect: '/news',
            },
            {
                // path : url 주소
                path: '/news',
                // component : 특정 url 주소로 갔을 때 표시될 컴포넌트
                component: NewsView,
            },
            {
                path: '/ask',
                component: AskView,
            },
            {
                path: '/jobs',
                component: JobsView,
            }
        ]
    })
    ```

- router-link
    - header 컴포넌트 구성
    ```html
    <!-- /components/ToolBar.vue -->
    <template>
        <div>
            <router-link to="/news">News</router-link>
            <router-link to="/ask">Ask</router-link>
            <router-link to="/jobs">Jobs</router-link>
        </div>
    </template>
    ```

    - App.vue에 import하여 공통적으로 사용하기
        ```html
        <template>
            <div id="app">
                <!-- 1. Strongly Recommended-->
                <ToolBar></ToolBar>
                <!-- 2. Essential -->
                <!-- <tool-bar></tool-bar> -->
                <router-view></router-view>
            </div>
        </template>
        ```
        ```js
        import ToolBar from './components/ToolBar.vue';

        export default {
            components:{
                // vs-code는 파스칼케이스로 자동 등록이 되어 소문자-케밥케이스로 HTML태그를 사용하는게 좋다.
                ToolBar,
            }
        }
        ```

### router 폴더 작명 팁
- router 폴더는 routes로 변경
  - routes로 변경하면 material icon 플러그인으로 인해 변경됨(FileIcon Theme)
  - 업데이트 된 버전에서는 router도 변경됨

### import 확인
- Ctrl(또는 Cmd) 키를 누르고 마우스를 올리면 해당 컴포넌트 또는 메소드로 링크가 생김
  - 항상 제대로 import 되었는지 확인하는 절차가 필요

### router mode
- mode `history`
  - 사용 시 url 주소의 해쉬값이 사라짐

### transition
- [api](https://router.vuejs.org/guide/advanced/transitions.html#per-route-transition)
- [api2](https://vuejs.org/v2/guide/transitions.html)

<hr>

## axios를 이용한 api 호출
- [해커뉴스 api](https://github.com/tastejs/hacker-news-pwas/blob/master/docs/api.md)

### axios란
- 통신 관련 된 api를 편리하게 사용할 수 있게 해주는 라이브러리
- 프로미스 기반 api 제공
  - `return Promise()`

<hr>

## this 4가지와 화살표 함수의 this
### 첫 번째 this
```js
// 호출
console.log(this)
```
- 자바스크립트 최상단에는 `window`가 있음
- 크롬 디버그(콘솔) 모드에서 `this`를 입력하면 `window`가 호출됨

### 두 번째 this
```js
<script>
function sum(a, b){
    console.log(this);
    return a + b;
}
</script>

// 호출
sum(10, 20);
```
- 함수 안에서도 this는 전역(window)을 가리킨다.
- `'use strict'`를 사용하면 상이해진다.

### 세 번째 this
```js
<script>
function Vue(el){
    console.log(this);
    this.el = el;
}
</script>

// 호출
new Vue('#app')
```
- 생성자 함수를 가리킨다.

### 네 번째 this
```js
<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    console.log('호출 전', this);
    fetchNewsList()
      .then(function(response){
        console.log('호출 후', this);
      })
      .catch(function(err){console.log(err)});
  },
};
</script>

// 호출 전 : Vue instance
// 호출 후 : undefined
```

### 화살표 함수의 this
```js
<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    console.log('호출 전', this);
    fetchNewsList()
      .then((response) => {
        console.log('호출 후', this);
      })
      .catch(err => {console.log(err)});
  },
};
</script>

// 호출 전 : Vue instance
// 호출 후 : Vue instance
```

<hr>

## 비동기 처리

- [Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)

### Callback
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div>jquery ajax</div>

    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script>
        // 0 콜백 사용
        function fetchData() {
            // 1
            var result = [];

            // 2
            $.ajax({
                url: 'https://api.hnpwa.com/v0/news/1.json',
                success: function (data) {
                    console.log('데이터 호출 결과', data);
                    result = data;

                    // 4 : 정상 데이터 출력
                    //console.log('함수 결과', result);
                }
            });

            // 3 : []
            console.log('함수 결과', result);
        }

        // 콜백 테스트
        fetchData();
    </script>
</body>

</html>
```
- 자바스크립트는 싱글 스레드로 동작한다. 그럼에도 javascript가 병렬적으로 비동기 코드를 실행하는 느낌이 드는 것은 비동기 처리를 외부 api에 위임하고, 완료된 작업을 event loop를 통해서 반환받고, 다시 javascript의 실행 영역에서 callback을 실행하기 때문이다. 그 결과,  `console.log('함수 결과', result)`에 찍히는 결과값이 다르다.

### Promise
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div>jquery ajax</div>

    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script>
        // 0 프로미스 사용
        function callAjax(){
          return new Promise(function(resolve, reject){
            $.ajax({
                url: 'https://api.hnpwa.com/v0/news/1.json',
                success : function(data){
                  resolve(data);
                }
            });
          });
        }

        // 프로미스 테스트
        callAjax()
          .then(function(data){
            console.log('데이터 호출 결과', data);
            result = data;
            console.log('함수 결과', result);
          })
          .catch(function(err){
            console.log(err);
          });
    </script>
</body>

</html>
```
- 콜백 헬(콜백 함수 내부에 중첩되는 콜백 함수)
  ```js
  asyncFunc('something', function(err, data){
    asyncFunc('something', function(err, data){
      asyncFunc('something', function(err, data){
        asyncFunc('something', function(err, data){
          asyncFunc('something', function(err, data){
            // ... do the final action
          });
        });
      });
    });
  });
  ```
- 코드 인덴팅(들여쓰기)
- 사고의 위배
- 위와 같은 문제점을 해결하기 위해 직관적인 코드를 짜자! 해서 등장한 기능

<hr>

## Vuex
### 개요
- 설치 : `npm i vuex`

- Vuex.store를 분리한다.

<hr>

## EventBus

<hr>

## HOC(High-Order Component)
- React에서 가장 많이 사용함

### 동작
- 동일하게 반복되는 컴포넌트 실행 로직에 자주 사용
  - 공통적으로 사용하는 컴포넌트의 로직을 상위의 컴포넌트를 만들어 하나 더 올리고, 상위 컴포넌트에서 나머지 컴포넌트들에게 전부 뿌려주는(렌더링) 역할

<hr>

## Mixins
### HOC의 단점
- 컴포넌트 레벨이 깊어짐으로 로직 간 통신이 매우 까다로워짐

### Mixins
- 컴포넌트가 단순해짐
- modal, loading 등 mixins으로 빼면 공통 도구들은 로직에서 상당수 해소됨

<hr>

## UX를 고려한 데이터 호출 시점
### 데이터 호출 시점
1. 컴포넌트 라이프 사이클 훅 : 2가 호출 된 후 호출
  - created : (컴포넌트가 생성)되자마자 호출되는 로직

2. 라우터 네비게이션 가드(컴포넌트 진입 전) : 먼저 호출
  - [참조1](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-guards)
  - [참조2](https://joshua1988.github.io/web-development/vuejs/vue-router-navigation-guards/)
  - 특정 URL로 접근하기 전의 동작을 정의하는 속성(함수)

<hr>

## 자바스크립트 비동기 처리 패턴

```js
// ---------------- 1 : callback
// 작동 안됨
var id = $.get('domain.com/id');
if (id === 'john') {
    var products = $.get('domain.com/products');
}

// 작동함
$.get('domain.com/id', function (id) {
    if (id === 'john') {
        $.get('domain.com/products', function (products) {
            console.log(products);
        })
    }
});

// ---------------- 2 : promise
function getId() {
    return new Promise(function (resolve, reject) {
        $.get('domain.com/id', function (id) {
            resolve)(id);
    });
});
  }

function getProduct() {
    //...
}

function logProduct() {
    //...
}

// getId()
//   .then(function(id){
//     if(id === 'john') {
//         $.get('domain.com/products', function (products) {
//             return new Promise(...);
//         });
//     }
//   })
//   .then(function(products){
//     console.log(products);
//     // 추가 코드 작성
//   })
//   .catch();

getId()
    .then(getProduct)
    .then(logProduct)
    .catch();

// ---------------- 3 : async, await
var id = $.get('domain.com/id');
if (id === 'john') {
    var products = $.get('domain.com/products');
}
```

- [참조](https://joshua1988.github.io/web-development/javascript/js-async-await/)

- 사용법
```js
export default {
    methods : {
        // 일반적인 프로미스
        loginUser() {
            axios
            .get("https://jsonplaceholder.typeicode.com/users/1")
            .then((response) => {
                if (response.data.id === 1) {
                console.log("사용자 인증되었습니다.");
                axios
                    .get("https://jsonplaceholder.typeicode.com/todos")
                    .then((response) => {
                        this.items = response.data;
                    });
                }
            })
            .catch((error) => console.log(error));
        },
        // async-await
        async loginUser() {
            var response = await axios.get("https://jsonplaceholder.typeicode.com/users/1");
            // async-await를 한다고 아래 코드를 실행시키지 않는게 아님
            // 프로미스를 async-await를 통해 구현하는 것
            console.log(10);
            if (response.data.id === 1) {
                console.log("사용자 인증되었습니다.");
                var list = await axios.get("https://jsonplaceholder.typeicode.com/todos");
                this.itmes = list.data;
            }
        },
    }
}
```

- 에러처리 방법 : try ~ catch 사용
  - 에러 함수를 공통화하여 모듈로 만들 수 있음
```js
async loginUser() {
    try {
        var response = await axios.get("https://jsonplaceholder.typeicode.com/users/1");
        // async-await를 한다고 아래 코드를 실행시키지 않는게 아님
        // 프로미스를 async-await를 통해 구현하는 것
        console.log(10);
        if (response.data.id === 1) {
            console.log("사용자 인증되었습니다.");
            var list = await axios.get("https://jsonplaceholder.typeicode.com/todos");
            this.itmes = list.data;
        }
    catch(error){
        console.log(eror);
    }
},
```

<hr>

## 외부 라이브러리 모듈화 방법
### 외부 라이브러리 모듈화 이유
- Vue.js 관련 라이브러리가 없을 때 일반 라이브러리를 결합할 수 있어야 함
  - 신규 프레임워크이므로 자원이 풍부하진 않음
  - 종류
    - 차트
    - 데이트 피커
    - 테이블
    - 스피너
    - 기타 등등

### 차트 라이브러리
1. 차트 라이브러리를 NPM으로 설치
  - `npm install chart.js --save`
2. 설치된 라이브러리를 import로 App.vue에서 로딩
3. mounted() 라이프 사이클 훅에서 차트를 그림
4. 차트 컴포넌트화
  - 하위 컴포넌트는 최대한 멍청하게 만들어야 한다.
5. 컴포넌트 플러그인화
  - 인스턴스가 생성 되었을 때 모든 컴포넌트에서 사용하고 싶은 기능을 정의
6. 컴포넌트 통신을 이용한 차트 컴포넌트 기능 결합

<hr>

## Component Design Patterns
1. Common : 기본적인 컴포넌트 등록과 컴포넌트 통신
2. Slot : 마크업 확장이 가능한 컴포넌트
3. Controlled : 결합력이 높은 컴포넌트
  - 서드파티 라이브러리 등 컨트롤 할 때 좀 더 쉽게 만들 수 있다. 상하위 컴포넌트가 강하게 밀착된 형태로 구현
4. Renderless : 데이터 처리 컴포넌트
  - 템플릿 표현식 없이 스크립트단의 비즈니스 로직만 컨트롤하여 데이터를 노출시켜주는 컴포넌트

<hr>

## 서비스 배포
- `npm run build`
  - default로 dist 폴더에 웹 호스팅이 가능한 파일들이 생성된다.

- package.json의 scripts항목에 정의되어 있다.

- netilfy