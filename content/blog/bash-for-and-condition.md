<!--
title: bash 的条件和循环
date: 2016-06-28 15:15:54
tags: bash, shell, mac
-->

条件语句和循环可以统称为流程控制，是一门语言最基础的部分。
`bash` 的流程控制和大家熟悉的语言非常类似，所以这块上手应该很快。

<!-- more -->


## 条件语句
条件这块建议先去瞧瞧《[bash 的 Test](http://jiangyuan.me/blog/2016/05/30/bash-test/)》。`bash` 中的条件语句，基础就是 `Test` 。

### if
先来个实例：
```bash
x=5;

if [ $x = 5 ]; then
    echo 'x equals 5.';
else
    echo 'x does not equal 5';
fi

# 输出： x equals 5.
```
和我们熟悉的语言非常相似，不妨抽象一下：
```bash
if commands; then
	commands
[elif commands; then
	commands...]
[else
	commands]
fi
```
这就是 `if` 的基本语法，其中紧接在 `if` 和 `elif` 后面的 `commands` 多数时候为 `Test`  。
来个复杂一点的例子：

```bash
FILE=~/.zshrc # 随便找个路径
if [ -e "$FILE" ]; then # -e 单目操作符
    if [ -f "$FILE" ]; then
        echo "$FILE is a regular file."
    fi
    if [ -d "$FILE" ]; then
        echo "$FILE is a directory."
    fi
    if [ -r "$FILE" ]; then
        echo "$FILE is readable."
    fi
    if [ -w "$FILE" ]; then
        echo "$FILE is writable."
    fi
    if [ -x "$FILE" ]; then
        echo "$FILE is executable/searchable."
    fi
else
    echo "$FILE does not exist"
fi
```

这个例子中就有大量的 `Test` 。

### case
`case` 其实就是我们熟悉的那个 `swich` ，但语法形式上有很大的不同。

```bash
case "$variable" in
	"$condition1" )
		command...
	;;
	"$condition2" )
		command...
	;;
esac
```
* 双引号包裹变量，这不是必须的
* 每一个 `Test` 语句，必须以 `)` 结尾
* 每一个条件区块，必须以 `;;` 结尾
* 整个 `case` 区块，必须以 `esac` 结尾——`esac case spelled backwards`

来个例子。
```bash
x=4

case $x in
    'a' )
        echo "x 是 a";;
    4 )
        echo "x 是 4";;
    'b' )
        echo "x 是 b"
esac

# x 是 4
```

总得来说， `bash` 中的条件语句， `Test` 是核心，`if` 和 `case` 熟悉语法即可。

## 循环
`bash` 中有 `for` 和 `while` 两种常见的循环体，我们应该都很熟悉。

### for
直接上实例，批量修改文件名。

目录如下：
```
.
├── error_400.html
├── error_403.html
├── error_404.html
├── error_500.html
└── error_503.html
```
 bash 代码：
```bash
for $i in `ls`
do
	mv $i ${i/html/ejs};
done
```

语法其实很明朗：
```bash
for variable [in words]; do
    commands
done
```
* `do` 可以另起一行，如果和 `for` 同行，那么 `for` 语句必须 `;` 结尾
* 循环体必须 `done` 结尾
* `[in words]` 取值很宽泛，可以是通配符，可以是一个命令(`ls`)，一句话，必须是数组形式

```bash
for i in *
do
    echo $i;
done

## 会打印当前目录下的所有文件名
```

### while
看个例子：
```bash
count=1
while [ $count -le 5 ]; do
    echo $count
    count=$((count + 1))
done
echo "Finished."

# 依次打印 1 - 5 和 finished
```
语法如下：
```bash
while commands; do commands; done
```


## 参考文章
* http://wiki.jikexueyuan.com/project/linux-command/chap28.html
* http://tldp.org/LDP/abs/html/testbranch.html
* http://wiki.jikexueyuan.com/project/linux-command/chap30.html
