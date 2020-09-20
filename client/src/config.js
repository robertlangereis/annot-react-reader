// config.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
module.exports = {
  API_KEY: process.env.API_KEY,
  API_HOST: process.env.API_HOST
}
