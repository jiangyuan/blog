# nodejs 快速入门

## 命令行工具

`node --help` 即可查看帮助信息

`node -e "console.log('hello world');"` 会输出 hello world

`-e` 参数会执行其后的 js 语句。

### REPL 模式

REPL( Read-eval-print loop ) ，输入-求值-输出 循环。

运行无参数`node`将会启动一个 javascript 的交互式 shell，这个真心有用。

连续两次 Ctrl + C 退出 REPL 模式。


### 小技巧之 supervisor

初试 nodejs ，你会发现每次修改文件后，都要重启服务才能见到效果，这实在是有点坑爹。

不过还有， `supervisor` 可以搞定这个。它会监测代码改动，并自动重启。

首先，使用 npm 来安装：

```
npm install -g supervisor
```

接下来，用 `supervisor` 来启动文件，比如 app.js ：
```
supervisor app.js
```

这样，调试的时候就很方便了。


## 异步 I/O 与事件式编程

### 阻塞与线程

大部分语言，遇到耗时操作时，会阻塞该现成，将 cup 转向其他线程，稍后再转回。

js 的单线程显然不行。但是可以通过回调函数异步执行，详见 [也谈 setTimeout](https://github.com/jiangyuan/blog/blob/master/blog/%E4%B9%9F%E8%B0%88%20setTimeout.md)。


### 回调函数

回调函数，嗯，就是回调函数。

### 事件

javascript 事件机制也就不多说。值得一提的是，`nodejs` 和 `jQuery` 的事件如出一辙。

```js
var EE = require( "events" ).EventEmitter;
var event = new EE();

event.on( "custom", function() {
    console.log( "fired" );
});


setTimeout(function() {
    event.emit( "custom" );
}, 2000 );
```

也不知道是巧合还是互相借鉴。

#### nodejs 的事件循环机制

nodejs 什么时候进入事件循环？答案是 nodejs 从来就没有出过事件循环。

## 模块和包

Module 和 Package 是 node.js 的重要支柱，这在其他语言中很常见。

## 调试