// config.js
// if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
// }

// const { REACT_APP_API_KEY, NODE_ENV, REACT_APP_API_HOST  } = process.env;



module.exports = {
  API_KEY: process.env.REACT_APP_API_KEY,
  API_HOST: process.env.REACT_APP_API_HOST
}
