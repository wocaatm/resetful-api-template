import util from 'util'

/**
 * @description 判断是否是普通的javascript函数
 * @param       mixed        obj [判断的对象]
 * @return      {Boolean}           [返回true or false]
 */
export function isPlainObject (obj) {
    return obj && typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype
}

/**
 * @description 让plain Obj 能够for of 循环 避免查找原型链上的属性
 * @param       {[Object]}        obj [一个 plain Object]
 * @return      {[Object]}        返回能够for of 遍历的对象
 */
export function iteratorObj (obj) {
    obj[Symbol.iterator] = function* () {
        for (let k of Object.keys(obj)) {
            yield [k, obj[k]]
        }
    }

    return obj
}

/**
 * @description 判断对象是否是空对象
 * @param       {Object}        obj [传入对象]
 * @return      {Boolean}           [true 空对象  false 不是空对象]
 */
export function isEmptyObject (obj) {
    var obj = iteratorObj(obj)
    for (let keyValue of obj) {
        if (k) return false
    }

    return true
}

/**
 * @description 合并对象
 * @param       {Object}        target  [目标对象]
 * @param       {Object}        options [覆盖对象]
 * @param       {Boolean}       newFlag [直接覆盖还是返回一个新对象, 默认直接覆盖]
 * @return      {Object}                [合并的对象]
 */
export function assign(target, options, newFlag) {
    var options = iteratorObj(options)

    for (var [k, v] of options) {
        if (target[k] === undefined) continue
        if (isPlainObject(v) && isPlainObject(target[k])) {
            assignObj(target[k], options[k])
        } else if (!isPlainObject(v) && !isPlainObject(target[k])) {
            target[k] = v
        }
    }

    if (newFlag) {
        return target
    }
}

/**
 * @description 获取数组前后变化增加的元素和减少的元素
 * @param       {Array}        before [变换之前的数组]
 * @param       {Array}        after  [变换之后的数组]
 * @return      {Object}               [{increase: 增加的元素, reduce: 减少的元素}]
 */
export function getArraytransform (before, after) {
    if (!Array.isArray(before) || !Array.isArray(after)) return false

    let union = new Set([...before, ...after])
    
    let increase = new Set([...union].filter(x => !before.has(x)))

    let reduce = new Set([...union].filter(x => !after.has(x)))

    return {
        increase,
        reduce
    }
}

/**
 * @description {格式化请求参数}
 * @param       {Object}        req [express 请求对象]
 * @return      {String}            [格式化后的请求参数]
 */
export function formatArgs (req) {
    let format = [req.body, req.params, req.query]
    let stringifyFormat = format.map((item) => {
        if (isPlainObject(item)) return JSON.stringify(item)
    })
    return util.format('request arguments: body-->%s, params-->%s, query-->%s', ...stringifyFormat)
}

/**
 * @description {产生指定位数的code}
 * @param       {Number}        count [code位数]
 * @return      {Number}              [code码]
 */
export function createCode (count) {
    let code = ''
    for (let i = 0; i < count; i++) {
        code += Math.floor(Math.random() * 10)
    }

    return parseInt(code)
}

/**
 * @description {{检测是否为数组}}
 * @param       {mixed}        value [检测值]
 * @return      {mixed}              [返回数组或者false]
 */
export function checkNumber (value) {
    let valueInt = parseInt(value)
    if (typeof valueInt !== 'number' || Object.is(NaN, valueInt)) {
        return false
    }
    return valueInt
}

/**
 * @description {{获取时间间隔}}
 * @param       {...[mixed]}     args [Date对象, 或者年，月，日]
 * @return      {Object}             [返回时间间隔对象]
 */
export function getTimeRange (...args) {
    let length = args.length,
        rangeType,
        date,
        rangeStart,
        rangeEnd

    if (!length) {
        console.log('缺少必要参数')
        return
    } else if (length === 1) {
        if (typeof args[0] === 'object' && args[0] instanceof Date) {
            let time = args[0],
                year = time.getFullYear(),
                month = time.getMonth(),
                day = time.getDate()
                
            rangeType = 3
            date = new Date(year, month, day)
            rangeStart = date.getTime()
        } else {
            rangeType = 1
            date = new Date(args[0], 0)
            rangeStart = date.getTime()
        }
    } else if (length === 2) {
        rangeType = 2
        date = new Date(...args)
        rangeStart = date.getTime()
    }

    if (rangeType === 1) {
        date.setYear(date.getFullYear() + 1)
    } else if (rangeType === 2) {
        date.setMonth(date.getMonth() + 1)
    } else if (rangeType === 3) {
        date.setDate(date.getDate() + 1)
    }

    rangeEnd = date.getTime()

    return {rangeStart, rangeEnd}
}