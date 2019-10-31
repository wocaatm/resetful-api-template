import log4js from 'log4js'

import config from 'config/index'

function configure (filename, level, dir) {
    const defaultConfig = {
        appenders: {
            log: {
                type: 'file',
                filename: `${dir}/error.log`,
                layout: {
                    type:'pattern',
                    pattern: '[%d{yyyy-MM-dd hh.mm.ss}] [%p] [%h]: %m %n%n'
                }
            }
        },
        categories: {
            default: {
                appenders: ['log'],
                level: level
            }
        }
    }

    log4js.configure(defaultConfig)
}

const { level, dir } = config.logger

configure('error.log', level, dir)

const logger = log4js.getLogger('error')

export default logger