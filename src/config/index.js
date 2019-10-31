export default {
  debug: process.NODE_ENV !== 'production',
  server: {
    PORT: 3000,
    IP: process.env.IP || '0.0.0.0',
    apiPrefix: '',
    request: {
      sonBodyLimit: 10000
    },
    cors: {
      origin: true,
      credentials: true
    }
  },
  db: {
    // need modify
    dev: {
      database: '',
      username: '',
      password: '',
      host: '',
      port: '',
    },
    // env config
    prod: {
      database: '',
      username: '',
      password: '',
      host: '',
      port: '',
    },
  },
  logger: {
    file: true,
    level: 'ERROR',
    dir: 'log'
  },
}
