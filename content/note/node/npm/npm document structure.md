# npm 的文件结构

[原文](https://npmjs.org/doc/folders.html)

## 概要

* 局部安装(local install)：将资源放入当前目录的 ./node_modules 下

* 全局安装(global install)：/usr/local 或者 node.exe 的目录下

* 如果你想 require 资源，请局部安装

* 如果是想在命令行中使用，请全局安装

* 如果两个地方都要使用，请两个地方都安装

## prefix 配置 (prefix configuration)

`prefix` 的默认路径通常就是 node.exe 的路径。大多数系统性就是 /usr/local ，windows 下则是
和 node.exe 一个路径。

当采用全局安装时，npm 会将资源安装进 `prefix` 目录。

可以通过 `npm config set prefix ...` 来定义该路径。


## node 模块 ( node modules )

局部安装时， node 模块会放置在当前目录的子目录 node_modules 下。

全局安装时， node 模块会放置在 `prefix` 目录的子目录 node_modules 下。


## 可执行文件 ( executables )

全局安装时， windows 下，可执行文件通常直接放置在 `prefix` 目录下。

局部安装时， 可执行文件放置在 ./node_modules/bin 目录下。
