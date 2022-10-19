const mongoose = require('mongoose')
const Schema = mongoose.Schema
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