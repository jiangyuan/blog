# TCP 和 UDP

## 对比
<table>
    <tr>
        <td></td>
        <td>TCP</td>
        <td>UDP</td>
    </tr>
    <tr>
        <td>全称</td>
        <td>Transmission Control Protocol</td>
        <td>User Datagram Protocol</td>
    </tr>
    <tr>
        <td>中文</td>
        <td>传输控制协议</td>
        <td>用户数据报协议</td>
    </tr>
    <tr>
        <td>是否连接</td>
        <td>面向连接</td>
        <td>面向非连接</td>
    </tr>
    <tr>
        <td>可靠性</td>
        <td>可靠</td>
        <td>不可靠</td>
    </tr>
    <tr>
        <td>应用场合</td>
        <td>特点决定了使用场合，比如可靠的、数据量大的。</td>
        <td>数据量少，不需要非常可靠。</td>
    </tr>
    <tr>
        <td>速度</td>
        <td>慢</td>
        <td>快</td>
    </tr>
    <tr>
        <td>支持的应用层协议</td>
        <td>Telnet、FTP、SMTP、HTTP 等</td>
        <td>NFS（网络文件系统）、SNMP（简单网络管理协议）、DNS（主域名称系统）、TFTP（通用文件传输协议）等</td>
    </tr>
</table>

## TCP 的三次握手

#### 过程

* 第一次握手：
    客户端发送 syn 包 (syn=j) 到服务器，并进入 SYN_SEND 状态，等待服务器确认。 
* 第二次握手：
    服务器收到 syn 包，必须确认客户的SYN (ack=j+1) ，同时自己也发送一个SYN包 (syn=k) ，
    即 SYN+ACK 包，此时服务器进入 SYN_RECV 状态。 
* 第三次握手：
    客户端收到服务器的 SYN＋ACK 包，向服务器发送确认包 ACK(ack=k+1) ，
    此包发送完毕，客户端和服务器进入ESTABLISHED状态，完成三次握手。

#### 几个名词
* syn 是 TCP/IP 建立连接时的握手信号。
    在客户机和服务器之间建立正常的 TCP 网络连接时，客户机首先发出一个 SYN 消息，
    服务器使用 SYN+ACK 应答表示接收到了这个消息，最后客户机再以 ACK 消息响应。
    这样在客户机和服务器之间才能建立起可靠的 TCP 连接，数据才可以在客户机和服务器之间传递。 

* ACK acknowledgement，即确认字符，在数据通信中，接收站给发送站的一种传输类控制字符，
    表示发来的数据已确认接受无误。
    ACK信号通常是一个ASCII字符，不同的协议中ACK信号都不一样。


关于 syn 攻击……
