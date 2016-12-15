<!--meta
title: bash 的变量和参数
date: 2016-01-27 15:15:54
tags: bash, shell, mac
-->


对一个编程脚本来说，最最基础的当然是变量。

对大多数开发者来说，变量也是最不值得的大说特说的。

但 `bash` 里的变量有一些特别的地方值得说说，谨防跌坑。
<!-- more -->

## 基本行为

### 赋值
```bash
# 赋值
keng = '坑' # 等号两边空格？
variableName="value"
a='1'
b= # 空

echo $a;
echo $b; # b 和下面根本没出现过的 c 的区别？
echo $c;
```

####  等号两边空格？

我的 `bash` 生涯第一坑。`bash` 中，赋值 `=` 两边**不能有空格**。
有空格又会怎样？

```bash
VARIABLE =value
# 脚本将会尝试运行带参数 "=value" 的 "VARIABLE " 命令。

VARIABLE= value
# 脚本将会尝试运行 "value" 命令，同时设置环境变量 "VARIABLE" 为 ""。
```


#### 上面 `$b` 和 `$c` 的区别？

实际应用的角度来说，基本没区别，都是空值。技术的角度加以区别的话，如下：

	```bash
	if [ -z "$b" -a "${bxxx}" = "xxx" ] # 这里的判断会有单独的文章介绍
	then
		echo 'b is set but empty'; # 设置但为空
	else
		echo 'b is not set'; # 没设置，如 c
	fi
	```

#### 变量中的空格

```bash
e=1 2 3 # 报错，变量中间当然不能有空格
e='1 2 3';
f='1  2   3';
echo $e; # 1 2 3
echo $f; # ?
echo "$f"; # ?
```

上述最后两行的结果？

```bash
echo $f; # '1 2 3'
echo "$f"; # '1  2   3'，空格会保留。
```

**如果在变量中出现空格，那么必须进行引用。**

#### 命令替换
命令替换就是将一个命令的结果赋值给变量。

```bash
g=`echo hello`
h=$(echo hello) # 这两种语法等价

i=`ls -l`
echo $i;
echo "$i"; # 和上一行的不同？想想上面的空格
```


### 替换
bash 里面引用一个变量的过程称为 Variable Substitution，字面意思即为变量替换。和大多数的语言叫法不同，但实际用起来没啥区别。

其实上面的赋值就有不少替换了，这里我们更进一步。

```bash
# 替换，必须有美元符号
variableName="value"
a='1'
b=

echo $variableName; # value
echo $a; # 1
echo ${a} # 1   实际上 $variable 是 ${variable} 的简化形式。
echo $b; #
echo foo $a;
echo 'foo $a'; # ? 单引号，强引用，所有字符字面量显示
echo "foo $a"; # ? 双引号，弱引用，变量会被替换
echo "foo \$a"; # ? 转义，变量不会被替换
```


## 变量类型
 这里当然不是说字符串、整形什么的，其实 `bash` 中的变量都可以理解为字符串。
 `bash` 中有四种类型的变量，它们是环境变量、本地变量、位置变量和特殊变量。

### 环境变量
参看维基百科的[环境变量](https://zh.wikipedia.org/wiki/%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)，这里不做赘述。

### 本地变量
我们上面的那么多的例子其实就是本地变量。
本地变量的作用域为当前脚本。有一个子类，局部变量，作用域是当前代码块，比如函数中的变量。

### 位置变量
其实就是我们说的参数了，也是特殊变量的一种，因为常用，单独拿出。

```bash
$n # n 为自然数，1、2、3……

# 实例
./test.sh foo bar
echo $1; # foo
echo $2; # bar
```

**大于 `$9` 的参数必须被放在大括号中**。

```bash
echo "${10}"
```

### 特殊变量

| 变量      |  含义 |
| :-------- | :-------- |
| $$   | 表示当前 Shell 进程的 ID ，即 pid , `echo $$`|
| $n   |   上述位置变量 |
| $#   |   传递给脚本或函数的参数个数 |
| $*   |   传递给脚本或函数的所有参数 |
| $@   |   传递给脚本或函数的所有参数 `?` *见下方* |
| $？   |   上个命令的退出状态，或函数的返回值 `?` *见下方* |
| $0   |   当前脚本的文件名 |

####  `$*` 和 `$@` 的区别

```bash
echo $*;
echo $@;
# 没有双引号，两者一样，都以"$1" "$2" … "$n" 的形式输出所有参数

echo "$*";
# 会将所有的参数作为一个整体，以"$1 $2 … $n"的形式输出所有参数

echo "$@";
# 会将各个参数分开，以"$1" "$2" … "$n" 的形式输出所有参数
```


#### 退出与退出状态
请查看[退出与退出状态](https://imcmy.gitbooks.io/advanced-bash-scripting-guide-in-chinese/content/source/part2/06_exit_and_exit_status.html) 。


<br><br><br>

## 参考文章
* [bash shell学习之变量](http://lovelace.blog.51cto.com/1028430/1211141)
* [Shell变量](http://c.biancheng.net/cpp/view/6999.html)
* [How to tell if a string is not defined in a bash shell script?](http://stackoverflow.com/questions/228544/how-to-tell-if-a-string-is-not-defined-in-a-bash-shell-script)
* [Introduction to Variables and Parameters](http://tldp.org/LDP/abs/html/variables.html)
* [变量与参数](https://imcmy.gitbooks.io/advanced-bash-scripting-guide-in-chinese/content/source/part2/04_introduction_to_variables_and_parameters.html)
