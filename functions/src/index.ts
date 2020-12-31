import * as functions from 'firebase-functions';
const { Nuxt } = require('nuxt');
const express = require('express');

const app = express();
const config = {
    dev: false,
    ssr: true,
    srcDir: '../.nuxt',
  };

const nuxt = new Nuxt(config);
app.use(async (req: any, res: any) => {
  return await nuxt.render(req, res)
})
exports.ssrapp = functions.https.onRequest(app);