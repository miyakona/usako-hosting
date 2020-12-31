import * as functions from 'firebase-functions';
const { Nuxt } = require('nuxt');
const express = require('express');

/**
 * Hosting の準備
 */
const app = express();
const nuxtConfig = {
  dev: false,
  ssr: true,
  srcDir: '../.nuxt',
};

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
const nuxt = new Nuxt(nuxtConfig);
app.use(async (req: any, res: any) => {
  return await nuxt.render(req, res)
})
exports.ssrapp = functions.https.onRequest(app);

registerFunctions(functionList)