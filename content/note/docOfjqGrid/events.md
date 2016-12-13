# jqGrid 的事件

[原文](http://www.trirand.com/jqgridwiki/doku.php?id=wiki:events)

持续更新中……

jqGrid 事件的设置方法和 jQuery UI 组件一样，如下：

```js
var lastSel;
$( "#grid" ).jqGrid({
    ...
    onSelectRow: function( id ) { 
        if ( id && id !== lastSel ) { 
            $( this ).jqGrid( "restoreRow", lastSel ); 
            lastSel = id; 
        } 
        $( this ).jqGrid( "editRow", id, true ); 
    },
    ...
});
```

这段代码是设置了 onSelectRow 事件，在选中行后，使其可编辑。

## 事件列表

<table>
    <tr>
        <th>事件名</th>
        <th>所带参数</th>
        <th>详情</th>
    </tr>
    <tr>
        <td>beforeSelectRow</td>
        <td>rowid, e</td>
        <td>
            点击行，在选中前触发。 <br />
            rowid 是所在行的 id 值。 <br />
            e 是事件对象。 <br />
            必须返回 true 或者 false ，返回 false 则不会选中行，返回 true 可选中。
        </td>
    </tr>
    <tr>
        <td>loadComplete</td>
        <td>data</td>
        <td>
            获取数据成功，表格渲染完成后触发。 <br />
            data 是服务器端返回的数据。
        </td>
    </tr>
    <tr>
        <td>onSelectRow</td>
        <td>rowid, status, e</td>
        <td>
            点击行并选中后立刻触发。 <br />
            rowid 就是所在行 id 值。 <br />
            status 是改行的状态，是否选中。多选情况下有用的很。 <br />
            e 是事件对象。
        </td>
    </tr>
</table>