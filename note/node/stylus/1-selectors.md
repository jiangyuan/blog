# stylus 语法之 选择器

[原文](http://learnboost.github.io/stylus/docs/selectors.html)

## 缩进

stylus 以缩进的方式取代 `{}` ，所以至关重要。比如：

```
body
    color white
```

会被编译为：

```css
body {
    color: #fff;
}
```

当然，你也可以使用冒号来分割属性名和属性值：

```
body
    color: white
```

## 父元素的引用

字符 `&` 会引用父选择器，如下：

```
textarea
input
    color #A7A7A7
    &:hover
        color #000
```

该段代码会被编译为：

```css
textarea,
input {
    color: #a7a7a7;
}
textarea:hover,
input:hover {
    color: #000;
}
```

“父引用”的作用一目了然。再看一个更复杂的例子：

```
box-shadow()
    -webkit-box-shadow arguments
    -moz-box-shadow arguments
    box-shadow arguments
    html.ie8 &,
    html.ie7 &,
    html.ie6 &
      border 2px solid arguments[length(arguments) - 1]

body
    #login
        box-shadow 1px 1px 3px #eee
```

该代码会被编译为：

```
body #login {
    -webkit-box-shadow: 1px 1px 3px #eee;
    -moz-box-shadow: 1px 1px 3px #eee;
    box-shadow: 1px 1px 3px #eee;
}
html.ie8 body #login,
html.ie7 body #login,
html.ie6 body #login {
    border: 2px solid #eee;
}
```

在“混入(mixin)”中使用 `&` 会有意想不到的效果。