
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-form-builder.cjs.production.min.js')
} else {
  module.exports = require('./react-form-builder.cjs.development.js')
}
