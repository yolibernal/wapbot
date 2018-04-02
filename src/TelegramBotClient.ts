import * as request from 'request-promise'

class TelegramBotClient {

  private url: string
  private botToken: string
  private pollingOptions: object
  private offset: number = 0

  constructor(config) {
    const { url, bot_token, polling_options } = config
    this.url = url
    this.botToken = bot_token
    this.pollingOptions = polling_options
  }

  public startPolling(updateHandler) {

    return this.polling(updateHandler)
  }

  private async polling(updateHandler) {

    const pollingOptions = Object.assign({}, this.pollingOptions, { offset: this.offset })
    const updates = await this.getUpdates(pollingOptions)
    updateHandler(updates)
    return this.polling(updateHandler)
  }


  // API METHODS

  public getMe() {

    return this.request('getMe')
  }

  public async getUpdates(params) {

    const updates = await this.request('getUpdates', params)
    updates.result.forEach(update => this.offset = update.update_id + 1)
    return updates
  }


  // REQUEST

  private request(apiMethod: string, params?, options?) {

    const defaultOptions = {
      uri: `${this.url}/bot${this.botToken}/${apiMethod}`,
      json: true,
      forever: true,
      simple: false
    }

    const requestOptions = Object.assign({}, defaultOptions, options)
    if (params) requestOptions.body = params

    return request.post(requestOptions)
  }
}

export { TelegramBotClient }
