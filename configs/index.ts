const configs = require('./configs')
const secrets = require('./secrets')

import * as _ from 'lodash'

export interface ConfigType {
  telegram: {
    url: string,
    bot_token: string,
    pollingOptions: object
  }
}

export const config: ConfigType = _.merge({}, configs, secrets)
