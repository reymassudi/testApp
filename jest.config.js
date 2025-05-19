module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',

    // فایل‌های SVG که با SVGR به کامپوننت تبدیل می‌شن
    '\\.svg$': '<rootDir>/__mocks__/svgrMock.js',

    // فایل‌های استاتیک دیگه
    '\\.(png|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.js',

    // استایل‌ها
    '\\.(css|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
