<!--
title: babel
date: 2016-08-13 16:19:54
tags: babel, es6, fis
-->


最近总算有点时间能系统的梳理下 `babel` 。入门或者使用手册什么的直接查看“<a href="#wafaha">参考文章</a>”即可，我只说说我的理解。

<!-- more -->

## 插件
>Babel is built out of plugins.

* `babel-core` 只是个插件加载器，`presets` 是一组插件，避免繁琐地一个一个安装插件。

* `preset`[es2015](http://babeljs.io/docs/plugins/preset-es2015/) 可以很好的编译 `es6` ，唯独对常用的 `class property` 无能为力，快使用插件 [Class properties transform](http://babeljs.io/docs/plugins/transform-class-properties/) 。

* `preset` [react](http://babeljs.io/docs/plugins/preset-react/) 也是官方支撑的，有五个插件，其中 [flow](https://flowtype.org/docs/quick-reference.html#_) 是我下一篇文章的内容。传闻 React 团队抛弃了自己做的编译工具全力支持 `babel` ，`eslint` 的 `parser` 主流也是 `babel`，不知道 `typescript` 是啥态度。

* `preset` [stage-0](http://babeljs.io/docs/plugins/preset-stage-0/)  其实包含了 stage-[1-3] ，也就是说你装了 `0` ，其他三个默认就装了，别重复堆叠暴露底细。另外，[0-3] 是代表了不同阶段，但， `0` 是代表刚开始讨论，而 `3` 是代表快要成为标准规范了，切忌搞混，又暴露底细，虽然我也不知道 `async/wait` 处在哪个阶段。

* 自定义 `preset` 请参考[范本](https://github.com/babel/babel/blob/master/packages/babel-preset-es2015/src/index.js)，其实很简单，但也别胡乱搞 `preset` ，生态圈的质量取决于开发者的质量。

* 自定义 `plugin` 可以参考……没的参考，看样子你是个求知欲很强的人，看看这个，《[Babel 插件手册](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)》，这是另一个世界，里面有抽象语法树、词法分析、语法分析等高阶词汇，装 ◻︎ 撩 ◻︎ 必备。

## 配置
* sourceMaps ，单独说说 `sourcemap` ，有两个坑。
	* 一直很好奇，`babel` 和 `ugilfy` 两个 `sourcemap` 打架，到底怎么处理？可以读读这个 [Composed source map](https://github.com/mishoo/UglifyJS2#composed-source-map) 。
	* 坑！用 `babel-cli` 的话，配置 `.babelrc` 里面的 `sourceMaps` 不会生成 `map` 文件，你必须在命令行里指定 `--source-map` ，因为写 `sourceMap` 的操作是在 `babel-cli` 里实现的，虽然生成 `sourceMap` 是在 `babel-core` 里。

* moduleXXX，比如 `moduleRoot` 等，这一系列参数要配合 [transform-es2015-modules-amd](https://babeljs.io/docs/plugins/transform-es2015-modules-amd/) 。当然，实际项目中类似的事情可以交给其他工具去做，`babel` 就保持单纯的 `parser` 作用。

* filename ，就是要编译文件的路径，说这个目的是源于 [fis-parser-babel-5.x](https://github.com/fex-team/fis-parser-babel-5.x) 。它是以这种 `/xx/xx/xx.js` 绝对路径作为 `filename` 传到 `babel` 里，结果 `babel` 找不到 `.babelrc` 。`babel` 是沿着目录往上查找 `.babelrc` ，直到根目录，这种形式最后的结果是 `/.babelrc` ，it's not a  file ....

* quiet ，不打印任何东西。这个设计很费解，默认是打印东西，但只有错误信息，编译流程的关键节点一个没有，`log` 系统真的很弱。


## 生成的代码
* [babel-polyfill](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md#toc-babel-polyfill)，就是个库，自己去看就好了。
* 一直担心的是几乎每个文件里面都有 `Class` 的语法糖，代码严重冗余！我担心的别人当然也会担心，看看这个 [babel-runtime](https://babeljs.io/docs/plugins/transform-runtime/) 。虽说有官方的方案，但这块还是值得挖掘，是个微创新的点。

## fis
`fis` 生态圈也是江河日下，`babel` 的问题都不能妥善解决。
建议使用这个包 [parser-imweb](https://www.npmjs.com/package/fis3-parser-babel-imweb) ，将这个包和 `babel` 相关的包都装在本地吧，否则会掉到坑里。
也许是时候换到 `webpack` ？


<h2 id="wafaha">参考文章</h2>
* [Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)
* [Babel 用户手册](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)
* [Plugins](http://babeljs.io/docs/plugins/)
