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
    return /^[^.].+\.md$/.test(item); // 过滤掉 . 开头的文件
  }).map((item) => {
    return path.join(c.source, item);
  });
}


function parse(config) {
  config = config || conf;
  let meta = config.meta = {};
  meta.mdList = parseMdList(config);
  console.log(config);
  // const data =
  parseArticle(config);
  return {
    index: [],
    article: {}
  }
}

parse();

