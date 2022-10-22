const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 載入腳本資料
const urlshortenerSchema = new Schema({
  origin_url: {
    type: String,
    required: true
  },
  shorten_url: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('URL_shortener', urlshortenerSchema)