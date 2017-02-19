/**
 * 从 md 的内容中取出文章的信息
 */

'use strict';

// keywords description title md mdBrief date tags

const rMore = /<!--\s*more\s*-->/;
const rMeta = /<!--meta([\s\S]+)-->/;

/**
 * 处理数据，即 <!--meta--> 中的信息
 * @param brief
 * @returns {{}}
 */
function parseMeta(brief) {
  let ret = {};
  const resolveHandles = {
    date: (v) => {
      return v.split(' ')[0];
    },
    tags: (v) => {
      return v.split(/,\s*/);
    }
  };
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
  const temp = md.split(rMore) || [];
  // ret.md = md;
  let mdBrief = temp[0] || '';
  Object.assign(ret, parseMeta(mdBrief));

  ret.md = md.replace(rMore, '').replace(rMeta, '');
  ret.mdBrief = mdBrief.replace(rMore, '').replace(rMeta, '');

  return ret;
}

module.exports = parseArticleMeta;
