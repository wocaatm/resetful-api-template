import express from 'express'

import Promise from 'bluebird';

import config from 'config/index'

import helmet from 'middlewares/security'

import cors from 'middlewares/cors'

import body from 'middlewares/body'

import notFound from 'middlewares/404'

import errorHandle from 'middlewares/error.js'

import router from 'routers/index'

import logger from 'lib/logger'

/* 修改全局的Promise */
global.Promise = Promise;

let app = express()

/* 通过请求头控制express应用的安全 */
app.use(helmet)

/* CORS 跨域设置 */
app.use(cors)

/* body-parser解析body */
app.use(body)

/* 统一处理py传过来的userId */
// app.use(); 根据业务实现自己的用户登陆中间件

/* 路由信息 */
router(app)

/* 404中间件 */
app.use(notFound)

/* 错误处理 */
app.use(errorHandle)

app.set('port', config.server.PORT || 8001)

app.listen(app.get('port'), function(){
    console.log('app listen on port ' + app.get('port'))
})

/* 捕获未知的全局错误 */
process.on('uncaughtException', (err) => {
    logger.error('uncaughtException Global: %s', err.stack)
    if (config.debug) {
        console.log('uncaughtException Global: %s', err.stack)
    }
    process.exit(1)
})