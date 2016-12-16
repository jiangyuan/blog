/**
 * 将 md 转为 html 字符串
 */

'use strict';

const Remarkable = require('remarkable');
const parser = new Remarkable();

function parseArticleMd(d) {
  let ret = {};

  try {
    ret.content = parser.render(d.md);
    ret.brief = parser.render(d.mdBrief);
  } catch(ex) {
    console.log('parse-article-md', ex);
  }

  return ret;
}

module.exports = parseArticleMd;
