const Events = require('./events')
const write = require('./write')

Events.on('parse-article-meta', (meta) => {
  write.writeArticle(meta)
})
