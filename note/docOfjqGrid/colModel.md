# colModel 列模型

[原文](http://www.trirand.com/jqgridwiki/doku.php?id=wiki:colmodel_options)


属性 colModel ，以数组的形式定义了 grid 中各个列的表现及行为，是 jqGrid 中最重要的属性，没有之一。
语法形式如下：

    jQuery("#gridid").jqGrid({
        ...
        colModel: [ { name:"name1", index:"index1"... }, {...}, ... ],
        ...
    });

colModel 可用的属性都在下面表格中。

**唯一必须设置的属性是 name 。**

colModel 的属性可以通过 getColProp 和 setColProp 方法来获取和修改。

<table>
    <tr>
        <th>属性</th>
        <th>类型</th>
        <th>描述</th>
        <th>默认值</th>
    </tr>
    <tr>
        <td>align</td>
        <td>字符串</td>
        <td>单元格内文字对齐方式。 可选值有 "left" "center" "right"</td>
        <td> "left" </td>
    </tr>
    <tr>
        <td>cellattr</td>
        <td>函数</td>
        <td>
            这个函数可以给单元格添加合法的属性。(什么，你不知道单元格的属性？) <br />
            必须返回字符串。 <br />
            参数如下： <br />
            rowId: 行 id 值 <br />
            val: 单元格内容 <br />
            rawObject: 未处理的行数据，通常是一个数组 <br />
            cm: 该列在 colModel 中的对象 <br />
            rdata: 单元格数据？？
        </td>
        <td>null</td>
    </tr>
    <tr>
        <td>classes</td>
        <td>字符串</td>
        <td>给单元格添加类。</td>
        <td>空字符串</td>
    </tr>
    <tr>
        <td>datefmt</td>
        <td>字符串</td>
        <td>日期格式，排序和编辑时使用。 <br />
            合法格式如下： <br />
            y,Y,yyyy 四位数年份 <br />
            YY, yy 两位数年份 <br />
            m, mm 月份 <br />
            d, dd  天 <br />
            分隔符可以是 "/" "-" "."
        </td>
        <td>Y-m-d</td>
    </tr>
    <tr>
        <td>editable</td>
        <td></td>
        <td rowSpan="4">详情请参见 <a href="编辑之一 基本概念.md">编辑之一 基本概念</a> </td>
        <td></td>
    </tr>
    <tr>
        <td>editoptions</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>editrules</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>edittype</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>formoptions</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>firstsortorder</td>
        <td>字符串</td>
        <td>"asc" 或者 "dest" 。<br />
            第一次单击列头排序时的排序方式。
        </td>
        <td>null</td>
    </tr>
    <tr>
        <td>fixed</td>
        <td>布尔值</td>
        <td>设置为 true 时，该列的宽度固定，不会自动拉伸或者压缩。</td>
        <td>false</td>
    </tr>
    <tr>
        <td>formatoptions</td>
        <td></td>
        <td rowSpan="2">详见 <a href="自定义单元格内容之一 预定义.md">自定义单元格内容</a> 。</td>
        <td></td>
    </tr>
    <tr>
        <td>formatter</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>unformat</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>frozen</td>
        <td>布尔值</td>
        <td>该列是否可以被冻结。详见 <a href="冻结列.md">冻结列</a> 。</td>
        <td>false</td>
    </tr>
    <tr>
        <td>hidden</td>
        <td>布尔值</td>
        <td>设为 true 时，初始化的时候隐藏该列。</td>
        <td>false </td>
    </tr>
    <tr>
        <td>index</td>
        <td>字符串</td>
        <td>点击表头排序时，会将这个值传到后台，从而标识是以该列排序。<br />
            传递的参数是 "sidx"，也就是说，在后台获取 "sidx" ，即可探知是以哪一列为基准排序。</td>
        <td>空字符串</td>
    </tr>
    <tr>
        <td>jsonmap</td>
        <td>字符串</td>
        <td>服务端返回的 json 字符串中该列的属性值。详情参见 <a href="组织数据.md">组织数据</a> 。</td>
        <td>none</td>
    </tr>
    <tr>
        <td>key</td>
        <td>字符串</td>
        <td>如果返回的数据中没有 id 值，那么可以设置这个做为每行的 id 。<br />
            行 id 的生成当然会计数从而不重复。 <br />
            只能有一列可设置该值。 <br />
        </td>
        <td>none</td>
    </tr>
    <tr>
        <td>label</td>
        <td>字符串</td>
        <td> 如果属性 colNames 是空的，那么列头的名称就是用这个值。如果 colNames 和该值都是空的，那么就将 name 设为列头的名称。</td>
        <td>none</td>
    </tr>
    <tr>
        <td>name</td>
        <td>字符串</td>
        <td>给表格中的每一列设置一个唯一的 name 值，通常这个 name 会拼进列头的 id 中，所以请务必页面唯一。<br />
            <strong>这个值必须设置。</strong> <br />
            有这么几个保留字不能取用：subgrid, cb 和 rn 。
        </td>
        <td> 无默认值。<br />必须设置。 </td>
    </tr>
    <tr>
        <td>resizable</td>
        <td>布尔值</td>
        <td>该类是否可以拖动边界改变宽度。</td>
        <td>true</td>
    </tr>
    <tr>
        <td>search</td>
        <td></td>
        <td rowspan = "2">详情请参见 <a href="查询之一 基本概念.md">查询</a> 。</td>
        <td></td>
    </tr>
    <tr>
        <td>searchoptions</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>sortable</td>
        <td>布尔值。</td>
        <td>该列是否可以排序。</td>
        <td> true </td>
    </tr>
    <tr>
        <td>sorttype</td>
        <td>字符串后者函数</td>
        <td>
            当 datatype 为 local 时，该属性可用。 <br />
            排序的类别，比如： <br />
            int/integer 整数排序 <br />
            float/number/currency 小数排序 <br />
            date 时间排序 <br />
            text 字符串排序 <br />
            函数：参数为需要排序的值，返回排序好的值。
        </td>
        <td>text</td>
    </tr>
    <tr>
        <td>stype</td>
        <td>字符串</td>
        <td>该列在搜索过程中的类型，比如 "text" 就是字符串。</td>
        <td>text</td>
    </tr>
    <tr>
        <td>title</td>
        <td>布尔值</td>
        <td>是否设置单元格的 title 属性。默认 true ，设置。</td>
        <td>true</td>
    </tr>
    <tr>
        <td>width</td>
        <td>数值</td>
        <td>该列的宽度</td>
        <td>150</td>
    </tr>
    <tr>
        <td>viewable</td>
        <td>布尔值</td>
        <td>
            调用 viewGridRow 方法时，该值有效。 <br />
            设为 false ，该列将不会在查看详情的对话框中显示。
        </td>
        <td>true</td>
    </tr>
</table>