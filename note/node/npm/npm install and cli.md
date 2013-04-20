# npm documentation

[原文](https://npmjs.org/doc/)


## windows 上的安装

1. node.msi 自带 npm ，傻瓜式安装即可。

2. [在此](https://npmjs.org/dist/)下载一个 zip 压缩包，将其解压至 node.exe 路径下即可。


## 命令行命令

### adduser

就是注册账户。输入命令按照提示输入用户名和密码即可完成注册。


### bin

输出可执行文件的路径。


### build

编译“包”。

```
npm build <package-folder>
```

`<package-folder>` 是一个在根目录下有 package.json 的文件夹。

这是 `npm link` 和 `npm install` 的管道命令( plumbing command ) 。

通常不会直接调用该命令。

### cache

操作包( package ) 的缓存。

```
npm cache add <tarball file>
npm cache add <folder>
npm cache add <tarball url>
npm cache add <name>@<version>

npm cache ls [<path>]

npm cache clean [<path>]
```

添加、查看、删除缓存都可以使用这个命令。

* add ： 将制定的 package 假如缓存。
        npm 内部使用较多，当然也可以直接使用。

* ls ：列出缓存目录下的所有文件夹。可以带一个文件夹名……

* clean ： 清楚缓存清楚缓存。

