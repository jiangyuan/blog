/**
 * 从 md 的内容中取出文章的信息
 */

'use strict';

const ex = `
<!--meta
title: babel
date: 2016-08-13 16:19:54
tags: babel, es6, fis
-->


最近总算有点时间能系统的梳理下 \`babel\` 。入门或者使用手册什么的直接查看“<a href="#wafaha">参考文章</a>”即可，我只说说我的理解。

<!-- more -->

## 插件
`;
const rMore = /([\s\S]+)<!--\s*more\s*-->([\s\S]+)/;
const rMeta = /<!--meta([\s\S]+)-->/;

// 文章数据
// {
//   title: 'string', // 标题
//   content: 'string', // 全文
//   brief: 'string', // 简介， <!-- more -->
//   date: 'string', // 发布日期
//   id: 'string', // 文件名
//   keywords: 'string', // keywords
//   description: 'string', // description
//   md: 'string', // md 内容
//   mdBrief: 'string', // md 简介
//   tags: [] // array，标签
// }

function parseMeta(brief) {
  let ret = {};
  const resolveHandles = {
    date: (v) => {
      return v.split(' ')[0];
    },
    tags: (v) => {
      return v.split(/,\s*/);
    }
  }
  let temp = rMeta.exec(brief) || [];

  if (!temp[1]) {
    return ret;
  }

  temp = temp[1].trim().split(/(\r|\r\n|\n)/) || [];

  temp.forEach((line) => {
    if (line.trim()) {
      line = line.split(':');
      const k = line[0].trim();
      const v = line[1].trim();

      ret[k] = resolveHandles[k] ? resolveHandles[k](v) : v;
    }
  });

  return ret;
}

/**
 * md 是原始 markdown 内容
 */
function parseArticleMeta(md) {
  let ret = {};
  const temp = rMore.exec(md) || [];
  ret.md = md;
  ret.mdBrief = temp[1] || '';

  Object.assign(ret, parseMeta(ret.mdBrief));

  return ret;
}

// parseArticleMeta(ex);

module.exports = parseArticleMeta;
