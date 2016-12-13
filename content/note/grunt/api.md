# Grunt

在你的 Gruntfile 、 Grunt 插件或者 Grunt 任务文件中，必然有 `module.exports` 。
在 `module.exports` 指向一个函数，这个函数的参数 `grunt` 是一个对象，包含了所有 Grunt 的方法和属性。

下面将要列出的方法几乎都是在别处定义的，为了方便才挂到 grunt 上。

## Config

## Creating Tasks

### grunt.intiConfig

### grunt.registerMultiTask

### grunt.renameTask

## Loading Externally-Defined Tasks

### grunt.loadTasks

### grunt.loadNpmTasks

## Warnings and Fatal Errors

### grunt.warn

### grunt.fatal


## Miscellaneous

### grunt.package

当前 grunt 的 `package.json` 的数据，对象。

```js
grunt.package
```

### grunt.version

当前 grunt 的版本号，字符串。

这个就是 `grunt.package.version` 的快捷方式。

```js
grunt.version
```