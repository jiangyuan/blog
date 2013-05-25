# Configuring tasks#

[原文](http://gruntjs.com/configuring-tasks)


## Files   
大部分 task 都表现为操作文件，grunt 有着强有力的文件操作方法。
    
有好多种方法来定义 src-dest( source-destination ) 的映射。
每一种“文件格式”都支持 src 和 dest，但是，但是：
类似 Compact Format 和 Files Array 支持一些额外的属性。

### compact format

可以翻译为“一般格式”。

该格式结构清晰，一目了然，是最最普通的格式。

每个 target 只有一个的 src 和 dest 属性，比较适合只读任务，比如 jshint 。

```js
grunt.initConfig({
    jshint: {                 // task
        foo: {                // target
            src: ['src/aa.js', 'src/aaa.js']  // src 是要获取的文件的路径，数组
        },
    },
    concat: {
        bar: {
            src: ['src/bb.js', 'src/bbb.js'],
            dest: 'dest/b.js',    // dest 是任务执行完成后，所得文件存放的路径
        }
    }
});
```

### files object format

直译是“文件对象格式”。

每个 target 可以有多个 src 和 des 。

属性名是表示 dest ，对应的值表示 src 。

拥有任意个 src 和 dest 的同时，一些 **额外的属性** 就用不了了。
虽说如此，这种格式还是很受欢迎的 **额外的属性** 用到的机会不多。

```js
grunt.initConfig({
    concat: {         // task
        foo: {        // target 
            files: {  // 经试验，这一层的属性名必须是 "files"
                'dest/a.js': ['src/aa.js', 'src/aaa.js'],
                'dest/a1.js': ['src/aa1.js', 'src/aaa1.js'],
            },
        },
        bar: {
            files: {
                'dest/b.js': ['src/bb.js', 'src/bbb.js'],
                'dest/b1.js': ['src/bb1.js', 'src/bbb1.js'],
            },
        },
    }
});
```

### files array format

直译就是“文件数组格式”。

这种格式的每一个 target 可以有多个 src 和 dest ，但是也能使用额外的配置属性，集合了上两种 format 的优点。

```js
grunt.initConfig({
    concat: {         // task
        foo: {        // target
            files: [  // 左边的 files ，必须是为 "files"，不能设置为其他属性
                { src: ['src/aa.js', 'src/aaa.js'], dest: 'dest/a.js' },
                { src: ['src/aa1.js', 'src/aaa1.js'], dest: 'dest/a1.js' },
            ]
        },
        bar: {
            files: [
                { src: ['src/bb.js', 'src/bbb.js'], dest: 'dest/b/', nonull: true },      // 这里用到了 nonull
                { src: ['src/bb1.js', 'src/bbb1.js'], dest: 'dest/b1/', filter: 'isFile' },//filter
            ],
        }
    }
});
```

### additional properties
上面提到了，在 compact format 和 files array formt 中可以使用额外的额外的配置属性，如下：

+ filter：

    可以是 [fs.Stats](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats) 的方法名，
    
    也可以是一个函数，用来过滤 src 中的 filepath 。
    
    函数带有一个参数，表示当前路径，返回 true 时，当前路径加入结果集。

+ nonull：

    布尔值，默认 false ，设为 true 时有如下行为：

    如果没有匹配(match)到结果（寻找文件的过程），返回一个数组，包含“通配符字符串”。

    为 false 时，遇到上述情况返回空数组。

    配合 grunt 命令行参数的 `--verbose` 使用，这个属性有利于调式。

+ dot
    
    直译是这样：允许 patterns 匹配“以xx开始”的文件名，即使 patterns 本身没有明确这个“以xx开始”中的 xx 。

    我做在研究的时候，发现达不到上述效果，所以上面的理解是错误的。

    官网文档，还能再简洁一点不！


+ matchBase
    
    如果 patterns(通配符)不包含斜杠（/），那么该值设为真时——

    比如， `a?b` 可以匹配 `/xyz/123/acb` ，但是不能匹配 `/xyz/acb/123` 。

    这个属性会匹配所有路径末端（再没有斜杠了）为 `a?b` 的路径。

    比如，该值为 true ， `*.js` 的行为就和 `**/*.js` 一样。


+ expand

    动态生成 src-dest 键值对。详细请查看下方 **动态地构建文件系统** 。

### 通配模式 (globbing patterns)

一个一个地去穷举所有文件的路径显然不太现实，grunt 可以通过内置的 [node-glob](https://github.com/isaacs/node-glob) 和 [minimatch](https://github.com/isaacs/minimatch) 来方便地抓取文件路径。

下面所要讲述的并不是一个关于 globbing patterns 的全面教程，只是在路径(path)经常遇到：
+ \*  匹配除 "/" 之外的所有字符
+ ?   匹配除 "/"之外的单个字符
+ **  匹配任意字符，包括 "/"，最强匹配
+ {}  里面是逗号分割的两个数字，表示 "或"
+ !   通配符的开始如果是 "!" ，表示不匹配

```js
        // 指定单个文件
        {src: 'foo/this.js', dest: ...}
        // 单个文件组成的数组
        {src: ['foo/this.js', 'foo/that.js', 'foo/the-other.js'], dest: ...}
        // 这个和上面的数组效果一样
        {src: 'foo/th*.js', dest: ...}

        // "{}" 通配符的用法
        {src: 'foo/{a,b}*.js', dest: ...}
        // 上面的通配其实就是这个
        {src: ['foo/a*.js', 'foo/b*.js'], dest: ...}

        // foo/ 路径下的所有 .js 文件
        {src: ['foo/*.js'], dest: ...}
        // 这个, bar..js 是第一个，紧随其后的是其他的 .js 文件
        {src: ['foo/bar.js', 'foo/*.js'], dest: ...}

        // 除了 bar.js 之外的所有 .js 
        {src: ['foo/*.js', '!foo/bar.js'], dest: ...}
        // 将 bar.js 放在数组的最末尾
        {src: ['foo/*.js', '!foo/bar.js', 'foo/bar.js'], dest: ...}

        // 模版可以用在路径和通配符中
        {src: ['src/<%= basename %>.js'], dest: 'build/<%= basename %>.min.js'}
        // 这样仍旧可以找到在 config 中定义的所有文件
        {src: ['foo/*.js', '<%= jshint.all.src %>'], dest: ...}
```

更多的通配符( glob pattern ) 可以参见 [node-glob](https://github.com/isaacs/node-glob) 和 [minimatch](https://github.com/isaacs/minimatch) 的文档。

### 动态地构建文件系统 ( building the files object dynamically )

当你想要组织很多个毫无关联的文件的时候，一些额外的属性可以让你动态地抓取这些文件。当然，这些属性必须得在 "compact" 和 "files array" 中使用。
+ expand 设置为 true 时表示启如下属性有效：
+ cwd 所有关于 src 的匹配都是相对这个路径，但不包含这个路径
+ src 通配符，路径相对于 cwd
+ dest 目标路径前缀
+ ext dest 路径中所有文件的扩展名将被此值替代
+ flatten Remove all path parts from generated dest paths. ( 待试用 )
+ rename 函数，每次匹配 src 都会调用一次， dest 和 src 被传入，返回一个字符串表示新的 dest 。

还是看下面的例子比较实在，下面的“静态”和“动态”的结果相同：

    grunt.initConfig({
      minify: {
        static_mappings: {
          // 这些 src-dest 文件都是手动指定的，每次添加或者删除文件， Gruntfile 也必须做相应改动。
          files: [
            {src: 'lib/a.js', dest: 'build/a.min.js'},
            {src: 'lib/b.js', dest: 'build/b.min.js'},
            {src: 'lib/subdir/c.js', dest: 'build/subdir/c.min.js'},
            {src: 'lib/subdir/d.js', dest: 'build/subdir/d.min.js'},
          ],
        },
        dynamic_mappings: {
          // 这里能动态的构建 src-dest 体系，从而达到和上面一样的效果，而且文件的删除和添加完全不影响 Gruntfile.js
          files: [
            {
              expand: true,     // 启动动态匹配
              cwd: 'lib/',      // 'src' 的路径都是相对该值所表示的路径
              src: ['**/*.js'], // 通配符
              dest: 'build/',   // 目标路径
              ext: '.min.js',   // 目标路径会在末尾加上该值
            },
          ],
        },
      },
    });