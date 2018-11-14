const fs = require('fs-extra')
const config = require('../config')
const path = require('path')

module.exports = {
  writeArticle (meta) {
    const articlePath = path.resolve(config.dist, 'article')
    const articleFileName = path.resolve(articlePath, `${meta.id}.json`)
    fs.outputJson(articleFileName, meta)
    // .catch((err) => {
    //   console.log(err)
    // })
  }
}
