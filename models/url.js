const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  origin_url: {
    type: String,
    required: true
  },
  shorten_url: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('URL', urlSchema)