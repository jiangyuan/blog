# 创建任务

[原文](http://gruntjs.com/creating-tasks)


* 任务 * 是 grunt 的重要概念。每次运行 grunt ，你都会指定一个或者多个任务让 grunt 执行。

## 别名任务 ( alias tasks )

别名任务，其实就是给某一个或者多个任务注册一个别名，其语法如下：

```js
grunt.registerTask( taskName, [description, ] taskList )
```

看个例子：

```js
grunt.registerTask( "default", ["jshint", "qunit", "concat", "uglify"] );
```

将 `jshint` `quint` `concat` `uglify` 四个任务注册到 `default` 。

调用 `grunt` 或者 `grunt default` 就会跑上面四个任务，当然你还可以传参：

```js
grunt.registerTask( "dist", ["concat:dist", "uglify:dist"] );
```

调用 `grunt dist` 就会执行 `concat` 和 `uglify` ，并且 `dist` 会被传入这两个任务。


## Multi Tasks

这东西实在不好翻译，叫复合任务？多重任务？都不像。

先要谈谈 grunt 的任务构成。

```js
grunt.initConfig({
  log: {
    foo: [1, 2, 3],
    bar: 'hello world',
    baz: false
  }
});

grunt.registerMultiTask('log', 'Log stuff.', function() {
  grunt.log.writeln(this.target + ': ' + this.data);
});
```

上面的 log 就是一个任务(task)， foo 、bar 、baz 叫 target 。

当命令行调用 `grunt log` 时， grunt 会遍历 task 底下的 target ，这就是 Multi Task 的本质。

执行一个 Multi Task ， grunt 会现在配置项中寻找和任务名（上面的 log）同名的属性，
这些属性以及其对应的值都会被传入到任务的处理函数中。


## "Basic" Tasks （普通任务）

普通任务不会想 MultiTask 一样去嗅探配置项，它就只是执行任务的处理函数。可以通过如下方式传递参数：

```
// 任务名后加冒号，之后就是参数
// 多个参数也是用 param 隔开

grunt taskName:param

grunt taskName:param1:param2
```

语法形式：

```js
grunt.registerTask(taskName, [description, ] taskFunction)
```

看一个例子：

```js
grunt.registerTask('foo', 'A sample task that logs stuff.', function(arg1, arg2) {
  if (arguments.length === 0) {
    grunt.log.writeln(this.name + ", no args");
  } else {
    grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
  }
});
```

调用 `grunt foo` 会输出 `foo, no args` 。

调用 `grunt foo:testing:123` 。



