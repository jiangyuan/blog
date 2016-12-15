/**
 * 处理 文章 相关信息
 */


'use strict';
const path = require('path');
const fs = require('fs-extra');
const conf = require('../config');
const parseArticle = require('./parse-article');

function parseMdList(c) {
  return fs.readdirSync(c.source).filter((item) => {
    return /^[^.].+\.md$/.test(item); // .md 结尾并且不是 . 开头的文件
  }).map((item) => {
    return path.join(c.source, item);
  });
}


function parse(config) {
  config = config || conf;
  let meta = config.meta = {};
  meta.mdList = parseMdList(config);

  // const data =
  parseArticle(config).then();
  return {
    index: [],
    article: {}
  }
}
parse();
module.exports = parse;

