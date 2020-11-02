// 可以做，但没必要
module.exports = function (source) {
  return `let tag = document.createElement('style')
  tag.innerHTML = ${source}
  document.head.appendChild(tag)`
}