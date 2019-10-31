import { create } from 'lib/error'

//404处理
export default (req, res, next) => {
    next(create(404, 'Not Found'))
}
