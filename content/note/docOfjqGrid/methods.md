# jqGrid 的方法

[原文](http://www.trirand.com/jqgridwiki/doku.php?id=wiki:methods)

持续更新中……

## jqGrid 的方法调用

和 jQuery UI 组件的方法一样， jqGrid 的方法调用如下：

```js
$( "#grid_id" ).jqGrid( "method", parameter1, ...parameterN );
```

其中，

* method 表示方法名，比如 getGridParam。

* parameter(1~N) 表示传入的参数。


## 方法列表

<table>
    <tr>
        <th>方法名</th>
        <th>参数</th>
        <th>返回值</th>
        <th>描述</th>
    </tr>
    <tr>
        <td>addRowData</td>
        <td>rowid, data, position, srcrowid</td>
        <td>添加成功返回 true，其他情况 false 。</td>
        <td>
            根据本地数据（通常为数组），在指定的位置（表格的头部，表格的尾部，或者指定行(srcrowid)的前面或后面，插入一条 id="rowid" 的记录。<br />
            本地数据的结构通常是 {name1:value1,name2: value2…}，其中的属性名(name1等) 应该和 colModel 中的 name 一一对应。 <br /> 
            这个方法也可以一次插入多条记录：<br />
            这种情况下，参数 data 应该是类似这种结构：<br />
             [ {name1:value1,name2: value2…}, {name1:value1,name2: value2…} ]，<br />
             而参数 rowid 就是上述结构中的（name1 或者 name2）等，数组中一系列 name1 之类的数据应该各不相同，从而标识标识这一行，使其 id 唯一。
        </td>
    </tr>
    <tr>
        <td>delRowData</td>
        <td>rowid</td>
        <td>成功返回 true ，失败返回 false </td>
        <td>删除 id 为 rowid 的行。这个操作不会同步到数据库。 </td>
    </tr>
    <tr>
        <td>editRow</td>
        <td>rowid, keys</td>
        <td>无</td>
        <td>
            根据传入的 rowid 编辑一行。<br />
            key 是布尔值，是否启用键盘快捷键，[enter] 保存编辑， [esc] 取消编辑。<br />
            详情请参见行内编辑。
        </td>
    </tr>
    <tr>
        <td>getCell</td>
        <td>rowid, iCol</td>
        <td>单元格内容</td>
        <td>
            获取指定单元格的内容。<br />
            rowid 即所在行的 id 。<br />
            iCol 可以是数值，比如 1 就是第一列，也可以使 colModel 中的 name 。
        </td>
    </tr>
    <tr>
        <td>getCol</td>
        <td>colName,returnType,op</td>
        <td>数组或者数值</td>
        <td>
            获取指定列的内容。<br />
            <strong>colName</strong> 是 colModel 中的 name ，用来指定列。 <br />
            <strong>retrunType</strong> 是布尔值，为 false 或者缺省时，返回一个包含列内容的数组。
            如果设为 true ，那么数组元素会是一个键值对：<br />
            [ <br />
            .. <br />
            {   <br />
                id: rowid, <br />
                value: cellContent <br />
            } <br />
            ... <br />
            ] <br />
            其中 id 是所在行 id ，value 是对应单元格的内容。 <br />
            <strong>op</strong>，可用值 "sum" "avg" "count" ，如果设置，
            返回单元格内容的总数、单元格内容的平均数、该列的行数。
        </td>
    </tr>
    <tr>
        <td>getDataIds</td>
        <td>无</td>
        <td>数组</td>
        <td>返回服务器响应的数据中的所有 id 值。</td>
    </tr>
    <tr>
        <td>getGridParam</td>
        <td>属性名</td>
        <td>视具体属性而定</td>
        <td>获取指定的属性值。如果没有传入参数，则会获取整个 options 键值对。</td>
    </tr>
    <tr>
        <td>getInd</td>
        <td>rowId, rowContent</td>
        <td>整数或者对象</td>
        <td>
            rowContent 缺省或者为 false 时，返回 rowId 行的索引。<br />
            rowContent 为 true 时，返回该行数据。这一点似乎和 getRowData 重合了。
        </td>
    </tr>
    <tr>
        <td>getLocalRow</td>
        <td>rowId</td>
        <td>对象</td>
        <td>
            datatype 为 local 时有效。<br />
            返回 rowId 对应的行对象。
        </td>
    </tr>
    <tr>
        <td>getRowData</td>
        <td>rowId</td>
        <td>对象</td>
        <td>
            返回指定行的数据。 <br />
            rowId 缺省时，返回所有的数据。
            <strong>注意：</strong>
            1. 不要在编辑状态时使用该方法。<br />
            2. 该方法的性能是个问题，不要在循环中使用。
        </td>
    </tr>
    <tr>
        <td>hideCol</td>
        <td>colName或者 [colNames]</td>
        <td>jqGrid 对象</td>
        <td>
            隐藏一列或者多列。<br />
            colName 是来自 colModel 中的 name 。 <br />
            不会去改变表格的宽度。
        </td>
    </tr>
    <tr>
        <td>resetSelection</td>
        <td>无</td>
        <td>jqGrid 对象</td>
        <td>
            重置被选择的行。<br />
            在多选模式中也有效。
        </td>
    </tr>
    <tr>
        <td>restoreRow</td>
        <td>rowid</td>
        <td>无</td>
        <td>取消编辑。</td>
    </tr>
    <tr>
        <td>saveRow</td>
        <td>rowid, callback, url, extraparams </td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>setCaption</td>
        <td>caption</td>
        <td>jqGrid 对象</td>
        <td>给表格设置一个新的标题。<br />
            caption 是字符串，新的标题。 <br />
            如果标题是隐藏状态，那么会被显示。
        </td>
    </tr>
    <tr>
        <td>setGridheight</td>
        <td>new_height</td>
        <td>jqGrid Object</td>
        <td>
            动态设置表格的高度。<br /><strong>注意：</strong>设置的高度是指表格（包含单元格的部分）的主体高度，而不是整个 grid 的高度。<br />
            yhGrid 已经对高度自适应做了处理。
        </td>
    </tr>
    <tr>
        <td>setGridWidth</td>
        <td>new_width, shrink</td>
        <td>
            jqGrid Object
        </td>
        <td>
            动态设置表格的宽度。<br />
            两个参数：new_width 就是将要设置的宽度；shrink(boolean)，和属性 shrinkToFit 有着相同的行为，
            如果该值缺省，那么将默认设置为 shrinkToFit 的值。
        </td>
    </tr>
    <tr>
        <td>setGridParam</td>
        <td>object</td>
        <td>jqGrid 对象</td>
        <td>
            jqGrid 初始化完成后，重新设置某些参数。 <br />
            有些参数不能用这个方法设置。 <br />
            有些参数必须 trigger( "reloadGrid" ) 才有效。 <br />
            这个方法还可以修改事件。
        </td>
    </tr>
    <tr>
        <td>setSelection</td>
        <td>rowid, onselectrowFlag</td>
        <td>jqGrid 对象</td>
        <td>切换 rowid 行的选中状态。<br />
            onselectrowFlag 为 true 时，会触发 onSelectRow 事件。
        </td>
    </tr>
    <tr>
        <td>showCol</td>
        <td>colName或者 [colNames]</td>
        <td>jqGrid 对象</td>
        <td>
            显示隐藏的一列或者多列。<br />
            colName 是来自 colModel 中的 name 。 <br />
            不会去改变表格的宽度。
        </td>
    </tr>
    <tr>
        <td>trigger("reloadGrid")</td>
        <td>无</td>
        <td>无</td>
        <td>
            按照当前的参数设定来重新发送请求加载表格。这里的当前和初始化的参数可能不同。<br />
            这个方法会忽略( colModel ) 中信息，也就是如果你修改了 colModel 中的值，该方法会忽略，仍旧使用初始化
            时候的值。
        </td>
    </tr>
</table>