import { Router } from 'express'

import throws, { normalize } from './error'

import config from 'config/index'

import logger from './logger'

import { isPlainObject, formatArgs } from './util'

/**
 * 控制器类，这个类是在其他中间件处理之后调用的，是一个请求的终点
 */
export default class Controller {
    _router

    constructor () {
        this._router = Router()
    }

    register (method, ...routers) {
        routers = routers.map((router) => {
            if (typeof router !== 'function') return router
            return async (req, res, next) => {
                try {
                    const orignialURL = req.originalUrl

                    let responseBody,
                        unexpectedError

                    try {
                        responseBody = await router(req, res)
                    } catch (e) {
                        const ne = normalize(e)
                        const { errno, errorMsg , unexpected } = ne
                        if (unexpected) unexpectedError = unexpected
                        responseBody = { errno, errorMsg }
                    }

                    if (unexpectedError) {
                        let requestArgs = formatArgs(req)
                        logger.error('unexpectly failed to request %s: %s. %s', orignialURL, unexpectedError.message, requestArgs)
                        if (config.debug) {
                            console.log('Uncaught error in controller: %s', unexpectedError.message)
                            console.log(unexpectedError)
                        }
                    }

                    if (isPlainObject(responseBody)) return res.json(responseBody)

                    return res.send(responseBody)
                    
                } catch (e) {
                    /* 传入错误处理中间件 */
                    next(e)
                }
            }
        })

        this._router[method](...routers)
    }

    get router () {
        return this._router
    }
}