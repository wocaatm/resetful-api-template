import config from 'config/index'

let { apiPrefix } = config.server

/* 加载所有控制器 */
export default (app) => {
    // 路由测试
    app.use(`${apiPrefix}/`, require('./test/index').default);
}