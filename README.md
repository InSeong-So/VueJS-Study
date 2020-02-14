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

## 속성과 메소드
> 각 Vue 인스턴스는 data 객체에 있는 모든 속성을 `프록시 처리`한다.

```js
// 데이터 객체
var data = { a: 1 }

// Vue인스턴스에 데이터 객체 추가
var vm = new Vue({
  data: data
})

// 같은 객체 참조
vm.a === data.a // => true

// 속성 설정은 원본 데이터에도 영향을 끼친다
vm.a = 2
data.a // => 2

// 위와 같이 아래도 똑같다
data.a = 3
vm.a // => 3
```

- 데이터가 변경되면 화면은 다시 렌더링된다. 기억해야할 것은 data에 있는 속성들은 `인스턴스가 생성될 때 존재한 것들만 반응형`이라는 점이다.

```js
// 아래와 같이 b라는 속성을 추가할 때
vm.b = 'hi'
```
- 새 속성 b를 생성 이후에 추가하면 b가 변경되어도 화면이 갱신되지 않는다.
  - 어떤 속성이 나중에 필요하다는 것을 알고 있으며, 빈 값이거나 존재하지 않은 상태로 시작한다면 아래와 같이 초기값을 지정할 필요가 있다.
    ```js
    data: {
        newTodoText: '',
        visitCount: 0,
        hideCompletedTodos: false,
        todos: [],
        error: null
    }
    ```

- 유일한 예외는 `Object.freeze()`를 사용하는 경우로, 이는 `기존 속성이 변경되는 것을 막아 반응성 시스템이 추적할 수 없다는 것을 의미`한다.
    ```js
    var obj = {
        foo: 'bar'
    }

    Object.freeze(obj)

    new Vue({
        el: '#app',
        data: obj
    })
    ```
    ```html
    <div id="app">
        <p>{{ foo }}</p>
        <!-- obj.foo는 더이상 변하지 않는다 -->
        <button v-on:click="foo = 'baz'">Change it</button>
    </div>
    ```

- Vue 인스턴스는 데이터 속성 이외에도 유용한 인스턴스 속성 및 메소드를 제공하며, 다른 사용자 정의 속성과 구분하기 위해 $ 접두어를 붙인다.
    ```js
    var data = { a: 1 }

    var vm = new Vue({
        el: '#example',
        data: data
    })

    vm.$data === data // => true
    vm.$el === document.getElementById('example') // => true

    // $watch 는 인스턴스 메소드
    vm.$watch('a', function (newVal, oldVal) {
        // `vm.a`가 변경되면 호출
    })
    ```

<hr>
<br>

## 인스턴스 라이프사이클 훅
> Vue 인스턴스는 생성될 때 일련의 초기화 단계를 거친다.

- 그 과정에서 사용자 정의 로직을 실행할 수 있는 라이프사이클 훅도 호출된다.
  - 데이터의 설정이 필요한 경우
  
  - 템플릿을 컴파일하는 경우
  
  - 인스턴스를 DOM에 마운트하는 경우
  
  - 데이터가 변경되어 DOM를 업데이트하는 경우 등

## 라이프사이클 다이어그램
<div align=center>

<br>

*Vue 라이프사이클 다이어그램*

<img src="img/01.jpg" alt="00" width="700"/>

</div>

<br>

### Create
> Vue의 라이프 사이클들 중에 가장 먼저 실행됩니다. create 단계에서 실행되는 라이프 사이클 훅(hook)들은 컴포넌트가 DOM에 추가 되기 전이기 때문에, DOM에 접근하거나 this.$el을 사용할 수 없습니다. 컴포넌트가 DOM에 추가 되기 전에 호출 되기 때문에 서버 사이드 렌더링에서도 지원되는 훅입니다. Create 단계에서 호출되는 라이프 사이클 훅들은 beforeCreate와 created가 있습니다.

- `beforeCreate`
  - Vue의 라이프 사이클 훅 중에서 가장 먼저 실행 되는 훅입니다. data와 이벤트($on, $once, $off, $emit), 감시자($watch)등이 설정 되기 전에 호출되는 라이프 사이클 훅입니다.
    ```js
    export default {
      data() {
        return {
          title: 'Vue'
        };
      }
      beforeCreate() {
        // data(this.title)와 이벤트($on ...) 감시자($watch)를 사용할 수 없습니다.
        console.log('beforeCreate');
      }
    }
    // beforeCreate 사용 방법
    ```

- `created`
  - data, computed, methods, watch 등과 같은 옵션 설정이 완료된 시점이기 때문에, data 등을 사용할 수 있습니다. 하지만 아직 DOM에 컴포넌트가 마운트 되지 않았기 때문에 $el은 사용할 수 없습니다.
    ```js
    export default {
      data() {
        return {
          title: 'Vue'
        };
      },
      computed: {
        titleComputed() {
          return 'After Computed : ' + this.title;
        }
      },
      created() {
        // data(this.title), computed(this.titleComputed), methods... 등을 사용할 수 있지만,
        // DOM이 마운팅 되기 전이기 때문에 $el은 사용할 수 없습니다.
        console.log(this.title, this.titleComputed);
      }
    }
    // create 사용 방법
    ```

<br>

### Mount
> 컴포넌트가 DOM에 추가될 때, 실행되는 라이프 사이클 훅입니다. 서버 사이드 렌더링을 지원하지 않습니다. 렌더링이 될 때 DOM을 변경하고 싶다면 이 라이프 사이클 훅을 사용할 수 있습니다. 하지만 컴포넌트 초기에 data가 세팅되어야 한다면, created 라이프 사이클 훅을 사용하는 것이 좋습니다. Mount 단계에서 호출되는 라이프 사이클 훅들은 beforeMount와 mounted가 있습니다.

- `beforeMount`
  - 컴포넌트가 DOM에 추가 되기 직전에 실행되는 훅입니다. 서버 사이드 렌더링을 지원하지 않습니다. 컴포넌트 초기에 data가 세팅되어야 한다면 created 라이프 사이클 훅을, 렌더링 되고 DOM을 변경해야 한다면 mounted 라이프 사이클 훅을 사용하면 되기 때문에, 거의 사용하지 않는 라이프 사이클 훅입니다.
    ```js
    export default  {
      beforeMount() {
        // $el은 아직 사용할 수 없습니다.
      }
    }
    // beforeMount 사용 방법
    ```

- `mounted`
  - 컴포넌트가 DOM에 추가 된 후 호출되는 라이프 사이클 훅입니다. 서버 사이드 렌더링은 지원하지 않습니다. $el을 사용하여 DOM에 접근 할 수 있습니다. mounted 훅이 호출되었다고 모든 컴포넌트가 마운트 되었다고 보장할 수는 없습니다. 전체가 렌더링 보장된 상태에서 작업을 하기 위해서는 $nextTick을 사용해야 합니다.
    ```js
    export default {
      mounted() {
        // $el 을 사용할 수 있습니다.
        console.log('mounted', this.$el);
        this.$nextTick(() => {
          // 모든 화면이 렌더링된 후 호출됩니다.
        });
      }
    }
    // mounted 사용 방법
    ```
    - 자식 컴포넌트의 mounted 훅이 부모 컴포넌트의 mounted 훅 보다 먼저 실행됩니다.
      ```js
      const Child = {
        template: '<div>Child</div>',
        mounted() {
          console.log('Child Component Mounted');
        }
      }

      new Vue({
        el: '#app',
        mounted() {
          console.log('Parent Component Mounted');
        },
        components: {
          Child
        }
      });
      // 부모, 자식 컴포넌트의 mounted 라이프 사이클 훅 호출 순서 예제
      ```

<br>

### Update
> 컴포넌트에서 사용되는 속성들이 변경되는 등의.. 컴포넌트가 재 랜더링 되면 실행되는 라이프 사이클 훅입니다. 컴포넌트가 재 렌더링 될 때, 변경 된 값으로 어떠한 작업을 해야 할 때 유용하게 사용 되는 훅입니다. 서버 사이드 렌더링은 지원하지 않습니다.

- `beforeUpdate`
  - DOM이 재 렌더링 되기 직전에 호출되는 라이프 사이클 훅입니다. 업데이트 된 값들을 가지고 있는 상태이기 때문에, 업데이트 된 값으로 다른 값들을 업데이트 할 수 있습니다. 이 훅에서 값이 변경되더라도 다시 beforeUpdate 훅이 호출 되지 않기 때문에, 무한 루프에 빠질 걱정은 하지 않으셔도 됩니다.
    ```js
    export default {
      beforeUpdate() {
        console.log('beforeUpdate');
      }
    }
    // beforeUpdate사용 방법
    ```

- `updated`
  - DOM이 재 렌더링 된 후 호출되는 라이프 사이클 훅입니다. DOM이 업데이트 된 후 호출 되는 훅이기 때문에 변경 된 후의 DOM을 이용해야 하는 처리를 할 때 사용하기 유용한 훅입니다. mounted 훅과 마찬가지로 재 렌더링이 끝났다는 것이 보장된 상태에서 작업하기 위해서는 $nextTick을 사용해야 합니다. beforeUpdate 훅과 다르게 updated 훅에서 data를 수정하게 되면 update 훅이 호출 되기 때문에 무한 루프에 빠질 수 있으니 유의해야 합니다.
    ```js
    export default {
      updated() {
        console.log('updated');
        this.$nextTick(function () {
          // 모든 화면이 렌더링된 후 실행합니다.
        });
      }
    }
    // updated사용 방법
    ```

<br>

### Destroy
> 컴포넌트가 제거 될 때 실행되는 라이프 사이클 훅입니다.

- `beforeDestroy`
  - 컴포넌트가 제거 되기 직전에 호출되는 라이프 사이클 훅입니다. 이 훅에서 컴포넌트는 본래의 기능들을 가지고 있는 온전한 상태입니다. 이 훅에서 이벤트 리스너를 해제하거나 컴포넌트에서 동작으로 할당 받은 자원들은 해제해야 할 때 사용하기 적합한 훅입니다. 서버 사이드 렌더링을 지원하지 않습니다.
    ```js
    export default {
      beforeDestroy() {
        console.log('beforeDestory');
      }
    }
    // beforeDestroy 사용 방법
    ```

- `destroyed`
  - 컴포넌트가 제거 된 후 호출되는 라이프 사이클 훅입니다. 컴포넌트의 모든 이벤트 리스너(@click, @change 등..)와 디렉티브(v-model, v-show 등..)의 바인딩이 해제 되고, 하위 컴포넌트도 모두 제거됩니다. 서버 사이드 렌더링을 지원하지 않습니다.
    ```js
    export default {
      destroyed() {
        console.log('destroyed');
      }
    }
    // destroyed 사용 방법
    ```

<hr>
<br>

# 템플릿 문법
> 렌더링 된 DOM을 기본 Vue 인스턴스의 데이터에 선언적으로 바인딩 할 수있는 HTML 기반 템플릿 구문을 사용
> - 가상 DOM 개념에 익숙하고 JavaScript의 기본 기능을 선호하는 경우 템플릿 대신 `렌더링 함수를 직접 작성`할 수 있으며 선택사항으로 JSX를 지원함

## 보간법
### 문자열
> 데이터 바인딩의 가장 기본 형태는 “Mustache” 구문(이중 중괄호)을 사용한 텍스트 보간

- Mustache 태그는 해당 데이터 객체의 msg 속성 값으로 대체되며 데이터 객체의 msg 속성이 변경될 때 마다 갱신된다.
    ```html
    <span>메시지: {{ msg }}</span>
    ```

- v-once 디렉티브를 사용하여 데이터 변경 시 업데이트 되지 않는 일회성 보간을 수행할 수 있으나 같은 노드의 바인딩에도 영향을 미친다.
  ```html
  <span v-once>다시는 변경하지 않습니다: {{ msg }}</span>
  ```

<br>

### 원시 HTML
> 이중 중괄호(mustaches)는 HTML이 아닌 일반 텍스트로 데이터를 해석
> - 실제 HTML을 출력하려면 v-html 디렉티브를 사용할 것

- span의 내용은 rawHtml로 대체되고, 이 때 데이터 바인딩은 무시된다.
  - Vue는 문자열 기반 템플릿 엔진이 아니기 때문에 v-html을 이용해 템플릿을 사용할 수 없다.
  
  - 따라서 컴포넌트는 UI 재사용 및 구성을 위한 기본 단위로 사용하는 것을 추천한다.
    ```html
    <p>Using mustaches: {{ rawHtml }}</p>
    <p>Using v-html directive: <span v-html="rawHtml"></span></p>
    ```

- 웹사이트에서 임의의 HTML을 동적으로 렌더링하면 XSS 취약점으로 쉽게 이어질 수 있어 매우 위험하다.
  - 신뢰할 수 있는 콘텐츠에서만 HTML 보간을 사용하고 사용자가 제공한 콘텐츠에서는 절대 사용하면 안 된다.

<br>

### 속성
> Mustaches는 HTML 속성에서 사용할 수 없으니 `v-bind 디렉티브`를 사용할 것

- boolean 속성을 사용할 때 단순히 true인 경우 v-bind의 작동
    ```html
    <div v-bind:id="dynamicId"></div>
    ```

- `isButtonDisabled`가 `null`, `undefined` 또는 `false`의 값을 가지면 `disabled` 속성은 렌더링 된 `<button>엘리먼트`에 포함되지 않는다.
    ```html
    <button v-bind:disabled="isButtonDisabled">Button</button>
    ```

<br>

### JavaScript 표현식 사용
> Vue.js는 모든 데이터 바인딩 내에서 JavaScript 표현식의 모든 기능을 지원한다.

- 이 표현식은 Vue 인스턴스 데이터 범위 내에서 JavaScript로 계산된다.
    ```html
    {{ number + 1 }}

    {{ ok ? 'YES' : 'NO' }}

    {{ message.split('').reverse().join('') }}

    <div v-bind:id="'list-' + id"></div>
    ```

    - 단, 각 바인딩에 `하나의 단일 표현식만 포함`되므로 아래처럼 작성하면 안 된다.
        ```html
        <!-- 아래는 구문이므로 표현식이 아니다. -->
        {{ var a = 1 }}

        <!-- 조건문은 작동하지 않으므로 삼항 연산자를 사용해야 한다. -->
        {{ if (ok) { return message } }}
        ```

- 템플릿 표현식은 샌드박스 처리되며 Math와 Date 같은 전역으로 사용 가능한 것에만 접근할 수 있다.
  - 템플릿 표현식에서 사용자 정의 전역에 액세스하는 행위는 하지 말 것.

<hr>
<br>

## 디렉티브
> `v- 접두사`가 있는 특수 속성

- 디렉티브 속성 값은 `단일 JavaScript 표현식`이 된다.
  - 단, `v-for`는 예외
  
  - 디렉티브의 역할은 표현식의 값이 변경될 때 사이드이펙트를 반응적으로 DOM에 적용하는 것
    ```html
    <!-- 
        seen 이라는 변수가 true라면 <p> 엘리먼트를 삽입
        false라면 <p> 엘리먼트를 제거
    --> 
    <p v-if="seen">you can see me</p>
    ```

### 전달인자
- 일부 디렉티브는 콜론으로 표시되는 “전달인자”를 사용할 수 있다.

- `v-bind 디렉티브`는 반응적으로 HTML 속성을 갱신하는데 사용된다.
  - `href`는 전달인자로, 엘리먼트의 href 속성을 표현식 `url`의 값에 바인드하는 `v-bind` 디렉티브에게 알려준다.
    ```js
    <a v-bind:href="url"> ... </a>
    ```

- DOM 이벤트를 수신하는 v-on 디렉티브
  - 전달인자는 이벤트를 받을 이름이다.
    ```js
    <a v-on:click="doSomething"> ... </a>
    ```

<br>

### 동적 전달인자
> 2.6.0+ 에서 추가, 2.6.0버전부터 Javascript 표현식을 대괄호로 묶어 디렉티브의 아규멘트로 사용 가능

```html
<!-- 동적 전달인자는 제약이 존재 -->
<a v-bind:[attributeName]="url"> ... </a>
```
  - attributeName은 Javascript 형식으로 동적 변환되어, 그 변환결과가 전달인자의 최종적인 값으로 사용
    - Vue 인스턴스에 "href"라는 값을 가진 attributeName 데이터 속성을 가진 경우, 이 바인딩은 `v-bind:href`와 같음

```html
<a v-on:[eventName]="doSomething"> ... </a>
```
  - 동적인 이벤트명에 핸들러를 바인딩 할 때 동적 전달인자를 활용할 수 있다.
    - eventName의 값이 "focus" 라고 한다면 v-on:[EventName]은 `v-on:focus`와 같다.

- 동적 전달인자 값의 제약
  - 동적 전달인자는 `null을 제외하고는 string으로 변환될 것으로 예상`한다.
  
  - null은 명시적으로 바인딩을 제거하는데 사용되며 그 외의 경우엔 string이 아닌 값에 대해 경고를 출력한다.

- 동적 전달인자 형식의 제약
  - 동적 전달인자의 형식에는 문자상의 제약이 있다.
  
  - 스페이스와 따옴표같은 몇몇 문자는 HTML의 속성명으로서 적합하지 않은 문자이기 때문이다.
    ```html
    <!-- 컴파일러 경고 -->
    <a v-bind:['foo' + bar]="value"> ... </a>
    ```

  - 이를 피하는 방법은, 스페이스나 따옴표를 포함하지 않는 형식을 사용하거나, 복잡한 표현식을 계산된 속성(Computed)으로 대체하는 것입니다.

  - in-DOM 탬플릿을 사용할 때에는 *(탬플릿이 HTML파일에 직접 쓰여진 경우)* `브라우저가 모든 속성명을 소문자로 만드는` 관계로 대문자의 사용을 피하는것이 좋다.
      ```html
      <!--
      in-DOM 탬플릿에서는 이 부분이 v-bind:[someattr]로 변환된다.
      인스턴스에 "someattr" 속성이 없는 경우 이 코드는 동작하지 않는다.
      -->
      <a v-bind:[someAttr]="value"> ... </a>
      ```

<br>

### 수식어
> 점으로 표시되는 특수 접미사
> - 디렉티브를 특별한 방법으로 바인딩 해야 함을 나타냄

- .prevent 수식어는 트리거된 이벤트에서 event.preventDefault()를 호출하도록 v-on 디렉티브에게 알려준다.
  ```html
  <form v-on:submit.prevent="onSubmit"> ... </form>
  ```

<hr>
<br>

## 약어
> `v- 접두사`는 템플릿의 Vue 특정 속성을 식별하기 위한 시각적인 신호 역할 담당
> - 사용하기에 다소 장황할 수 있어 가장 자주 사용되는 두 개의 디렉티브인 `v-bind`와 `v-on`에 대해 특별한 약어를 제공

- `:`와 `@`는 속성 이름에 유효한 문자이며 Vue.js를 지원하는 모든 브라우저는 올바르게 구문 분석을 할 수 있다.
  - 최종 렌더링 된 마크업에는 나타나지 않는다.
  
  - 약어는 선택사항이다.

### v-bind 약어
```html
<!-- 전체 문법 -->
<a v-bind:href="url"> ... </a>

<!-- 약어 -->
<a :href="url"> ... </a>

<!-- shorthand with dynamic argument (2.6.0+) -->
<a :[key]="url"> ... </a>
```

<br>

### v-on 약어
```html
<!-- 전체 문법 -->
<a v-on:click="doSomething"> ... </a>

<!-- 약어 -->
<a @click="doSomething"> ... </a>

<!-- shorthand with dynamic argument (2.6.0+) -->
<a @[event]="doSomething"> ... </a>
```

<hr>
<br>

# computed와 watch
## computed 속성
> 템플릿 내에 표현식을 넣으면 편리하나 간단한 연산일 때만 이용하는 것이 좋다.

- 템플릿에서의 많은 연산은 코드를 비대하게 하고 유지보수를 어렵게 한다.
    ```html
    <!-- message를 역순으로 표시한다는 것을 알려면 코드를 분석해야한다. -->
    <!-- 이로 인하여, 복잡한 로직이라면 반드시 computed 속성을 사용해야 한다. -->
    <div id="example">
    {{ message.split('').reverse().join('') }}
    </div>
    ```

### 기본 예제
- 예제 코드
    ```html
    <div id="example">
    <p>원본 메시지: "{{ message }}"</p>
    <p>역순으로 표시한 메시지: "{{ reversedMessage }}"</p>
    </div>
    ```
    ```js
    var vm = new Vue({
    el: '#example',
    data: {
        message: '안녕하세요'
    },
    computed: {
        // 계산된 getter
        reversedMessage: function () {
        // `this` 는 vm 인스턴스를 가리킵니다.
        return this.message.split('').reverse().join('')
        }
    }
    })
    ```
    ```
    원본 메시지: "안녕하세요"
    역순으로 표시한 메시지: "요세하녕안"
    ```

- computed 속성인 reversedMessage를 선언하고, 이렇게 작성된 함수는 vm.reversedMessage 속성에 대한 getter 함수로 사용된다.
    ```js
    // vm.reversedMessage의 값은 항상 vm.message의 값에 의존한다.
    console.log(vm.reversedMessage) // => '요세하녕안'
    vm.message = 'Goodbye'
    console.log(vm.reversedMessage) // => 'eybdooG'
    ```

- 일반 속성처럼 computed 속성에도 템플릿에서 데이터 바인딩 할 수 있다.
  - Vue는 vm.reversedMessage가 vm.message에 의존하는 것을 알고 있으므로 vm.message가 바뀔 때 vm.reversedMessage에 의존하는 바인딩을 모두 업데이트한다.
  
  - 가장 중요한 것은 우리가 선언적으로(선언형 프로그래밍 방식에 따라서) 의존 관계를 만들었다는 것이다.
  
  - computed 속성의 getter 함수는 사이드 이펙트가 없어 코드를 테스트하거나 이해하기 쉽다.

<br>

### computed 속성의 캐싱 vs 메소드
> 표현식에서 메소드를 호출하여 같은 결과를 얻을 수 있다.

- computed 속성 대신 메소드와 같은 함수를 정의할 수도 있다.
  - 최종 결과에 대해 두 가지 접근 방식은 서로 동일하다. 차이점은 computed 속성은 종속 대상을 따라 저장(캐싱)된다는 것.
  
  - computed 속성은 해당 속성이 종속된 대상이 변경될 때만 함수를 실행한다.
  
  - 즉 message가 변경되지 않는 한, computed 속성인 reversedMessage를 여러 번 요청해도 계산을 다시 하지 않고 계산되어 있던 결과를 즉시 반환한다.
    ```html
    <p>뒤집힌 메시지: "{{ reversedMessage() }}"</p>
    ```
    ```js
    // 컴포넌트 내부
    methods: {
        reversedMessage: function () {
            return this.message.split('').reverse().join('')
        }
    }
    ```

  - Date.now()처럼 아무 곳에도 의존하지 않는 computed 속성의 경우 절대로 업데이트되지 않는다는 뜻이다.
    ```js
    computed: {
        now: function () {
            return Date.now()
        }
    }
    ```

- 단, 메소드를 호출하면 렌더링을 다시 할 때마다 항상 함수를 실행한다.

- 캐싱을 하지 않으면 정의한 computed 속성의 getter 함수를 꼭 필요한 것보다 더 많이 실행하게 되므로, 캐싱을 원하지 않는 경우 메소드를 사용하라.

<br>

### computed 속성 vs watch 속성
> Vue는 Vue 인스턴스의 데이터 변경을 관찰하고 이에 반응하는 보다 일반적인 watch 속성을 제공한다.

- 명령적인 watch 콜백보다 계산된 속성을 사용하는 것이 더 좋다.
  - watch 속성은 감시할 데이터를 지정하고 그 데이터가 바뀌면 이런 함수를 실행하라는 방식으로 소프트웨어 공학에서 이야기하는 ‘명령형 프로그래밍’ 방식이다.
  - computed 속성은 계산해야 하는 목표 데이터를 정의하는 방식으로 소프트웨어 공학에서 이야기하는 ‘선언형 프로그래밍’ 방식이다.
    ```html
    <div id="demo">{{ fullName }}</div>
    ```
    ```js
    // 이 코드는 명령형이며 코드를 반복한다. 아래의 computed 속성을 사용하는 방식과 비교해 볼 것
    var vm = new Vue({
        el: '#demo',
        data: {
            firstName: 'Foo',
            lastName: 'Bar',
            fullName: 'Foo Bar'
        },
        watch: {
            firstName: function (val) {
                this.fullName = val + ' ' + this.lastName
            },
            lastName: function (val) {
                this.fullName = this.firstName + ' ' + val
            }
        }
    })
    ```

    ```js
    // 일반적으로 선언형 프로그래밍이 명령형 프로그래밍보다 코드 반복이 적은 등 우수하다고 평가하는 경향이 존재
    var vm = new Vue({
        el: '#demo',
        data: {
            firstName: 'Foo',
            lastName: 'Bar'
        },
        computed: {
            fullName: function () {
                return this.firstName + ' ' + this.lastName
            }
        }
    })
    ```

<br>

### computed 속성의 setter 함수
> computed 속성은 기본적으로 getter 함수만 가지고 있지만, 필요한 경우 setter 함수를 만들어 쓸 수 있다.

- 예제
    ```js
    // ...
    computed: {
        fullName: {
            // getter
            get: function () {
                return this.firstName + ' ' + this.lastName
            },
            // setter
            set: function (newValue) {
                var names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        }
    }
    // ...
    // 이제 vm.fullName = 'John Doe'를 실행하면 설정자가 호출되고 vm.firstName과 vm.lastName이 그에 따라 업데이트 된다.
    ```

<hr>
<br>

## watch 속성
> 대부분의 경우 computed 속성이 더 적합하나 사용자가 작성한 watch가 필요하기도 하다.

- Vue는 watch 옵션을 통해 데이터 변경에 반응하는 일반적인 방법을 제공한다.
  - 이는 데이터 변경에 대한 응답으로 비동기식 또는 시간이 많이 소요되는 조작을 수행하려는 경우에 가장 유용하다.
    ```html
    <div id="watch-example">
      <p>
        yes/no 질문을 물어보세요:
        <input v-model="question">
      </p>
      <p>{{ answer }}</p>
    </div>
    <!-- 이미 Ajax 라이브러리의 풍부한 생태계와 범용 유틸리티 메소드 컬렉션이 있기 때문에, -->
    <!-- Vue 코어는 다시 만들지 않아 작게 유지됩니다. -->
    <!-- 이것은 이미 익숙한 것을 선택할 수 있는 자유를 줍니다. -->
    <script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>
    <script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script>
    <script>
    var watchExampleVM = new Vue({
      el: '#watch-example',
      data: {
        question: '',
        answer: '질문을 하기 전까지는 대답할 수 없습니다.'
      },
      watch: {
        // 질문이 변경될 때 마다 이 기능이 실행됩니다.
        question: function (newQuestion) {
          this.answer = '입력을 기다리는 중...'
          this.getAnswer()
        }
      },
      methods: {
        // _.debounce는 lodash가 제공하는 기능으로
        // 특히 시간이 많이 소요되는 작업을 실행할 수 있는 빈도를 제한합니다.
        // 이 경우, 우리는 yesno.wtf/api 에 액세스 하는 빈도를 제한하고,
        // 사용자가 ajax요청을 하기 전에 타이핑을 완전히 마칠 때까지 기다리길 바랍니다.
        // _.debounce 함수(또는 이와 유사한 _.throttle)에 대한
        // 자세한 내용을 보려면 https://lodash.com/docs#debounce 를 방문하세요.
        getAnswer: _.debounce(
          function () {
            if (this.question.indexOf('?') === -1) {
              this.answer = '질문에는 일반적으로 물음표가 포함 됩니다. ;-)'
              return
            }
            this.answer = '생각중...'
            var vm = this
            axios.get('https://yesno.wtf/api')
              .then(function (response) {
                vm.answer = _.capitalize(response.data.answer)
              })
              .catch(function (error) {
                vm.answer = '에러! API 요청에 오류가 있습니다. ' + error
              })
          },
          // 사용자가 입력을 기다리는 시간(밀리세컨드) 입니다.
          500
        )
      }
    })
    </script>
    ```

    - 결과
      ```
      yes/no 질문을 물어보세요:
      질문을 하기 전까지는 대답할 수 없습니다
      ```

- watch 옵션을 사용 시 프로세스
  - 비동기 연산 (API 엑세스) 수행

  - 사용자가 그 연산을 얼마나 자주 수행하는지 제한

  - 최종 응답을 얻을 때까지 중간 상태 설정 가능 *(계산된 속성은 이러한 기능을 수행할 수 없음)*

- watch 옵션 외에도 명령형 vm.$watch API를 사용할 수 있다.

<hr>
<br>