import { FunctionBase } from './function-base'
import * as functions from 'firebase-functions'

module.exports = functions.pubsub
  .schedule('0 19 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    const dt = new Date()
    dt.setDate(dt.getDate() + 1)
    const comment = []

    // 翌日が第何週目かを求める
    const isTheWhatWeekly = Math.floor((dt.getDate() - 1) / 7) + 1
    switch (dt.getDay()) {
      // 月
      case 1:
        comment.push('可燃ごみ')
        break
      // 火
      case 2:
        if (isTheWhatWeekly === 2 || isTheWhatWeekly === 4) {
          comment.push('不燃ごみ')
        }
        break
      // 水
      case 3:
        comment.push('資源プラスチック')
        break
      // 木
      case 4:
        comment.push('可燃ごみ')
        break
      // 土
      case 6:
        comment.push('古紙・ペットボトル・飲食用びん,かん')
        break
      default:
        comment.push('明日はなし')
        break
    }

    // ごみの日じゃない場合は何もしない
    if (comment.length < 1) {
      return
    }

    await FunctionBase.notifyLine(
      `明日は ${comment.join('、')} のゴミの日だよ！\n準備忘れずに！`
    )

    return 0
  })
