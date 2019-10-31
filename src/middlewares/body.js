import bodyParser from 'body-parser'
import { Router } from 'express'
import config from 'config/index'

const { jsonBodyLimit } = config.server.request

const router = Router()

router.use(bodyParser.json())

router.use(bodyParser.urlencoded({ parameterLimit: jsonBodyLimit, extended: true}))

export default router
