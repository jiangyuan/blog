/**
 * 处理 文章 相关信息
 */

'use strict'
const path = require('path')
const fs = require('fs-extra')
const conf = require('../config')
const parseArticle = require('./parse-article')

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

function getArticle (list) {
  let ret = []
  const len = list.length
  const pageNumber = Math.ceil(list / conf.numPerPage)
  for (let i = 1; i <= pageNumber; i++) {
    ret.push(list.slice((len - i * conf.pageNumber) - (len - (i - 1) * conf.pageNumber)))
  }

  // 最近的一页总是 10-19 之间
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
