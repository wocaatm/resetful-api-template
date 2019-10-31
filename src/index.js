process.env.NODE_PATH = __dirname

/* 设置src为一个module加载目录 */
require('module').Module._initPaths();

/* web服务 */
require('server')