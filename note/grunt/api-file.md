# grunt.file

有很多方法来读写文件、遍历文件系统、以通配符（globbing patterns）的方式来查找文件。

注意： 所有的文件路径都是相对 `Gruntfile.js` 的，
除非使用 `grunt.file.setBase` 和 命令行参数`--base` 改变当前当前工作路径。

## 字符编码

### grunt.file.defaultEncoding

这个属性就是所有 `grunt.file` 方法所使用的编码。

当你确定要使用这个方法时，在 `Gruntfile.js` 中越早调用越好。

默认值是 `utf8` 。

```js
grunt.file.defaultEncoding = "utf8";
```


## 读写

### grunt.file.read

读取文件内容，返回一个字符串。

当 `options.encoding` 是 `null` 的时候，返回一个 [buffer](http://nodejs.org/docs/latest/api/buffer.html)。

```js
grunt.file.read( filepath [, options] )
```

`options` 有如下属性：

```js
var options = {
  // 没有设置 encoding 的话，其值就是 grunt.file.defaultEncoding 的值
  // 设为 null 则是返回 buffer 。
  encoding: encodingName
};
```


### grunt.file.readJSON

读取文档内容，并用 JSON 的方式反序列化为 js 对象。

`options` 请参见 `grunt.file.read` 。

```js
grunt.file.readJSON( filepath [, options] )
```

### grunt.file.readYAML

和上面的 `readJSON` 类似。

```js
grunt.file.readYAML( filepath [, options] )
```

### grunt.file.write


