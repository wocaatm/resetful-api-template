import config from 'config/index'
import { iteratorObj } from 'lib/util'

/**
 * @description {抛出异常}
 * @param       {...[type]}     args [错误码，错误信息]
 */
export default function throws(...args) {
  throw create(...args)
}

/**
 * @description {返回一个符合自己编著的Error对象}
 * @param       {Number}        errno    [错误码]
 * @param       {String}        errorMsg [错误信息]
 * @return      {Object}                 [返回一个Error对象]
 */
export function create(errno, errorMsg) {
    const err = new Error(errorMsg)
    err.errno = errno
    return err
}

/**
 * @description {分析解构程序抛出的错误}
 * @param       {Object}        err [Error 对象]
 * @return      {[type]}            [{errno: 错误码，errorMsg: 错误信息，unexpected: 程序 uncaught error}]
 */
export function normalize(err) {
    //解析手动throws抛出的错误
    if (err.errno && err.message) {
        return {
            errno: err.errno,
            errorMsg: err.message
        }
    } else {
        let errno,
            errorMsg = '',
            unexpected
        if (err.name === 'UnauthorizedError') {
            //token验证错误
            errno = 401
            errorMsg = '授权token不正确'
        } else if (err.name === 'ValidationError') {
            //数据库验证失败
            errno = 400
            if (err.errors) {
                for (let e of iteratorObj(err.errors)) {
                    //e instanceof Array true
                    errorMsg += e[1].message + ' '
                }
            }
        } else if (err.name === 'CastError') {
            //ObjectId 错误
            errno = 400
            errorMsg = '参数都被你改了，还想看内容的咯？'
        } else {
            //没有捕获的未知错误
            unexpected = err
            errno = 500
            errorMsg = '系统内部发生错误，请稍后再试'
        }

        //debug
        if (config.debug) {
            console.log(err.message)
            //处理错误调用栈的错误未知 需要获取错误文件行数 todo
        }

        return { errno, errorMsg, unexpected }
    }
}