<!--
title: javascript 的跨域问题
date: 2013-05-15 23:21:54
tags: 跨域,jsonp
-->

最近有不少人问到了我跨域问题，也有不少问题是因为跨域引起的，加上我本人对跨域的方法和每种方法背后的机制都不胜了解，
所以就有做个笔记的必要了。

还是那句话，只有亲自敲击了才能理解深刻。

下面就是 javascript 跨域的几个办法：

* document.domain

* jsonp

* 利用 iframe 和 location.hash

* windown.name 实现的跨域数据传输

* HTML5 postMessage

* ajax2 中的跨域资源共享 (CORS: cross-orgin resource sharing)

* flash

<!-- more -->

## document.domain

修改 document.domain 方法可能是最简单的跨域方法。

假如有两个页面

    http://www.a.com/a.html
    http://script.a.com/b.html

要做跨域通信，那么就可以在 a.html 页面上加上代码：

```js
document.domain = "a.com";
```

相应的 b 页面上也加上上述代码。

a.html 部分 html 如下：

```html
...
<iframe src="http://script.a.com/b.html" ></iframe>
...
```

上面 a 页面是可以顺利的和 b 页面交互的，也就是跨域交互。

这个方法简单是简单，但是局限很大：

1. 主域名必须相同，上面两个域名的主域名都是 a.com ，如果主域名不相同，趁早放弃这种方法。

2. 安全性，b 被攻击， a 也很有可能出现漏洞。

3. 引入多个 iframe 的时候，代码量大且芜杂，性能直线下降。

## 关于 jsonp

参考文章：

1. [jsonp详解](http://www.cnblogs.com/lemontea/archive/2012/12/11/2812268.html)

2. [聊聊 JSONP 的 P](https://github.com/lifesinger/lifesinger.github.com/issues/118)

这个年头，似乎不扯几下 jsonp 就显不出自己的水平似得，唉……

上面两篇文章，第一篇适合入门，第二篇是加深理解。

jsonp， JSON With Padding。

基础是 script 标签的跨域能力。

script 标签加载完成就会执行其中的代码，因此其内容必须合乎 javascript 语法，如下

```js
{
    id: 1,
    name: 2
}
```

代码肯定要跪掉，因此必须这样：

```js
callback({
    id: 1,
    name: 2
});
```

callback 可以在发送请求时放在 url 后传过去，当然，当前页面也必须有 callback 函数。

OK，这就是 jsonp 。


## 利用 iframe 和 location.hash

就我个人而言，这个方法实在是有些蛋疼，但也不失为解决跨域的方法。

需求如下：

```html
a.com 下 有页面 a.html ，主页面，需要和
b.com 下 页面 b.html 通信
```

先说说 location.hash ，这段 url

```html
a.html#data
```

中的 #data 就是 location.hash 。

经常使用锚点的同学应该很熟悉，这个东东可以将页面定位到 id 为 data 的元素位置。

除此之外，改变 hash 会改变浏览器的历史记录但是不刷新或者跳转页面，并且，在高级浏览器（IE8+）中你可以通过

```js
window.onhashchange
```
事件来监听这个变化，当然，如果你想兼容所有浏览器(IE6+)又懒得自己动手，
可以参考 [jQuery hashchange event](http://benalman.com/projects/jquery-hashchange-plugin/) 。
利用这个事件，可以来做 [deeplink](http://www.impressivewebs.com/deep-linking-javascript-ajax/) 。

当然，我们这里是要做跨域，差点跑题了。

上面的需求可以概括为， a.com 下的 a.html 想跨域获取 b.com 下的 b.html 页面上的数据。

大体思路：

a.html 中创建 iframe 指向 b.html 并利用 hash 传递数据

b.html 拿到参数，修改 a.html 页面的 hash 来传递数据

a.html 通过 onhashchange 事件监听自身的 hash 变化，获取数据

代码：

首先在 a.html 页面中创建一个 iframe ，并指向 b.html ，代码如下：

```
// 请求 b.html
function request() {
    var iframe = document.createElement( "iframe" )
    iframe.style.display = "none";
    iframe.src = "http://b.com/b.html#data";    // 注意 hash
    document.body.appendChild( iframe );
}


// 监听 hash
window.onhashchange = function() {
    var data = location.hash ? location.hash.substring(1) : "";
    console.log( "Now the data is " + data ) ;
}
```

b.html 页面中的代码

```js
//模拟一个简单的参数处理操作
switch( location.hash ){
    case '#data':
        callBack();
        break;
    case '#data2':
        //do something……
        break;
}

function callBack(){
    try {
        parent.location.hash = "somedata";
    } catch (e) {
        // ie、chrome 的安全机制（不同域）无法修改 parent.location.hash，
        // 所以要利用一个中间的 a.com 域下的代理 iframe
        var iframe = document.createElement( "iframe" );
        iframe.style.display = "none";
        iframe.src = "http://a.com/a2.html#somedata";    // 注意该文件在"a.com"域下
        document.body.appendChild( iframe );
    }
}
```

现在知道我为什么说这种方法蛋痛了吧，第三个页面 (a.com 下的 a2.html) 出现了，其中代码

```js
// parent.parent 就是 a.html
// 因为parent.parent和自身属于同一个域，所以可以改变其location.hash的值
parent.parent.location.hash = location.hash.substring(1);
```

跨域是搞定了，但是这个方法的缺陷也很明显：数据直接暴露在了url中，数据容量和类型都有限等……

整个方法就是这样了，这个方法的出现充分证明了 javascript 跨域实在是，坑爹！

***
时间隔的有点久了
***

## window.name 跨域

上面的 location.hash 确实问题很多，数据暴露、数据容量小等等，老实说，如果能解决这些问题，还是不错的。

庆幸的是，有一种方法能有达到上述效果，那就是利用 window.name 。

这篇文章写得很清楚，[使用 window.name 解决跨域问题](http://www.planabc.net/2008/09/01/window_name_transport/)。

当然，别人写那还是别人的，自己必须要研究一遍啊。

window.name 的跨域的机制是：

>name 值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB）。

比如在 a 页面设置了 window.name 的值，如果 a 跳转到 b 页面，该 name 值仍旧存在，所以思路也就出来了……

看我的代码，[点击](https://github.com/jiangyuan/playjs/tree/master/crossdomain/name)：

3000.html 是发起请求的页面，希望获取 3001.html 上的数据，那么——

1. 3000.html 中放一个 iframe ，指向 3001.html ，并监听 iframe 的 load 事件。

2. 3001.html 操作自己的 window.name ，以此传送数据。

3. 3000.html 当然不能直接访问 3001.html ，所有 3000proxy.html 就有存在的必要。

    3001.html 第一次加载完成后，使 iframe 跳转到 3000proxy，此时 window.name 仍旧存在，并且 iframe 和其父页面同域，可互相访问，
    跨域获取数据完成。


就是那么简单，这个方法可以说是 loacation.hash 的升级版。

个人觉得，这个方法可以非常好地解决 javascript 跨域问题，推荐使用。


## HTML5 postMessage

html5 的 postMessage ，可以在不同的 window 之间、甚至在不同域的 window 之间传递数据。
现阶段唯一的问题是浏览器的兼容问题， postMessage 支持 IE8+ 和其他现代浏览器。

可以参照这个[例子](https://github.com/jiangyuan/playjs/tree/master/crossdomain/name)。

postMessage 的使用语法：

```js
window.postMessage( data, targetOrigin)

// window 是目标 window 对象，可以为 iframe 的 contentWindow，或者 window.open 的返回值……
// data 是要传递的数据，字符串类型，可以将复杂的类型序列化为字符串传送
// targetOrigin 是目标域，假如设为 `http://a.com` 那么 `http://b.com` 就不会收到传送的数据
```

知道用法，那么思路就很清楚了——

3000 端口下的页面 `postMessage.html` 需要从 3001 端口下的 `postMessageTarget.html` 获取数据：

postMessage.html 代码：

```html
<!-- 这个文件运行在端口 3000 下 -->
<!-- 向端口 3001 传递参数，以期获得数据 -->
<iframe src="http://localhost:3001/crossdomain/postMessage/postMessageTarget.html" frameborder="0"></iframe>
<script type="text/javascript">
    var ifr = document.getElementsByTagName( "iframe" )[0];
    ifr.addEventListener( "load", function() {
        // 传送参数
        ifr.contentWindow.postMessage( "post data", "*" );
    }, false );

    // 获取返回的数据
    window.addEventListener( "message", function(e) {
        console.log( "the response data is: " + e.data );
    });
</script>
```

postMessageTarget.html 代码：

```html
<script type="text/javascript">
    // 此页面运行在 3001 端口下

    // 依据传入的 message 返回响应的数据
    window.addEventListener( "message", function(e) {
        //console.log( "the post data is: " + e.data );
        if ( e.data ) {
            e.source.postMessage( "response data", "*" );
        }
    }, false);
</script>
```

整个过程很清楚，完全没有多余的步骤。

唉，跨域问题在 html5 的面前就是如此简单。
