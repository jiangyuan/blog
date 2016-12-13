<!--
title: sublime 的 color scheme
date: 2014-03-18
tags: 编辑器, sublime
-->

# sublime 的 color scheme

想让 `markdown` 高亮，找了点插件，比如
[https://github.com/jonschlinkert/sublime-markdown-extended](sublime-markdown-extended)
可以让**代码块**高亮。但没有达到我想要的效果，我想让`markdown`的每个部分高亮，比如**# 标题**高亮。
然后找到了
[sublime-monokai-extended](https://github.com/jonschlinkert/sublime-monokai-extended)
这个达到了我的效果，但是将整个的 `color scheme` 都改了，自然不行。
现在的问题是——

## 在当前的 color scheme 高亮 markdown

继续寻找，然后找了这个
[markdown.xml](https://gist.github.com/CrazyApi/2354062)
按照上面说的，将代码复制到我的 `Obsidian.tmTheme` ，成功了。在现有 `color scheme` 上高亮了 `markdown` 。
但是头疼的是，我不喜欢他的**标题**颜色，想改。看了代码，摘录一段：

```xml
<dict>
  <key>name</key>
  <string>Markup: Underline</string>
  <key>scope</key>
  <string>markup.underline</string>
  <key>settings</key>
  <dict>
      <key>fontStyle</key>
      <string>underline</string>
      <key>foreground</key>
      <string>#839496</string>
  </dict>
</dict>
```

一头雾水，完全不知道 `how does it working` ，也就无从改起。
没有解决不了的问题，找了半天，这篇博客
[Tips For Creating Sublime Text Color Schemes](http://www.jisaacks.com/tips-for-creating-sublime-color-schemes)
解决了我的问题。其中的 `tip1` 尤其好——

> Sublime text color schemes work by defining colors for scopes. A syntax definition matches the different parts of the file's text (e.g. functions, classes, keywords, etc.) and maps them to a named scope. Then the color scheme specifies what colors to use for what scopes.
> The hard part comes when you see a particular piece of syntax you want to style a specific way, but you do not know what scope it is. I did a lot of guess work until I discovered the ScopeHunter plugin.
> The ScopeHunter plugin allows you to select some text and it tells you what scope it matches. This removes the guess work and allows you to quickly color the pieces you want to.

sublime text 的 color scheme 是通过 `scopes` 来定义 `color` 的，我们可以安装插件 `ScopeHunter` 来查看光标出的 `scopes` ，从而可以自定义颜色。

```xml
<dict>
  <key>name</key>
  <string>Markup: Underline</string>
  <key>scope</key>  <!-- 这里就是 scope，知道了这个，其他就好办 -->
  <string>markup.underline</string>
  <key>settings</key>
  <dict>
      <key>fontStyle</key>
      <string>underline</string>
      <key>foreground</key>
      <string>#839496</string>
  </dict>
</dict>
```

至此，已经可以修改 `markdown` 到我想要的状态了。但是我又想，能不能把 `markdown.md` 的背景也改了，
甚至模仿 `github` 的样式。

少说多做，幸福一生。

```xml
<dict>
    <key>name</key>
    <string>Markdown</string>
    <key>scope</key>
    <string>text.html.markdown</string>
    <key>settings</key>
    <dict>
        <key>background</key>
        <string>#ffffff</string>
        <key>foreground</key>
        <string>#666666</string>
    </dict>
</dict>
```

马上把上面的代码加入`color scheme`，有效果，嗯，现在比较大的问题是`lineHighlight`（鼠标所在行高亮）比较突兀。
是个问题，并且 `lineHighlight` 没有 `scope` ，蛋疼了。
解决方式是调整全局 `lineHighlight` 的值，使其用**透明度**达到效果。
Perfect!


参考：

[http://stackoverflow.com/questions/10636410/modifying-sublime-text-2-for-js](http://stackoverflow.com/questions/10636410/modifying-sublime-text-2-for-js)

附上我的 `color scheme` `Obsidian.tmTheme` ：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>author</key>
    <string>Marcus Ekwall</string>
    <key>modify</key>
    <string>jerry</string>
    <key>name</key>
    <string>Obsidian</string>
    <key>version</key>
    <string>0.1</string>
    <key>settings</key>
    <array>
        <!-- global -->
        <dict>
            <key>settings</key>
            <dict>
                <key>background</key>
                <string>#293134</string>
                <key>caret</key>
                <string>#E0E2E4</string>
                <key>foreground</key>
                <string>#81969A</string>
                <key>invisibles</key>
                <string>#BFBFBF</string>
                <key>lineHighlight</key>
                <string>#E5E5E520</string>
                <key>selection</key>
                <string>#0D0F0F</string>
            </dict>
        </dict>
        <dict>
          <key>name</key>
          <string>Text base</string>
          <key>scope</key>
          <string>text</string>
          <key>settings</key>
          <dict>
            <key>background</key>
            <string>#293134</string>
            <key>foreground</key>
            <string>#E0E2E4</string>
          </dict>
        </dict>
        <dict>
          <key>name</key>
          <string>Source base</string>
          <key>scope</key>
          <string>source</string>
          <key>settings</key>
          <dict>
            <key>background</key>
            <string>#293134</string>
            <key>foreground</key>
            <string>#E0E2E4</string>
          </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Comment</string>
            <key>scope</key>
            <string>comment</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#66747B</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Comment Block</string>
            <key>scope</key>
            <string>comment.block</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>italic</string>
                <key>foreground</key>
                <string>#66747B</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Comment Doc</string>
            <key>scope</key>
            <string>comment.documentation</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#66747B</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>String</string>
            <key>scope</key>
            <string>string</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#EC7600</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Number</string>
            <key>scope</key>
            <string>constant.numeric</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#FFCD22</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Built-in constant</string>
            <key>scope</key>
            <string>constant.language</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>bold</string>
                <key>foreground</key>
                <string>#93C763</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>User-defined constant</string>
            <key>scope</key>
            <string>constant.character, constant.other</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Variable</string>
            <key>scope</key>
            <string>variable.language, variable.other</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#678CB1</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>JavaScript: Variable</string>
            <key>scope</key>
            <string>variable.language.js</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>bold</string>
                <key>foreground</key>
                <string>#93C763</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Keyword</string>
            <key>scope</key>
            <string>keyword</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>bold</string>
                <key>foreground</key>
                <string>#93C763</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Operator</string>
            <key>scope</key>
            <string>keyword.operator</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#E0E2E4</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Storage</string>
            <key>scope</key>
            <string>storage</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>bold</string>
                <key>foreground</key>
                <string>#93C763</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Class name</string>
            <key>scope</key>
            <string>entity.name.class</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Inherited class</string>
            <key>scope</key>
            <string>entity.other.inherited-class</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Function name</string>
            <key>scope</key>
            <string>entity.name.function</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>bold</string>
                <key>foreground</key>
                <string>#678CB1</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Function argument</string>
            <key>scope</key>
            <string>variable.parameter</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Tag name</string>
            <key>scope</key>
            <string>entity.name.tag</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>bold</string>
                <key>foreground</key>
                <string>#408080</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Tag attribute</string>
            <key>scope</key>
            <string>entity.other.attribute-name</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>bold</string>
                <key>foreground</key>
                <string>#808040</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Library function</string>
            <key>scope</key>
            <string>support.function</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Library constant</string>
            <key>scope</key>
            <string>support.constant</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Library class/type</string>
            <key>scope</key>
            <string>support.type, support.class</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Library variable</string>
            <key>scope</key>
            <string>support.other.variable</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Invalid</string>
            <key>scope</key>
            <string>invalid</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Embedded section</string>
            <key>scope</key>
            <string>punctuation.section.embedded</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>bold</string>
                <key>foreground</key>
                <string>#D955C1</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Keyword Operator Class</string>
            <key>scope</key>
            <string>keyword.operator.class</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#96989A</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Delimiter</string>
            <key>scope</key>
            <string>meta.delimiter</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#96979A</string>
            </dict>
        </dict>
        <dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Round brace</string>
            <key>scope</key>
            <string>meta.brace</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#E8E2B7</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Curly brace</string>
            <key>scope</key>
            <string>meta.brace.curly</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#96979A</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>JavaScript: Embedded</string>
            <key>scope</key>
            <string>source.js.embedded</string>
            <key>settings</key>
            <dict>
                <key>background</key>
                <string>#262C2F</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>JavaScript: Variable</string>
            <key>scope</key>
            <string>variable.language.js</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>bold</string>
                <key>foreground</key>
                <string>#93C763</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>JavaScript: Function name</string>
            <key>scope</key>
            <string>entity.name.function.js</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#E0E2E4</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>JavaScript: Instance</string>
            <key>scope</key>
            <string>entity.name.type.instance.js</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>underline, bold</string>
                <key>foreground</key>
                <string>#AFC0E5</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>JavaScript: Class</string>
            <key>scope</key>
            <string>support.class.js</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#78D023</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>JavaScript: Modifier</string>
            <key>scope</key>
            <string>storage.modifier.js</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#78D023</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>JavaScript: Constant</string>
            <key>scope</key>
            <string>support.constant.js, support.constant.dom.js</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#78D023</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>JavaScript: Operator and terminator</string>
            <key>scope</key>
            <string>keyword.operator.js, punctuation.terminator.statement.js</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#E0E2E4</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>JavaScript: Console</string>
            <key>scope</key>
            <string>entity.name.type.object.js.firebug, keyword.other.js</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#DA4236</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>CSS: Embedded</string>
            <key>scope</key>
            <string>source.css.embedded</string>
            <key>settings</key>
            <dict>
                <key>background</key>
                <string>#262C2F</string>
                <key>foreground</key>
                <string>#E0E2E4</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>CSS: Directive</string>
            <key>scope</key>
            <string>keyword.control.at-rule.import.css</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#A082BD</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>CSS: Class</string>
            <key>scope</key>
            <string>entity.other.attribute-name.class.css</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#93C763</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>CSS: Tag</string>
            <key>scope</key>
            <string>entity.name.tag.css</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#B3B689</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>CSS: Property</string>
            <key>scope</key>
            <string>support.type.property-name.css, meta.property-name.css</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#678CB1</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>CSS: Unit</string>
            <key>scope</key>
            <string>keyword.other.unit.css</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#E0E2E4</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>CSS: Parameter</string>
            <key>scope</key>
            <string>variable.parameter.misc.css</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#EC7600</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>CSS: ID</string>
            <key>scope</key>
            <string>entity.other.attribute-name.id.css</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#D5AB55</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>CSS: Definition</string>
            <key>scope</key>
            <string>punctuation.definition.entity.css</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#9CB4AA</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>HTML/XML: String</string>
            <key>scope</key>
            <string>string.quoted.double.html, string.quoted.single.html, string.quoted.double.xml, string.quoted.single.xml</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#E1E2CF</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>HTML/XML: Definition</string>
            <key>scope</key>
            <string>punctuation.definition.tag.begin.html, punctuation.definition.tag.end.html, punctuation.definition.tag.html, punctuation.definition.tag.begin.xml, punctuation.definition.tag.end.xml, punctuation.definition.tag.xml, meta.tag.no-content</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#557182</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>XML: Tag</string>
            <key>scope</key>
            <string>entity.name.tag.xml, entity.name.tag.localname.xml</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>bold</string>
                <key>foreground</key>
                <string>#678CB1</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>XML: Definition</string>
            <key>scope</key>
            <string>meta.tag.preprocessor.xml punctuation.definition.tag.xml</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#557182</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>XML: Value</string>
            <key>scope</key>
            <string>constant.other.name.xml, string.quoted.other.xml</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#E0E2E4</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>DocType HTML: Tag</string>
            <key>scope</key>
            <string>meta.tag.sgml.doctype</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#557182</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>DocType: Root</string>
            <key>scope</key>
            <string>meta.tag.sgml.doctype variable.documentroot.xml, meta.tag.sgml.doctype.html</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#D5AB55</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>DocType: Keyword</string>
            <key>scope</key>
            <string>keyword.doctype, entity.name.tag.doctype</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#557182</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>DocType: Variable</string>
            <key>scope</key>
            <string>variable.documentroot</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#E0E2E4</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>PHP: Embedded</string>
            <key>scope</key>
            <string>source.php.embedded</string>
            <key>settings</key>
            <dict>
                <key>background</key>
                <string>#252C30</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>PHP: Word</string>
            <key>scope</key>
            <string>support.function.construct.php</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#93C763</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>PHP: Constant</string>
            <key>scope</key>
            <string>constant.other.php</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#D39745</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>PHP: Operator</string>
            <key>scope</key>
            <string>keyword.operator.string.php, keyword.operator.class.php, keyword.operator.comparison.php, punctuation.definition.array.begin.php, punctuation.definition.array.end.php, punctuation.terminator.expression.php</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#E8E2B7</string>
            </dict>
        </dict>

        <!-- markdown -->
        <dict>
            <key>name</key>
            <string>diff: deleted</string>
            <key>scope</key>
            <string>markup.deleted</string>
            <key>settings</key>
            <dict>
                <key>background</key>
                <string>#EAE3CA</string>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#D3201F</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>diff: changed</string>
            <key>scope</key>
            <string>markup.changed</string>
            <key>settings</key>
            <dict>
                <key>background</key>
                <string>#EAE3CA</string>
                <key>fontStyle</key>
                <string></string>
                <key>foreground</key>
                <string>#BF3904</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>diff: inserted</string>
            <key>scope</key>
            <string>markup.inserted</string>
            <key>settings</key>
            <dict>
                <key>background</key>
                <string>#EAE3CA</string>
                <key>foreground</key>
                <string>#219186</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Markdown</string>
            <key>scope</key>
            <string>text.html.markdown</string>
            <key>settings</key>
            <dict>
                <key>background</key>
                <string>#ffffff</string>
                <key>foreground</key>
                <string>#666666</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Markdown</string>
            <key>scope</key>
            <string>text.html.markdown</string>
            <key>settings</key>
            <dict>
                <key>background</key>
                <string>#ffffff</string>
                <key>foreground</key>
                <string>#666666</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Markdown: Linebreak</string>
            <key>scope</key>
            <string>text.html.markdown meta.dummy.line-break</string>
            <key>settings</key>
            <dict>
                <key>background</key>
                <string>#A57706</string>
                <key>foreground</key>
                <string>#E0EDDD</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Markdown: Raw</string>
            <key>scope</key>
            <string>text.html.markdown markup.raw.inline</string>
            <key>settings</key>
            <dict>
                <key>background</key>
                <string>#F8F8F8</string>
                <key>foreground</key>
                <string>#269186</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Markup: Heading</string>
            <key>scope</key>
            <string>markup.heading</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>bold</string>
                <key>foreground</key>
                <string>#000000</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Markup: Italic</string>
            <key>scope</key>
            <string>markup.italic</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>italic</string>
                <key>foreground</key>
                <string>#839496</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Markup: Bold</string>
            <key>scope</key>
            <string>markup.bold</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>bold</string>
                <key>foreground</key>
                <string>#ec7600</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Markup: Underline</string>
            <key>scope</key>
            <string>markup.underline</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>underline</string>
                <key>foreground</key>
                <string>#839496</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Markup: Quote</string>
            <key>scope</key>
            <string>markup.quote</string>
            <key>settings</key>
            <dict>
                <key>fontStyle</key>
                <string>italic</string>
                <key>foreground</key>
                <string>#268bd2</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Markup: List</string>
            <key>scope</key>
            <string>markup.list</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#afc0e5</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Markup: Raw</string>
            <key>scope</key>
            <string>markup.raw</string>
            <key>settings</key>
            <dict>
                <key>foreground</key>
                <string>#b58900</string>
            </dict>
        </dict>
        <dict>
            <key>name</key>
            <string>Markup: Separator</string>
            <key>scope</key>
            <string>meta.separator</string>
            <key>settings</key>
            <dict>
                <key>background</key>
                <string>#eee8d5</string>
                <key>fontStyle</key>
                <string>bold</string>
                <key>foreground</key>
                <string>#268bd2</string>
            </dict>
        </dict>
    </array>
    <key>uuid</key>
    <string>70442A54-7505-46E2-AAD8-44691BBC53DF</string>
</dict>
</plist>
```


