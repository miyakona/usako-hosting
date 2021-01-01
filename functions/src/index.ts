import * as functions from 'firebase-functions'
import * as express from 'express'
import { Configuration } from '@nuxt/types'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Nuxt } = require('nuxt')

/**
 * Hosting の準備
 */
const app = express()
const nuxtConfig: Configuration = {
  dev: false,
  ssr: true,
  srcDir: '../.nuxt',
}

/**
 * Functionsの準備
 */
interface FunctionListItem {
  key: string
  path: string
}

const functionList: FunctionListItem[] = [
  { key: 'NoticeTrashDay', path: './tasks/notice-trash-day' },
]

function registerFunctions(items: FunctionListItem[]): void {
  for (const item of items) {
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === item.key) {
      exports[item.key] = require(item.path)
    }
  }
}

/**
 * export
 */
const nuxt = new Nuxt(nuxtConfig)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(async (req: any, res: any) => {
  return await nuxt.render(req, res)
})
exports.ssrapp = functions.https.onRequest(app)

registerFunctions(functionList)
