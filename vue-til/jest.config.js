module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  // testMatch가 존재하지 않으면 root -> tests/ 폴더 하위에 입력한다.
  testMatch: [
    '<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
};
