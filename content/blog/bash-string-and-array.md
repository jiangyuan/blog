<!--
title: bash 的字符串和数组
date: 2016-03-29 15:15:54
tags: bash, shell, mac
-->


回顾下自己接触过的编程语言，**字符串**和**数组**真是基础中的基础。也因此，在接触一门新的语言的时候，非常有必要去熟悉该语言的**字符串**和**数组**。
<!-- more -->

## 字符串

### 声明和赋值


```sh
name='jero' # 单引号
hellojero="hello, $name" # 双引号，可以引用变量
```
再看看复杂点的操作。

| 表达式      |     含义 |
| :-------- |:--------|
| `${var}`    | 变量 `var` 的值，与 `$var` 相同 |
| `${var-DEFAULT}` | 如果 `var` 没有被声明，那么就以 `$DEFAULT` 作为其值
| `${var:-DEFAULT}` | 如果 `var` 没有被声明, 或者其值为空, 那么就以   `$DEFAULT` 作为其值
| `${var=DEFAULT}` | 如果 `var` 没有被声明，那么就以 `$DEFAULT` 作为其值
| `${var:=DEFAULT}` | 如果 `var` 没有被声明, 或者其值为空, 那么就以   `$DEFAULT` 作为其值
| `${var+OTHER}` | 如果 `var` 声明了, 那么其值就是 `$OTHER`, 否则就为 `null` 字符串
| `${var:+OTHER}` | 如果 `var` 被设置了, 那么其值就是 `$OTHER`, 否则就为 `null` 字符串
| `${var?ERR_MSG}` | 如果 `var` 没被声明, 那么就打印 `$ERR_MSG`
| `${var:?ERR_MSG}` | 如果 `var` 没被设置, 那么就打印 `$ERR_MSG`
| `${!varprefix*}` | 匹配之前所有以 `varprefix` 开头进行声明的变量
| `${!varprefix@}` | 同上

#### `${var:-DEFAULT}` vs `${var:=DEFAULT}`

这两个真的非常像，那么它们的区别是什么呢？

```bash
foo1=${bar1:-'abc'}
echo $foo1; # abc
echo $bar1; # 空

foo2=${bar2:='abc'}
echo $foo2; # abc
echo $bar2; # abc

# 区别很明显了，bar1 没有赋值， bar2 被赋值了
```


### 操作

#### 长度

```bash
echo ${#name} #4

# 有些资料上会有如下方式：
echo `expr length "$name"`
# 在 mac(10.11.4) 上，会 `syntax error`
# 这是因为 GUN 的 expr 和 BSD 的 expr 有很大的不同，用的时候一定要慎重
# 具体可参考 https://discussions.apple.com/thread/923299

# 可做如下尝试：
echo `expr "$name" : '.*'` # 4
```

#### 拼接

拼接就比较灵活了，但不外乎如下几种方式。
```bash
hei="hei, $name" # 利用双引号
family='jiang'
echo "$hei $family" # hei, jero jiang
echo $hei $family # 当然也可以不用双引号，但是可读性降低了

```

####  子字符串

| 表达式      |     含义 |
| :-------- | :-------- |
| `${string:position}` | 在 `$string` 中, 从位置 `$position` 开始提取子串 |
| `${string:position:length}` | 在 `$string` 中, 从位置 `$position` 开始提取长度为 `$length` 的子串 |
| `${string#substring}` | 从变量 `$string` 的开头, 删除最短匹配 `$substring` 的子串 |
| `${string##substring}` | 从变量 `$string` 的开头, 删除最长匹配 `$substring` 的子串 |
| `${string%substring}` | 从变量 `$string` 的结尾, 删除最短匹配 `$substring` 的子串 |
| `${string%%substring}` | 从变量 `$string` 的结尾, 删除最长匹配 `$substring` 的子串 |
| `${string/substring/replacement}` | 使用 `$replacement`, 来代替第一个匹配的 `$substring` |
| `${string//substring/replacement}` | 使用 `$replacement`, 代替所有匹配的 `$substring` |
| `${string/#substring/replacement}` | 如果 `$string` 的前面数位匹配 `$substring`, 那么就用 `$replacement` 来代替匹配到的 `$substring` |
| `${string/%substring/replacement}` | 如果 `$string` 的后面数位匹配 `$substring`, 那么就用 `$replacement` 来代替匹配到的 `$substring` |

*`substring` 可以是正则。*

下面来个实例。

```bash
long='123456789abcdefg123456789abcdefg123456789'
echo ${#long} # 41，长度
echo ${long:3} # 456789abcdefg123456789abcdefg123456789，从第三位开始截取
echo ${long:3:6} # 456789，从第三位开始截取长度为 6 的子串
echo ${long#*a} # bcdefg123456789abcdefg123456789，从头删除最短匹配
echo ${long##*a} # bcdefg123456789，从头删除最长匹配
echo ${long%a*} # 123456789abcdefg123456789，从尾开始删除最短匹配
echo ${long%%a*} # 123456789，从尾开始删除最长匹配
echo ${long/abc/ABC} # 123456789ABCdefg123456789abcdefg123456789，替换首次出现的子字符串
echo ${long//abc/ABC} # 123456789ABCdefg123456789ABCdefg123456789，全局替换
echo ${long/#123/ABC} # ABC456789abcdefg123456789abcdefg123456789，字符串的前面数位和 123 匹配，替换之
echo ${long/%789/ABC} # 123456789abcdefg123456789abcdefg123456ABC，字符串的后面数位和 789 匹配，替换之
```

## 数组

`bash` 支持一维数组，下标从 `0` 开始。
```bash
declare -a array_name # 声明一个数组，但并没人这么用

arr1=(value0 value1 value2 value3 value)
# 或者
arr1=(
	value0
	value1
	value2
	value3
	value4
) # ！！！元素之间没有逗号


# 数组元素不用连续
arr2[0]=v0,
arr2[100]=v100

# 取数组元素，必须用大括号模式
echo ${arr1[3]} # value2
echo ${arr2[100]} # v100

# 使用 `@` 或 `*` 可以获取数组中的所有元素
echo ${arr1[*]} # value0 value1 value2 value3 value4
echo ${arr2[@]} # v1 v100

# 获取数组的长度
echo ${#arr1[*]} # 5
echo ${#arr2[@]} # 2

```



<br><br><br><br>
## 参考文章
* http://tldp.org/LDP/abs/html/string-manipulation.html
* http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_10_02.html
* http://tldp.org/LDP/abs/html/arrays.html
* [Shell字符串](http://c.biancheng.net/cpp/view/7001.html)
* [Shell数组：shell数组的定义、数组长度](http://c.biancheng.net/cpp/view/7002.html)
* [bash shell学习之变量](http://lovelace.blog.51cto.com/1028430/1211141)
* http://www.cnblogs.com/chengmo/archive/2010/10/02/1841355.html
* http://stackoverflow.com/questions/17404696/what-is-the-difference-between-var-var-word-and-var-var-word
* https://discussions.apple.com/thread/923299
* http://www.cnblogs.com/chengmo/archive/2010/10/02/1841355.html
