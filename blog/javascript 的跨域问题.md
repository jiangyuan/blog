# javascript 的跨域问题

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



