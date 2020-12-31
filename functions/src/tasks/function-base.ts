import * as functions from 'firebase-functions'
import { Client, Message } from '@line/bot-sdk'
import { SecretManager } from './secret-manager'

export class FunctionBase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async notifyLine(messageText: string): Promise<any> {
    if (
      functions.config().app.env !== 'production' &&
      !functions.config().app.is_notify
    ) {
      console.log(
        `It did not notify on LINE. It was send this message: \n${messageText}`
      )
      return
    }

    const message: Message = {
      type: 'text',
      text: messageText,
    }

    const secretManager = new SecretManager()
    const channelAccessToken = await secretManager.getValue(
      'LINE_CHENNEL_ACCESS_TOKEN'
    )
    const userId1 = await secretManager.getValue('LINE_USER_ID_1')
    const userId2 = await secretManager.getValue('LINE_USER_ID_1')

    const line = new Client({ channelAccessToken: channelAccessToken })
    line.pushMessage(userId1, message)
    line.pushMessage(userId2, message)
  }
}
