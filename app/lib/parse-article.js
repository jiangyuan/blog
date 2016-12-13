/**
 * 读取 md ，处理各种数据形式
 */

'use strict';

const fs = require('fs-extra');

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


function getContent(mdList) {
  let files = [];

  mdList.forEach((filePath) => {
    files.push(readMd(filePath));
  });

  console.log(files);

  return Promise.all(files);
}


function parseArticle(config) {
  const meta = config.meta;

  return getContent(meta.mdList)
    .then((ret) => {
      console.log(ret);
    })
    .catch((err) => {
      console.log(err);
    });
}


module.exports = parseArticle;
