// id <input>에 이메일을 입력했을 때 이메일이 맞는지 확인하는 로직
// id, pw가 맞는 경우에 로그인 처리가 되고, 다음 페이지로 이동
// 테스트코드는 직접 값을 넣거나 프로세스를 진행하지 않아도 기능이 정상 작동한다는 보장을 받을 수 있다.
// import { sum } from './math';

// sum(10, 20); // 30

// // 연관된 테스트 케이스를 그룹화하는 API
// describe('math.js', () => {
//   // 하나의 테스트 케이스를 검증하는 API
//   test('10 + 20 = 30', () => {
//     const result = sum(10, 20);
//     // 기대되는 값의 실제 값 : 옳은 값 말고 틀린 값을 검증하는 것이 좋음
//     // expect(result).toBe(15);
//     expect(result).not.toBe(30);
//   });
// });

// 테스트 유틸을 사용하면 Vue를 import하고 복잡하게 작성하지 않아도 한번에 테스트할 수 있다.
import { shallowMount } from '@vue/test-utils';
// import Vue from 'vue';
import LoginForm from './LoginForm.vue';

// 컴포넌트가 그룹의 최소 단위
describe('LoginForm.vue', () => {
  /*0*/
  //   test('컴포넌트가 마운팅 되면 username은 존재하고 초기 값으로 설정되어 있어야 한다.', () => {
  //     /*1*/
  //     // const instance = new Vue(LoginForm).$mount();
  //     // expect(instance.username).toBe('');
  //     /*2*/
  //     const wrapper = shallowMount(LoginForm);
  //     expect(wrapper.vm.username).toBe('');
  //   });
  /*3*/
  //   test('ID는 이메일 형식이어야 한다.', () => {
  //     const wrapper = shallowMount(LoginForm, {
  //       data() {
  //         return {
  //           username: 'test@abc.com',
  //         };
  //       },
  //     });
  //     // 특정 요소를 쫓아감
  //     const idInput = wrapper.find('#username');
  //     console.log('인풋 박스 태그 값', idInput.html());
  //     console.log('인풋 박스의 값', idInput.element.value);
  //     console.log(wrapper.vm.isUsernameValid);
  //   });
  /*4*/
  test('ID가 이메일 형식이 아니면 경고 메세지가 출력된다.', () => {
    const wrapper = shallowMount(LoginForm, {
      data() {
        return {
          username: 'test',
        };
      },
    });
    // 템플릿 태그 내부에 있는 html 요소들을 찾음
    const warningText = wrapper.find('.warning');
    // console.log(warningText.html());
    expect(warningText.exists()).toBeTruthy();
  });

  test('ID와 PW가 입력되지 않으면 로그인 버튼이 비활성화 된다.', () => {
    const wrapper = shallowMount(LoginForm, {
      data() {
        return {
          username: 'a',
          password: '1234',
        };
      },
    });
    // 템플릿 태그 내부에 있는 html 요소들을 찾음
    const button = wrapper.find('.btn');
    // console.log(warningText.html());
    expect(button.element.disabled).toBeTruthy();
  });
});
