// 總路由設定
const express = require('express')
const router = express.Router()
const URL_shortener = require('../models/url_shortener')
const generateCode = require('../utilities/generateCode')
const mainUrl = 'http://localhost:'
const PORT = process.env.PORT || 3000

// 渲染開始的畫面
router.get('/', (req, res) => {
  res.render('index')
})

// 取出input輸入的原始網址
router.post('/', (req, res) => {
  const newUrl = req.body.url
  // 設定一個空的字串存放待會找出的資料
  let urlShorten = ''

  URL_shortener.findOne({ origin_url: newUrl }) // 先取出所有的資料
    .lean()
    .then((urlData) => {
      if (urlData) {
        urlShorten = urlData.shorten_url
        return
      } else {
        // 如果以上都是false，代表本來的資料庫沒有這筆資料，那就製造一個新的短網址
        urlShorten = `${mainUrl}${PORT}/${generateCode()}`
      }
      // 最後再用create()替資料庫新增這筆資料
      return URL_shortener.create({
        origin_url: newUrl,
        shorten_url: urlShorten
      })
    })
    .then(() => res.render('show', { urlShorten }))
    .catch(err => {
      console.log(err)
      res.render('error', { errorMsg: err.message })
    })
})

//用動態路由去抓到短網址後面的五碼字母，再返回資料庫去找尋原始網址，並用redirect導向網站
router.get('/:shorten', (req, res) => {
  const shortenCode = req.params.shorten

  URL_shortener.findOne({ shorten_url: `${mainUrl}${PORT}/${shortenCode}` })
    .lean()
    .then((url) => {
      if (url) {
        console.log(url)
        return res.redirect(url.origin_url)
      } else {
        return res.redirect('/')
      }
    })
    .catch(error => console.log(error))
})

module.exports = router