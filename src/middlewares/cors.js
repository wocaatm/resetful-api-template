import cors from 'cors'

import config from 'config/index'

const { origin, credentials } = config.server.cors

//cors 配置设置 more Info https://github.com/expressjs/cors
const corsOptions = { origin, credentials}

export default cors(corsOptions)

