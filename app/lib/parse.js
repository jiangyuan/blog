/**
 * 处理 文章 相关信息
 */

'use strict'
const path = require('path')
const fs = require('fs-extra')
const conf = require('../config')
const parseArticle = require('./parse-article')
require('./events-on')

function parseMdList (c) {
  return fs.readdirSync(c.source).filter((item) => {
    return /^[^.].+\.md$/.test(item) // .md 结尾并且不是 . 开头的文件
  }).map((item) => {
    return path.join(c.source, item)
  })
}

function getTime (date) {
  return (new Date(date)).getTime()
}

function getDateOrder (rawList) {
  return rawList.sort((a, b) => {
    return getTime(b.date) - getTime(a.date)
  })
}

/**
 * 获取翻页列表
 * 固化翻页，尽量少的改变缓存
 * * 常规思路如果一共 3 页，合成 2 页，第一页 1-10， 第二页 11 - 29
 * * 常规思路如果是 4 页，合成 3 页，第一页 1-10， 第二页 11-20 ，第三页 21-39
 * @param {*} list
 */
function getArticle (list) {
  let ret = []
  const len = list.length
  const pageNumber = Math.ceil(len / conf.numPerPage)
  const reverseList = list.reverse()
  for (let i = 0; i < pageNumber; i++) {
    ret.push(reverseList.slice((i * conf.pageNumber), (i + 1) * conf.pageNumber))
  }

  const l = ret.length
  if (l >= 2) {
    const temp = ret[l - 2].concat(ret[l - 1]) // 合并最后两页
    ret.splice(l - 2, 2)
    ret.push(temp)
  }

  return ret
}

function parse (config) {
  config = config || conf
  let ret = {}
  let meta = config.meta = {}
  meta.mdList = parseMdList(config)

  // const data =
  return parseArticle(config)
    .then((data) => {
      ret.rawList = data
      const l = ret.dateOrderList = getDateOrder(data)
      ret.article = getArticle(l)
      return ret
    })
  // {
  //   map: {}, // 文章的 key - value
  //   tags: {
  //     'key': [[], []]  // 该标签下所有文章，按时间顺序分页
  //   },
  //   article: [[], []], // 所有文章，按时间顺序分页
  //   rawList: [], // 原始数据
  //   dateOrderList: [], // 按时间顺序排列
  // }
}

parse()
// module.exports = parse
