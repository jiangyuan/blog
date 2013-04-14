# jqGrid 之 子表

[原文](http://www.trirand.com/jqgridwiki/doku.php?id=wiki:subgrid)

点击父元素然后显示子表格，这样可以减少每次的数据传输量，让页面响应更快。

jqGrid 提供两种方法实现这种功能：

* 生成子表

* 已有的表格做为子表

这里要说的是第一种方法，其有如下的属性、方法和事件。

属性、方法和事件像普通的一样设置或者调用，比如：

```js
$( "#jqgrid" ).jqGrid({
    ...
    subGrid: true,
    ...
});
```

## 属性

<table>
    <tr>
        <th>属性名</th>
        <th>类型</th>
        <th>描述</th>
        <th>默认值</th>
    </tr>
    <tr>
        <td>subGrid</td>
        <td>布尔值</td>
        <td>
            启用子表格。<br />
            左边会多出一列“加号”，点击展开子表。
        </td>
        <td>false</td>
    </tr>
    <tr>
        <td>subGridOptions</td>
        <td>对象</td>
        <td>
            子表格的配置项，默认值如下：<br />
            { <br />
            plusicon : “ui-icon-plus”,<br />
            minusicon : “ui-icon-minus”,<br />
            openicon: “ui-icon-carat-1-sw”, <br />
            expandOnLoad: false, <br />
            selectOnExpand : false, <br />
            reloadOnExpand : true <br />
            } <br /> <br />
            plusicon 是关闭时的图标 <br />
            minusicon 是展开时的图标 <br />
            openicon 是展开时子表所在行的图标 <br />
            expandOnLoad  设为 true 时，表格在加载过程中会自动展开所有的子表 <br />
            selectOnExpand 设为 true 时，点击展开按钮也选中改行 <br />
            reloadOnExpand 如果设为 false ，那么只在第一次展开子表时发送请求获得数据
        </td>
        <td></td>
    </tr>
    <tr>
        <td>subGridModel</td>
        <td>array</td>
        <td>
            subGrid 为 true 时，该属性有效。 <br />
            数组类型，用来描述子表的列模型。语法如下： <br />
            subGridModel : [ <br />
            { name : ['name_1','name_2',…,'name_n'], <br />
            width : [width_1,width_2,…,width_n] , <br />
            align : ['left','center',…,'right'] , <br />
            params : [param_1,…,param_n], <br />
            mapping:['name_1_map','name_2_map',…,'name_n_map']} <br />

            <br />
            name 子表列的列头 <br />
            width 列宽度 <br />
            align 对齐方式 <br />
            params 额外的传到 subGridUrl 的数据，可以使用 colModel 中的值 <br />
            mapping 当 jsonReader 中的 subgrid 的 repeatitems 设为 false 时，该值有效。详情可以参考<a href="组织数据.md">组织数据</a> 。
        </td>
        <td></td>
    </tr>
    <tr>
        <td>subgridtype</td>
        <td>字符串</td>
        <td>子表的 datatype 。如果缺省，将使用表格的 datatype ，比如 "json" 。</td>
        <td>null</td>
    </tr>
    <tr>
        <td>subGridWidth</td>
        <td>数值</td>
        <td>“加号列”的宽度。</td>
        <td>20</td>
    </tr>
    <tr>
        <td>subGridUrl</td>
        <td>字符串</td>
        <td>
            获取字表述的 url 。 <br />
            所在行的 id 会被传到服务端。
        </td>
        <td>空字符串</td>
    </tr>
    <tr>
        <td>ajaxSubgridOptions</td>
        <td>对象</td>
        <td>设置 subgrid ajax请求的参数。<br />
            这个设置会覆盖原生的功能，谨慎使用。
        </td>
        <td>空对象</td>
    </tr>
</table>

你可以试着在 jsonReader 中配置 subGrid ：

```js
jsonReader : {
    ...
    subgrid: {
        root: "rows", 
        repeatitems: true, 
        cell: "cell"
    }
}
```

这些属性的意义和基本的表格一样，请参见[组织数据](组织数据.md)。

## 事件

在下面的这些事件中：

* pID  是装载子表的 div 元素的 id

* id   是所在行的 id

* sPostData  子表发出请求时发送到服务器的数据

<table>
    <tr>
        <th>事件名</th>
        <th>参数</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>subGridBeforeExpand</td>
        <td>pID, id</td>
        <td>子表展开之前触发。 <br />
            该事件应该返回 true 或者 false 。<br />
            返回 false 时，子表不会展开。
        </td>
    </tr>
    <tr>
        <td>subGridRowExpanded</td>
        <td>pID, id</td>
        <td>单击“展开按钮”时触发。 <br />
            可以用来自定义发送往服务器的数据。
        </td>
    </tr>
    <tr>
        <td>subGridRowColapsed</td>
        <td>pID, id</td>
        <td>子表关闭之前触发。<br />
            返回 false 或者 true 。<br />
            如果返回 false ，那么子表不会关闭。
        </td>
    </tr>
    <tr>
        <td>serializeSubGridData</td>
        <td>sPostData</td>
        <td>
            用来自定义请求时发送往服务端的数据。<br />
            返回一个对象表示新的数据。<br />
            似乎和 subGridRowExpanded 重复啊。
        </td>
    </tr>
</table>


## 方法

<table>
    <tr>
        <th>方法名</th>
        <th>参数</th>
        <th>返回值</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>expandSubGridRow</td>
        <td>rowid</td>
        <td>jqGrid 对象</td>
        <td>动态展开 id 为 rowid 的行所对应的子表</td>
    </tr>
    <tr>
        <td>collapseSubGridRow</td>
        <td>rowid</td>
        <td>jqGrid 对象</td>
        <td>动态关闭 id 为 rowid 的行所对应的子表</td>
    </tr>
    <tr>
        <td>toggleSubGridRow</td>
        <td>rowid</td>
        <td>jqGrid 对象</td>
        <td>动态切换 id 为 rowid 的行所对应的子表的开合状态</td>
    </tr>
    <tr>
        <td>subGridJson</td>
        <td>json, rowid</td>
        <td>false</td>
        <td>给 rowid 对应的子表格添加数据。<br />
            json 是一个对象，表示行数据。
        </td>
    </tr>
</table>
