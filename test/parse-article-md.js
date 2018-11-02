/**
 * lib/parse-article-md 单元测试
 * @author jero
 * @date 2016-12-15
 */

const parse = require('../app/lib/parse-article-md')
const data = require('./_data')

describe('parseArticleMd', () => {
  it('parse', () => {
    console.log(parse(data.data))
  })
})
