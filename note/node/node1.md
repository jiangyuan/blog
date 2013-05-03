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

不过还好， `supervisor` 可以搞定这个。它会监测代码改动，并自动重启。

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

大部分语言，遇到耗时操作时，会阻塞该线程，将 cup 转向其他线程，稍后再转回。

js 的单线程显然不行。但是可以通过回调函数异步执行，详见 [也谈 setTimeout](https://github.com/jiangyuan/blog/blob/master/blog/%E4%B9%9F%E8%B0%88%20setTimeout.md)。


### 回调函数

回调函数，嗯，就是回调函数。

### 事件

javascript 事件机制也就不多说。值得一提的是，`nodejs` 和 `jQuery` 的事件如出一辙，也不知道是巧合还是互相借鉴。

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


#### nodejs 的事件循环机制

nodejs 什么时候进入事件循环？答案是 nodejs 从来就没有出过事件循环。

## 模块和包

Module 和 Package 是 node.js 的重要支柱，这在其他语言中很常见。

### 模块

Module 是 node.js 应用程序的重要组成部分，文件和模块是一一对应的。
一个 node.js 文件就是一个模块，这个文件可能是 javascript 、json 或者编译过的 c/c++ 扩展。

#### 创建模块

通常，一个文件就是一个模块，所以创建模块就是创建一个文件，鉴于此，我们更关注的是怎么调用模块。

node.js 提供了 exports 和 require 两个对象，其中 exports 是模块公开的接口，
require 用于从外部获取一个模块的接口，即获取模块的 exports 对象。

有一个 module.js 文件：

```js
// module.js

var name;

exports.setName = function( nameP ) {
    name = nameP;
};

exports.sayHello = function() {
    console.log( "hello " + name );
}
```

同目录下的 getmodule.js ：

```js
    var myModule = require( "./module" );
    myModule.setName( "jiang" );
    myModule.sayHello();
```

node getmodule.js 运行之：

结果为 `hello jiang` 。

上面就是简单的模块的创建和获取， npm 上的所有模块都是通过这种方式搭建起来的。


#### 单次加载

require 获取模块和实例化对象有本质区别。无论调用多少次 require ，获取的模块都是同一个。

```js
    // loadmodule.js
    var hello1 = require( "./module" );
    hello1.setName( "jiang" );

    var hello2 = require( "./module" );

    hello2.setName( "wang" );

    hello1.sayHello();
```

结果是 `hello wang` 。

`hello1` 和 `hello1` 指向同一个对象，输出这种结果也就不奇怪。

#### 覆盖 exports

其实上面的单词加载会引出一个问题，我想实例化引入的模块，怎么弄？

这种情况下就可以采用覆盖 exports 的方式，比如：

```js
    // module.js
    var hello = function() {
        var name;
        this.setName = function() {
            ...
        };

        this.sayHello = function() {
            ...
        }
    };

    module.exports = hello;
```

可以这种获取使用模块：

```js
    // getmodule.js
    var hello = require( "./module" );
    var hello1 = new hello();
    var hello2 = new hello();
    ...
```

不能这样 `exports=hello` 来暴露模块。

`exports` 其实就是一个简单的对象字面量 `{}`，和 module.exports 指向同一个对象（假如这个对象叫 a ），
直接覆盖 `exports` ，会切断其与*对象 a* 的联系，也就不会暴露接口了。 module.exports 就不存在这一问题。


### 创建包

## 调试