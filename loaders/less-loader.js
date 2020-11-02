
const less = require('less')
// 可以做，但没必要
module.exports = function (source) {
  less.render(source, (error, { css }) => {
    this.callback(error, css)
  })
}