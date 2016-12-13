# stylus 语法之 变量

## 普通用法

可以申明一个变量，可以在整个样式表中使用：

```
font-size = 14px

body
   font font-size Arial, sans-serif
```

会被编译为：

```css
body {
   font: 14px Arial, sans-serif;
}
```

变量可以由变量组成，比如：

```
font-size = 14px
font = font-size "Lucida Grande", Arial

body
  font font sans-serif
```

会被编译为：

```css
body {
    font: 14px "Lucida Grande", Arial sans-serif;
}
```

## “属性冒泡” "Property Lookup"

这是 stylus 独有的用法，可以临时声明变量并复制，比如：

```css
#logo
   position: absolute
   top: 50%
   left: 50%
   width: w = 150px
   height: h = 80px
   margin-left: -(w / 2)
   margin-top: -(h / 2)
```

我们还可以用 `@` 彻底让变量名消失，如：

```css
#logo
   position: absolute
   top: 50%
   left: 50%
   width: 150px
   height: 80px
   margin-left: -(@width / 2)
   margin-top: -(@height / 2)
```

还有一种使用方式，就是“混入”方式的 **条件定义**，即依据现有属性来定义一些属性。

看下面这段代码，如果没有 `z-index` 属性，则将 `z-index` 设置为 `1` 。

```css
position()
    position: arguments
    z-index: 1 unless @z-index

#logo
    z-index: 20
    position: absolute

#logo2
    position: absolute
```

“属性冒泡”会一直“冒”到对应属性为止：

```css
body
    color: red
    ul
      li
        color: blue
        a
          background-color: @color
```

上面的 `@color` 是 `blue` 。