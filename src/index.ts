import { config } from '../configs'
import { TelegramBotClient } from './TelegramBotClient'
import { logger } from './logger'

const telegramBotClient = new TelegramBotClient(config.telegram)

try {
  telegramBotClient.startPolling(updates => console.log(JSON.stringify(updates)))
} catch (e) {
  logger.error('Something went wrong!', e)
}
