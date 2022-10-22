// 總路由設定
const express = require('express')
const router = express.Router()
const URL_shortener = require('../models/url_shortener')
const generateCode = require('../utilities/generateCode')
const mainUrl = 'http://localhost:'
const port = 3000

// 渲染開始的畫面
router.get('/', (req, res) => {
  res.render('index')
})

// 取出input輸入的原始網址
router.post('/', (req, res) => {
  const newUrl = req.body.url
  // 設定一個空的字串存放待會找出的資料
  let urlShorten = ''

  URL_shortener.find() // 先取出所有的資料
    .lean()
    .then((urlList) => {
      // 使用find()過濾每一筆資料，先確認原本的資料庫有沒有這筆網址，如果有的話就不要重新製造新的短網址
      urlShorten = urlList.find((eachUrl) => eachUrl.origin_url === newUrl)
      // 如果是true，那就以這筆資料的短網址渲染頁面
      if (urlShorten) {
        urlShorten = urlShorten.shorten_url
        return res.render('show', { urlShorten })
      } else {
        // 如果以上都是false，代表本來的資料庫沒有這筆資料，那就製造一個新的短網址
        urlShorten = `${mainUrl}${port}/${generateCode()}`
      }
      // 雖然短網址是用亂數產生，但避免會重複，所以再設一個條件式
      while (urlList.some((eachUrl) => eachUrl.shorten_url === urlShorten)) {
        urlShorten = `${mainUrl}${port}/${generateCode()}`
      }
      // 最後再用create()替資料庫新增這筆資料
      return URL_shortener.create({
        origin_url: newUrl,
        shorten_url: urlShorten
      })
    })
    .then(() => res.render('show', { urlShorten }))
    .catch(error => console.log(error))
})

//用動態路由去抓到短網址後面的五碼字母，再返回資料庫去找尋原始網址，並用redirect導向網站
router.get('/:shorten', (req, res) => {
  const shortenCode = req.params.shorten
  URL_shortener.find({})
    .lean()
    .then((urlList) => {
      url = urlList.find((eachUrl) => eachUrl.shorten_url === `${mainUrl}${port}/${shortenCode}`)
      if (url) {
        console.log(url)
        return res.redirect(url.origin_url)
      }
    })
    .catch(error => console.log(error))
})

module.exports = router