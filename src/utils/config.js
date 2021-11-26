module.exports = {
  'mock': {
    baseUrl: '/dev-api',
    mockUrl: 'https://mock.xwhx.top'
  },
  'local': {
    baseUrl: '/dev-api',
    mockUrl: 'http://localhost:3210'
  },
  'development': {
    baseUrl: '/qc_web',
    mockUrl: 'http://182.92.2.167:8200',
  },
  'production': {
    baseUrl: 'http://182.92.2.167:8200',
    mockUrl: 'http://182.92.2.167:8200'
  }
}
