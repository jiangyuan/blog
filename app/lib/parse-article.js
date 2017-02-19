/**
 * 读取 md ，处理各种数据形式
 */

'use strict';

// 文章数据
// {
//   title: 'string', // 标题
//   content: 'string', // 全文，html 字符串
//   brief: 'string', // 简介，html 字符串 <!-- more -->
//   date: 'string', // 发布日期
//   id: 'string', // 文件名
//   keywords: 'string', // keywords
//   description: 'string', // description
//   md: 'string', // md 内容
//   mdBrief: 'string', // md 简介
//   tags: [] // array，标签
// }


const fs = require('fs-extra');
const path = require('path');
const parseArticleMeta = require('./parse-article-meta');
const parseArticleMd = require('./parse-article-md');

function readMd(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, content) => {
      if (err) {
        return reject({
          msg: `读取 ${path} 出错`,
          error: err
        });
      }

      resolve(content);
    })
  });
}

function getArticleId(filePath) {
  return path.basename(filePath).replace(/\.md$/, '');
}


function getContent(mdList) {
  let files = [];

  mdList.forEach((filePath) => {
    files.push(readMd(filePath));
  });


  return Promise.all(files);
}


function parseArticle(config) {
  const meta = config.meta;
  let data = config.data = [];

  return getContent(meta.mdList)
    .then((contentList) => {
      // let r = parseArticleMeta(ret[0]);
      // console.log(r, getArticleId(getArticleId(meta.mdList[0])));

      contentList.forEach((content, i) => {
        let dataMeta = parseArticleMeta(content);
        Object.assign(dataMeta, parseArticleMd(dataMeta));
        dataMeta.id = getArticleId(meta.mdList[i]);
        data.push(dataMeta);
      });

      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}


module.exports = parseArticle;
