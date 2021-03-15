module.exports = {
  // 开发环境
  dev: {
    NODE_ENV: 'development',
    BASE_API: 'https://oa2.testing.996110.com.cn/api'
  },
  // 测试环境
  test: {
    NODE_ENV: 'test',
    BASE_API: 'https://api.testing.996110.com/api'
  },
  // 生产环境
  pro: {
    NODE_ENV: 'production',
    BASE_API: 'https://api.996110.com/api'
  }
}
