<!--meta
title: bash 初探
date: 2015-12-31 23:21:54
tags: bash, shell, mac
-->


##  shell 的含义

`shell` ，英文的含义是“壳”，在计算机科学中，是指“为用户提供用户界面”的软件，通常指的是命令行界面的解析器。

一般意义上，这个词指操作系统中提供访问内核所提供之服务的程序，因此除了 `CLI`，shell 也包含 GUI 的概念，`Windows Explorer` 是一个典型的图形界面Shell。

当然，本文只关注 `CLI` 。
<!-- more -->

`mac` 源自 `unix` 系统，所以其 `shell` 和 `unix` 一脉相承。


###  shell 脚本
`shell` 本身的概念其实已经关注的很少，我们的最原始的印象，`shell` 是一门脚本语言，可用于编程。

“shell 脚本”，又称 Shell 命令稿、程序化脚本，文本文件，由一连串的 `shell` 命令组成，经由 `Unix Shell`执行，可以进行系统管理、文件操作等。




## 环境
当前主流的操作系统都支持 `shell` 编程，本系列所探究的 `shell` 编程是指 Linux 下的 `shell`，讲的基本都是 POSIX 标准下的功能，所以，也适用于 Unix及 BSD（如Mac OS）。

### OS

#### Linux

Linux 默认安装就带了 shell 解释器。

#### Mac OS

Mac OS 不仅带了 sh、bash 这两个最基础的解释器，还内置了 ksh、csh、zsh 等不常用的解释器。

我个人倒是推荐 `zsh` ，`zsh` 会专门来篇文章介绍。

#### Windows

windows 出厂时没有内置 shell 解释器……只能装模拟器，比如 `cygwin` 。

当然 windows 上的 `PowerShell` 也是不俗的脚本，这个也会专门来个系列介绍。


### 脚本解释器
当然，脚本解释器五花八门，下面就挑选些典型的说下。

#### sh
即 Bourne shell，POSIX（Portable Operating System Interface）标准的 shell 解释器，它的二进制文件路径通常是 `/bin/sh`，由 Bell Labs 开发。

#### bash
Bash 是 Bourne shell 的替代品，属 GNU Project，二进制文件路径通常是 `/bin/bash`。业界通常混用 `bash`、`sh`、和 `shell`，比如你会经常在招聘运维工程师的文案中见到：熟悉 Linux Bash 编程，精通 Shell 编程。

#### zsh

Z Shell(Zsh) 以认为是一种 Bourne shell 的扩展，带有数量庞大的改进，包括一些bash、ksh、tcsh的功能。


#### 高级编程语言
理论上讲，只要一门语言提供了解释器（而不仅是编译器），这门语言就可以胜任脚本编程，常见的解释型语言都是可以用作脚本编程的，如：Perl、Tcl、Python、PHP、Ruby、Nodejs。



## 参考资料
* [Shell脚本编程30分钟入门](https://github.com/qinjx/30min_guides/blob/master/shell.md)
* [shell](https://zh.wikipedia.org/wiki/%E6%AE%BC%E5%B1%A4)
* [Shell脚本](https://zh.wikipedia.org/wiki/Shell%E8%84%9A%E6%9C%AC)
* [Z shell](Z%20shell)
