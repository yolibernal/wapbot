import { config } from '../configs'
import { TelegramBotClient } from './TelegramBotClient'
import { logger } from './logger'
import * as say from 'say'

const telegramBotClient = new TelegramBotClient(config.telegram)

try {
  telegramBotClient.startPolling((updates) => {
    updates.result.forEach((update) => {
      console.log(JSON.stringify(update.message, null, 2))
      say.speak(update.message.text)
    })
  })
} catch (e) {
  logger.error('Something went wrong!', e)
}
