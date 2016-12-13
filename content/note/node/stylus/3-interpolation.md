# stylus 语法之 占位符

## 一般用法

`{}` 是占位分解，这个和 grunt 的 `template` 和类似，比如：

```

vendor(prop, args)
    -webkit-{prop} args
    -moz-{prop} args
    {prop} args

  border-radius()
    vendor('border-radius', arguments)

  box-shadow()
    vendor('box-shadow', arguments)

  button
    border-radius 1px 2px / 3px 4px

```

会被编译为：

```css
button {
    -webkit-border-radius: 1px 2px / 3px 4px;
    -moz-border-radius: 1px 2px / 3px 4px;
    border-radius: 1px 2px / 3px 4px;
}
```

## 选择器占位符

占位符也可以在选择器中使用，下面的例子是给前五行设置不同的高度：

```
table
  for row in 1 2 3 4 5
    tr:nth-child({row})
      height: 10px * row
```

被编译成：

```css
table tr:nth-child(1) {
  height: 10px;
}
table tr:nth-child(2) {
  height: 20px;
}
table tr:nth-child(3) {
  height: 30px;
}
table tr:nth-child(4) {
  height: 40px;
}
table tr:nth-child(5) {
  height: 50px;
}
```