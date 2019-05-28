const json2md = require('json2md')

module.exports = ({ content }) => {
  return `${json2md(content)}`
}
