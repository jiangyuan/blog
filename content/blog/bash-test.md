<!--
title: bash 的 Test
date: 2016-05-30 21:38:54
tags: bash, shell, mac
-->


`bash` 中的 `test` 确实是一个让初学者迷糊的概念，但是理解了之后，发现它并没有深奥的地方。
<!-- more -->

## 实际场景
```bash
export NVM_DIR="/Users/jero/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
```
上面是我 `~/.zshrc` 文件中的一段，作用是引入 `nvm` 脚本。其中中括号的内容就是一个**测试**。
再看一段：
```bash
if [ "$(uname)" == 'Darwin' ]; then
  OS='Mac'
elif [ "$(expr substr $(uname -s) 1 5)" == 'Linux' ]; then
  OS='Linux'
else
  echo "Your platform ($(uname -a)) is not supported."
  exit 1
fi
```
如果使用过 `Atom` 编辑器，那么会知道这是 `/usr/local/bin/atom` 中的一段脚本，作用是判断你都机器是哪种系统。其中 `if` 后面中括号的内容，就是测试。

从上面大致可以看出，测试就是其他语言中很常见的**真假**判断。实际上， `[` 是一个内置命令，你可以 `man [` 查看使用说明。

## test 和 [
`[` 命令根据表达式 `expr` 求值的结果返回 **0（真）或 1 （假）**。注意返回的结果，写多了 `js` 的人通常会在这里跑坑里去。
`expr` 也是一个 `bash` 命令，你可以 `man expr` 来查看使用手册。简单的讲，这个命令执行表达式，并将结果写到标准输出。
`[ expr ]` 和 `test expr` 是等价的。
我们来几个实例：
```bash
test 3 -gt 4 && echo True || echo False # False
[ 3 -gt 4 ] && echo True || echo False # False
[ 'abc' != 'def' ]; echo $? # 0
```
`$?` 是上条命令的结果，不清楚的可以参见[这篇文章](http://jiangyuan.me/blog/2016/01/27/bash-variables-and-parameters/)。
`-gt` 是比较操作符，表示大于。数值比较的相关操作，总结如下：

| 操作符      |     含义 |
| :-------- | :--------|
| `-gt`   |   大于 |
| `-ge`   |   大于等于 |
| `-eq`   |   等于 |
| `-ne`   |   不等于 |
| `-lt`   |   小于 |
| `-le`   |   小于等于 |

来看个例子：
```bash
[ 3 -gt 4 ]; echo $?; # 1
[ 3 > 4 ]; echo $?; # 0
```
这个当然是假的，但是用 `>` 比较返回了 `0` ，再看一组对比：
```bash```
[ 3 > 4 ]; echo $?; # 0
[[ 3 > 4 ]]; echo $?; # 1
```
`[[` 的结果符合我们的预期，事实证明 `&&, ||, >, <` 在 `[]` 中有些问题，这也是为什么有 `[[` 的原因。

## `[[`
`[[` 是关键字，而不是一个命令，它的操作更接近 C 系语言的风格。 `[[` 的用法和 `[` 差不多，来几组例子：

```bash
[[ (-d "$HOME") && ( -w "$HOME") ]]; echo $?; #0
[[ (-d "$HOME") && ( -w "$HOME") ]] && echo 'home is a writable directory' # home is a writable directory
[[ "abc def .d,x--" == a[abc]*\ ?d* ]]; echo $? #0
[[ "abc def c" == a[abc]*\ ?d* ]]; echo $? #1
```

上面的几个例子有字符串的匹配，有单目操作符的比较，比如 `-d`。

## 常见的单目操作符

| 操作符      |     意义 |
| :-------- | :--------|
| `-z`    |   测试 null 字符串 |
| `-n` | 字符串是否非空 |
| `-d` | 目录 |
| `-e` | 存在 |
| `-f` | 普通文件 |
| `-r` | 可读 |
| `-w` | 可写 |
| `-N` | 从上次读取之后做过修改 |

除了 `-z` 和 `-n` ，其他都是和文件相关的操作。

## `(())`
这其实是一个相当强大的结构(structrue)，这里主要说说和测试相关的特性。
看组例子：
```bash
(( 0 )); echo $? #0
(( 3 > 4 )); echo $? #0
(( 0 && 1 )); echo $? #0
(( 0 || 1 )); echo $? #1
(( 100 && 11 )); echo $? #1
```
双括号结构一般都是用在数值的计算上，起返回的结果取决于计算的结果，结果为 0，返回 1（假）；结果为非 0，返回 0（真）。


## 参考文章

* http://www.ibm.com/developerworks/cn/linux/l-bash-test.html
* http://tldp.org/LDP/abs/html/testconstructs.html
* http://tldp.org/LDP/abs/html/dblparens.html
