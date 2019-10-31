import { normalize } from 'lib/error'

import logger from 'lib/logger'

import config from 'config/index'

//错误处理函数 处理中间件的错误
export default (err, req, res, next) => {
    const ne = normalize(err)
    const { errno, errorMsg, unexpected } = ne
    if (unexpected) {
        logger.error('unexpectly failed to request %s: %s', req.originalUrl, unexpected.message)
        if (config.debug) {
            console.log('Uncaught error in express: %s', unexpected.message)
            console.log(unexpected)
        }
    }
    res.json({errno, errorMsg})
}