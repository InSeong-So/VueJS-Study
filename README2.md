# VueJS
> 스택
> - `Visual Studio Code` : IDE 및 Editor
> - `Chrome Broswer` + `vue.js Devtools` : Dev Tool
>> - 크롬 브라우저의 확장 프로그램에서 `vue.js devtools` 설치
> - `Vue-Cli` : App Template 제공

<br>

# 개발환경 구축
## Visual Studio Code Code
- [설치](http://code.visualstudio.com)

- Extension List *(선택)*
  - View-in-browser : 기본 브라우저로 html 파일 출력

  - vetur : vue.js 의 Syntax-highlighting, Snippet, Emmet, Linting / Error Checking, Formatting, Auto Completion, Debugging 제공

  - html snippets : html 태그를 쉽게 작성할 수 있는 기능 제공

  - JS-CSS-HTML Formatter : js, css html 의 Auto Completion 제공 / `Ctrl + Sapce`

  - vue 2 snippets : vue.js 2.0의 코드 조작 및 문법 강조 기능 제공

  - vue-beautify : vue.js 코드의 정리 배치 기능 제공

  - ESLint : JavaScript 코드 스타일, 문법 체크 기능 제공

<br>

# VueJS 시작하기
## VueJS 란?
- 개론
  - 사용자 인터페이스를 만들기 위한 `프로그레시브 프레임워크`
    - `선언적 렌더링` : HTML 템플릿에 렌더링 대상을 선언적으로 기술해 데이터가 변경될 때마다 DOM 을 반응적으로 렌더링하고 사용자 입력 데이터를 동기화 할 수 있음

    - `컴포넌트 시스템` : UI 를 모듈화해 재사용 할 수 있게 해주며 Vue.js 가 제공하는 기능

    - `클라이언트 사이드 라우팅` : Vue.js 의 공식 라우팅 라이브러리인 Vue Router 를 사용하면 기존에 개발한 컴포넌트로 싱글 페이지 애플리케이션 작성 가능

    - `대규모 상태관리` : 상태 관리 라이브러리인 VUEX 를 사용하면 기존 컴포넌트를 확장하는 형태로 상태를 중앙에서 관리 가능

    - `빌드시스템` : 공식 개발지원 도구 Vue-Cli 를 이용하면 프로젝트의 환경구축, 구성관리에 수고를 들이는 대신 개발에 집중할 수 있음

    - `클라이언트-서버데이터 퍼시스턴스` : 웹 애플리케이션의 복잡한 데이터는 클라이언트와 서버 양쪽 모두에서 퍼시스턴스 데이터로 유지 되어야 한다.

  - 단일형 프레임워크와 달리 `점진적으로 채택할 수 있도록 설계` 됨
  
  - 핵심 라이브러리는 뷰 레이어만 초점을 맞추어 다른 라이브러리나 기존 프로젝트와의 통합이 매우 쉬움
  
  - 현대적 도구 및 지원하는 라이브러리와 함께 사용하면 정교한 싱글 페이지 응용프로그램을 완벽하게 지원할 수 있음

<hr>
<br>

## 시작하기
> 공식 가이드는 HTML, CSS 및 JavaScript 에 대한 중간 수준의 지식을 전제로 함
>> Node.js 기반 빌드 도구에 아직 익숙하지 않으면 Vue-Cli 로 시작하는 것을 권장하지 않음

```html
<!-- 개발버전, 도움되는 콘솔 경고 포함 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<!-- 상용버전, 속도와 용량 최적화 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

<hr>
<br>

## 선언적 렌더링
> 간단한 템플릿 구문을 사용해 DOM에서 데이터를 선언적으로 렌더링 할 수 있는 시스템이 존재

```html
<html>
<head>
    <title>Vue Sample</title>
</head>
<body>
    <div id="app">
        {{ message }}
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue.js!'
            }
        });
    </script>
</body>
</html>
```
```
Hello Vue.js!
```

- 문자열 템플릿을 렌더링하는 것과 매우 유사하나 Vue.js 내부에서 더 많은 작업이 진행 됨

- 텍스트 외에도 `엘리먼트 속성`을 바인딩 할 수 있음
  ```html
  <html>
  <head>
      <title>Vue Sample</title>
  </head>

  <body>
      <div id="app-2">
          <span v-bind:title="message">
            저한테 마우스를 올려봐요!
          </span>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
      <script>
          var app2 = new Vue({
              el: '#app-2',
              data: {
                  message: '해당 페이지는 ' + new Date() + ' 에 로드했어요!'
              }
          })
      </script>
  </body>
  </html>
  ```
  ```
  저한테 마우스를 올려봐요!
  ```
  - v-bind 속성은 `디렉티브`라고 함
  
  - 디렉티브는 Vue 에서 제공하는 특수 속성임을 나타내는 `v- 접두어`가 붙어있음
  
  - 사용자가 짐작할 수 있듯 렌더링 된 DOM에 특수한 반응형 동작을 함
  
  - 기본적으로 *이 요소의 `title 속성`을 `Vue 인스턴스`의 `message 속성`으로 `최신 상태`를 유지*

<hr>
<br>

## 조건문과 반복문
```html
<html>
<head>
    <title>Vue Sample</title>
</head>

<body>
    <div id="app-3">
        <p v-if="seen">보이니?</p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
    <script>
        var app3 = new Vue({
            el: '#app-3',
            data: {
                // seen: true
                seen: false
            }
        })
    </script>
</body>
</html>
```
```
보이니?
```

- 텍스트와 속성뿐 아니라 DOM의 구조에도 데이터를 바인딩 할 수 있음

- Vue 엘리먼트가 `Vue 에 삽입/업데이트/제거될 때 자동으로 트랜지션 효과를 적용`할 수 있는 강력한 전환 효과 시스템 제공

- 각 디렉티브마다 고유한 기능이 있으며 `v-for 디렉티브`는 배열의 데이터를 바인딩하여 Todo 목록을 표시하는데 사용할 수 있음
  ```html
  <html>
  <head>
      <title>Vue Sample</title>
  </head>

  <body>
      <div id="app-4">
          <ol>
              <li v-for="todo in todos">
                  {{ todo.text }}
              </li>
          </ol>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
      <script>
          var app4 = new Vue({
              el: '#app-4',
              data: {
                  todos: [{
                      text: 'JavaScript 배우기'
                  }, {
                      text: 'Vue 배우기'
                  }, {
                      text: '무언가 멋진 것을 만들기'
                  }]
              }
          })
      </script>
  </body>
  </html>
  ```
  ```
  1. JavaScript 배우기
  2. Vue 배우기
  3. 무언가 멋진 것을 만들기
  ```

<hr>
<br>

## 사용자 입력 핸들링
> 사용자와 앱의 상호 작용을 위해 `v-on 디렉티브`를 사용하여 `Vue 인스턴스에서 메소드를 호출`하는 이벤트 리스너를 추가 할 수 있다.

```html
<html>

<head>
    <title>Vue Sample</title>
</head>

<body>
    <div id="app-5">
        <p>{{ message }}</p>
        <button v-on:click="reverseMessage">메시지 뒤집기</button>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
    <script>
        var app5 = new Vue({
            el: '#app-5',
            data: {
                message: '안녕하세요! Vue.js!'
            },
            methods: {
                reverseMessage: function() {
                    this.message = this.message.split('').reverse().join('')
                }
            }
        })
    </script>
</body>

</html>
```

- 직접적인 DOM 컨트롤 없이 앱의 상태만을 업데이트
  - 모든 DOM 조작은 Vue에 의해 처리되며 작성한 코드는 기본 로직에만 포커싱 됨

- 추가적으로 입력과 앱 상태를 양방향으로 바인딩하는 `v-model 디렉티브`를 제공
    ```html
    <html>

    <head>
        <title>Vue Sample</title>
    </head>

    <body>
        <div id="app-6">
            <p>{{ message }}</p>
            <input v-model="message">
        </div>

        <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
        <script>
            var app6 = new Vue({
                el: '#app-6',
                data: {
                    message: '안녕하세요 Vue!'
                }
            })
        </script>
    </body>

    </html>
    ```

<hr>
<br>

## 컴포넌트를 사용한 작성
> 작고 독립적이며 재사용이 가능해 대규모 애플리케이션을 쉽게 구축할 수 있게 해주는 추상적 개념
> - Vue의 컴포넌트는 미리 정의된 옵션을 가진 Vue 인스턴스

```js
// todo-item라는 명칭의 컴포넌트 정의
Vue.component('todo-item', {
  template: '<li>할일 항목 하나입니다.</li>'
})

var app = new Vue(...)
```

  - 다른 템플릿에서 선언한 컴포넌트를 사용하는 방법
    ```js
    <ol>
        <!-- todo-item 컴포넌트의 인스턴스 만들기 -->
        <todo-item></todo-item>
    </ol>
    ```

  - 부모 영역의 데이터를 자식 컴포넌트에 전달하기
    ```js
    Vue.component('todo-item', {
        // todo-item 컴포넌트는 "prop" 이라는 사용자 정의 속성을 입력받을 수 있다.
        // 이 prop의 명칭은 todo로 한다.
        props: ['todo'],
        template: '<li>{{ todo.text }}</li>'
    })
    ```

- 위의 코드를 참고하여 `v-bind`를 사용해 todo-item 컴포넌트에 전달하기
    ```html
    <div id="app-7">
        <ol>
            <!--
            todo-item에 todo 객체를 제공하며 컨텐츠는 동적으로 바뀔 수 있다.
            각각의 구성 요소에 '키'를 제공해야 한다.
            -->
            <todo-item v-for="item in groceryList" v-bind:todo="item" v-bind:key="item.id"></todo-item>
        </ol>
    </div>
    ```
    ```js
    Vue.component('todo-item', {
        props: ['todo'],
        template: '<li>{{ todo.text }}</li>'
    })

    var app7 = new Vue({
        el: '#app-7',
        data: {
            groceryList: [
                { id: 0, text: 'Vegetables' },
                { id: 1, text: 'Cheese' },
                { id: 2, text: 'Whatever else humans are supposed to eat' }
            ]
        }
    })
    ```

- 앱을 더 작은 단위로 나누고 자식을 props 인터페이스를 통해 부모로부터 합리적인 수준으로 분리했다.
  - 이후 부모 앱에 영향을 주지 않으면서 <todo-item> 컴포넌트를 더 복잡한 템플릿과 로직으로 더욱 향상시킬 수 있다.

<hr>
<br>

# Vue 인스턴스
## Vue 인스턴스의 생성
> Vue 앱은 Vue 인스턴스를 생성하는 것으로 시작함

- MVVM 패턴에 영감을 받은 컨벤션으로 Vue 인스턴스를 참조하기 위한 변수로 vm(ViewModel의 약자)을 사용
    ```js
    var vm = new Vue({
    // 옵션
    })
    ```

- Vue 인스턴스에는 데이터, 템플릿, 마운트할 엘리먼트, 메소드, 라이프사이클 콜백 등의 옵션을 포함 할 수있는 options 객체를 전달해야 함
  - [Vue Api Document](https://kr.vuejs.org/v2/api/)

- Vue 생성자는 미리 정의 된 옵션으로 재사용 가능한 컴포넌트 생성자를 만들어 그 기능을 확장할 수 있다.
  - new Vue를 통해 만들어진 루트 Vue 인스턴스로 구성되며 선택적으로 중첩이 가능하고 재사용 가능한 컴포넌트 트리로 구성된다.
  
  - 확장된 인스턴스를 만들수는 있으나 대개 템플릿에서 사용자 지정 엘리먼트로 선언적으로 작성하는 것이 좋다.

<hr>
<br>