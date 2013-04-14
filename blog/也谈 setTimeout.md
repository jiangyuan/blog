# 也谈 setTimeout

setTimeout ，延迟一段事件执行代码，当然这是最基本的用法，这里不说基本用法。

## jQuery 中的轮询

轮询，可能是 setTimeout 最典型的用法，jQuery 的兼容IE的 document ready 机制就用到了这个：

```js
// jquery 1.9.1
(function doScrollCheck() {
    if ( !jQuery.isReady ) {

        try {
            // Use the trick by Diego Perini
            // http://javascript.nwbox.com/IEContentLoaded/
            top.doScroll("left");
        } catch(e) {
            // 不停地查看是否准备好
            return setTimeout( doScrollCheck, 50 );
        }

        // detach all dom ready events
        detach();

        // and execute any waiting functions
        jQuery.ready();
    }
})();
```

另外，我还看到了下面这种用法，缺省了 delay 这个参数，不知道会是一个什么状态，待探究。

```js
// jquery 1.9.1
ready: function( wait ) {
    ...

    // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
    if ( !document.body ) {
        return setTimeout( jQuery.ready );
    }

    ...
},
```

## setTimeout( func, 0 )

当然，初见这种用法时，我是一愣啊，什么情况，setTimeout( func, 0 ) 和直接调用 func 难道不是同一个效果？

肯定不是一个效果，在 stackOverflow 也有很多人问。

比如这个[Why is setTimeout(fn, 0) sometimes useful?](http://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful)，
IE6 中出现的奇葩问题竟然可用 setTimeout(func, 0) 神奇地解决。

这些问题概括来讲是这样：动态往 dom 树中插入元素，
然后立刻、马上操作这个元素（比如选择文本框的文本，改变 select 的 index 等），
普通方式写代码通常不起作用，但是放入 setTimeout( func, 0 ) 中就可以达到效果。

要理解这个问题还是要了解 浏览器的 UI 线程。

单线程的浏览器， js 引擎和渲染引擎必定是顺序执行 (stack)，比如点击一个按钮，浏览器会先改变按钮的状态（actived，重绘），
然后才执行 js (js引擎) 。

所以往 dom 插入元素再立刻操作这个 dom ，那么很有可能这个 dom 还没有重绘完成，因此操作无效。

那么，为什么放入 setTimeout( func, 0 ) 中就可以呢？
其实答案已经出来了， setTimeout 会等到重绘完成才执行代码，自然无往而不利。

## setTimeout 进一步理解

可以更深入的思考： setTimeout( func, 0 ) 是延迟 0ms 执行，也就是立刻执行，但为什么还是在重绘之后呢？
重绘肯定会超过 0ms 啊！

到这里才是这篇笔记的终极目的， javascript 单线程的异步模式。

jQuery 作者 John Resig 的这篇《[How JavaScript Timers Work](http://ejohn.org/blog/how-javascript-timers-work/)》通俗易懂地阐述了这个问题……

以下是我对这篇文章的理解：

***

理解 javasript 定时器的内部机制是必要的，虽然有时候这些定时器表现的很古怪。

为了理解定时器的内部机制，有一点必须着重强调：延迟时间的精确度无法保证，比如延迟 10ms ，回调函数不一定在 10ms 后执行。
这是因为，浏览器中的 javascript 引擎是单线程，所有的异步函数必须等到适合的时间执行。

为了更好地阐述，John 采用了看图说话的方式，<a href="http://ejohn.org/files/Timers.png" target="_blank">点击查看图片</a>。

图中蓝色的圆角矩形是 js 块(javascript block) ，右边的数字表示时间，“问题”是模拟浏览器的判断，左边则是 javascript 代码的执行时间。
比如第一个 js 块执行了大概 18ms ，“点击事件”大概执行了 11ms 等等。

既然是单线程，这些 js 块都是互相阻塞的，第一个 js 块执行过程中， "click" 被触发，但是必须排队，等到第一个块执行完才执行（当然，
排队的方式在各浏览器中不同，我们这里不关注这个）。

接下来就好理解了——

开始，在第一个 js 块中，两个延迟 10ms 的 timer 被初始化，注意这个 10ms ，不保证 10ms 后一定执行，两个 timer 必然会是在第一个 js block
执行完之后才执行。

另外，在第一个 js 块中，鼠标点击了，但是事件处理函数不会立刻执行，和 timer 一样，也要等到一个 js block 执行完后才执行。

终于，第一个 js 块执行完。这个时候浏览器会问，接下来干嘛。事件处理函数和 timer 都在等待，于是事件处理函数执行， timer 继续等待。

在事件处理函数执行过程中，10ms 的 interval 触发了，毫无疑问不会立刻执行，进入队列等待。

事件处理函数执行完毕， timer 执行，这个时候， interval 又触发了，要知道上一个 interval 还没有执行，怎么办？

这一次的 interval 会被抛弃 (dropped) 。如果不抛弃，那么有可能大量的 interval 会在 timer 执行完后同时执行，这显然不符合逻辑。
对于这，浏览器的排队方式是先检查有没有 interval ，如果没有，排队，有就抛弃。

继续看，当 timer 执行完， 第一个 interval 执行，在这个过程中，第三个 interval 触发.在其自身执行过程中，自身也可以被触发。
可见， setInterval 不管当前在执行什么，他都会强行排队，即使本身还没执行完。

最后没什么好说的了，没什么可等，所有的 interval 会立刻执行。

再来看看 setTimeout 和 setInterval 之间的区别：

```js
setTimeout(function(){
    /* Some long block of code... */
    setTimeout(arguments.callee, 10);
}, 10);

setInterval(function(){
    /* Some long block of code... */
}, 10);
``` 

乍一看，效果一样，其实区别很大。

setTimeout 总是会在其回调函数执行后延迟 10ms （或者更多，但不可能少），而 setInterval 总是 10ms 执行一次，而不管
它的回调函数执行多久。

总结：

* javascript 引擎是异步的，总是强制异步过程排队。

* setTimeout 和 setInterval 的机制完全不同。

* 定时器的代码总是会被延迟到下一个可能的时间点执行，这个时间点很可能比你给定的时间要长。

* 如果 Intervals 的回调执行时间比你给定的 delay 还要长，那么他们会连在一起执行。

***


上面就是 John 对 timer 的解释，唯一的缺憾是没有把渲染引擎的执行考虑进去。




## setTimeout 中的 this

setTimeout 中的 this 被无数人吐槽过，老道直接说这是语言设计错误。

```js
var o = {
    a: "a",
    b: function() {
        setTimeout(function() {
            console.log( this.a ); 
        }, 1000);
    }
}

o.b();  // undefined
```

是的，上面的这种情况，setTimeout 的 this 会指向全局作用域，于是 a 是 undefined 。

解决办法很多，最简单的是：

```js
var o = {
    a: "a",
    b: function() {
        var that = this;
        setTimeout(function() {
            console.log( that.a ); 
        }, 1000);
    }
}

o.b();  // "a"
```
