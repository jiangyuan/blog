/**
 * lib/parse-article-meta 单元测试
 * @author jero
 * @date 2016-12-15
 */

const ex = `
<!--meta
title: babel
date: 2016-08-13 16:19:54
tags: babel, es6, fis
-->


最近总算有点时间能系统的梳理下 \`babel\` 。入门或者使用手册什么的直接查看“<a href="#wafaha">参考文章</a>”即可，我只说说我的理解。

<!-- more -->

## 插件
`
const parseArticleMeta = require('../app/lib/parse-article-meta')

describe('parseArticleMeta', () => {
  it('parse', () => {
    console.log(parseArticleMeta(ex))
  })
})
