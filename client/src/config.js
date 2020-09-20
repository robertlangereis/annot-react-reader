// config.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
module.exports = {
  key: process.env.KEY
}
