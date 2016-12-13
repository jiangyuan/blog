<!--
title: 浏览器缓存
date: 2013-03-21 23:19:45
tags: 浏览器
-->

在读 Yahoo! 前端优化时，有下面这两条规则：

> Add an Expires or a Cache-Control Header 设置头文件过期或者静态缓存

> Make JavaScript and CSS External 将JS和CSS外链

都是和缓存有关系的。

在调试 javascript 时，发现有时候刷新没有效果，但是代码明明改了，这也和缓存有关。

http 状态码是 304 时，表示请求的资源没有变化，这个和缓存**没有**关系。

最重要的是，面试的时候碰到了关于**缓存**的问题，我却不是很了解。

于是有了这个笔记。

<!-- more -->

当然，当我准备动手写时，看到了这篇文章，《[浏览器缓存机制](http://fastfood.sinaapp.com/?p=1092)》，于是就不用写了……

2013-03-31 不动手写还是理解不深啊。

## 非 http 缓存

浏览器缓存机制，其实主要的还是 http 协议的缓存机制。

当然也有非 http 协议缓存，如

```html
<meta http-equiv="pragma" content="no-cache" />
```

上面这行的作用是让页面不缓存，每次都去服务器加载。

又比如：

```html
<meta http-equiv="expires" content="30 Apr 2013" />
```

这个可以缓存该页面。

值得说明的是 pragma 这个值在 IE5 之后就没有浏览器支持了，至于 expires …… 可用，但是如果是
代理的话，就无效了，代理服务器不处理 html 。

## http 协议的缓存机制

http 协议的缓存，都是通过响应头，以此来告知浏览器是否缓存、怎么缓存。

### Expires 策略

```js
Expires="Mon,31 Dec 2001 04:25:57GMT"
```

没什么好说的，给 http 响应头加上 Expires 字段。

不过Expires 是HTTP 1.0的东西，现在默认浏览器均默认使用HTTP 1.1，所以它的作用基本忽略。

### Cache-Control

相比于 Expires ，Cache-Control 的选择更多，设置更细致，如果同时设置的话，其优先级高于Expires ，其值可以是：

* Public  指示响应可被任何缓存区缓存

* Private  指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。
    这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效。

* no-cache  指示请求或响应消息不能缓存。

* no-store  用于防止重要的信息被无意的发布。在请求消息中发送将使得请求和响应消息都不使用缓存。

* max-age  指示客户机可以接收生存期不大于指定时间（以秒为单位）的响应。

* min-fresh  指示客户机可以接收响应时间小于当前时间加上指定时间的响应。

* max-stale  指示客户机可以接收超出超时期间的响应消息。
    如果指定max-stale消息的值，那么客户机可以接收超出超时期指定值之内的响应消息。


### Last-Modified/If-Modified-Since

Last-Modified/If-Modified-Since 要配合 Cache-Control 使用。

* Last-Modified： 表示这个响应资源的最后修改时间。web 服务器响应请求时，告诉浏览器资源的最后修改时间。

* If-Modified-Since： 当资源过期时（使用Cache-Control标识的max-age），发现资源具有Last-Modified声明，
        则再次向web服务器请求时带上头 If-Modified-Since，表示请求时间。
    web服务器收到请求后发现有头If-Modified-Since 则与被请求资源的最后修改时间进行比对。
    若最后修改时间较新，说明资源又被改动过，则响应整片资源内容（写在响应消息包体内），HTTP 200；
        若最后修改时间较旧，说明资源无新修改，则响应HTTP 304 (无需包体，节省浏览)，告知浏览器继续使用所保存的cache。


### Etag/If-None-Match

Etag/If-None-Match 也要配合 Catch-Control 来使用。

* Etag： web服务器响应请求时，告诉浏览器当前资源在服务器的唯一标识（生成规则由服务器决定）。
        Apache中，ETag的值，默认是对文件的索引节（INode），大小（Size）和最后修改时间（MTime）进行Hash后得到的。

* If-None-Match：当资源过期时（使用Cache-Control标识的max-age），发现资源具有Etage声明，
    则再次向web服务器请求时带上头If-None-Match （Etag的值）。
    web服务器收到请求后发现有头If-None-Match 则与被请求资源的相应校验串进行比对，决定返回200或304。


### Etag/If-None-Match 与  Last-Modified/If-Modified-Since

使用Last-Modified已经足以让浏览器知道本地的缓存副本是否足够新，为什么还需要Etag（实体标识）呢？
HTTP1.1中Etag的出现主要是为了解决几个Last-Modified比较难解决的问题：

*  Last-Modified标注的最后修改只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话，它将不能准确标注文件的修改时间。

*  如果某些文件会被定期生成，当有时内容并没有任何变化，但Last-Modified却改变了，导致文件没法使用缓存。

*  有可能存在服务器没有准确获取文件修改时间，或者与代理服务器时间不一致等情形。

Etag是服务器自动生成或者由开发者生成的对应资源在服务器端的唯一标识符，能够更加准确的控制缓存。
Last-Modified与ETag是可以一起使用的，服务器会优先验证ETag，一致的情况下，才会继续比对Last-Modified，最后才决定是否返回304。


### 用户行为与缓存
<table>
    <tr>
        <th>用户操作</th>
        <th>Expires/Cache-Control</th>
        <th>Last-Modified/Etag</th>
    </tr>
    <tr>
        <td>地址栏回车</td>
        <td>有效</td>
        <td>有效</td>
    </tr>
    <tr>
        <td>页面链接跳转</td>
        <td>有效</td>
        <td>有效</td>
    </tr>
    <tr>
        <td>新开窗口</td>
        <td>有效</td>
        <td>有效</td>
    </tr>
    <tr>
        <td>前进、后退</td>
        <td>有效</td>
        <td>有效</td>
    </tr>
    <tr>
        <td>F5 刷新</td>
        <td>无效</td>
        <td>有效</td>
    </tr>
    <tr>
        <td>Ctrl+F5 刷新</td>
        <td>无效</td>
        <td>无效</td>
    </tr>
</table>


******

20130508

[浏览器缓存技术](http://www.cnblogs.com/phphuaibei/archive/2011/09/27/2192817.html)
