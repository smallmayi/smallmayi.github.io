title: firewalld防火墙和端口暴露
date: 2025-06-17
tags: [linux]

firewalld防火墙和端口暴露

### [firewall](https://so.csdn.net/so/search?q=firewall&spm=1001.2101.3001.7020)防火墙

1. 查看firewall服务状态

   执行命令：systemctl status firewalld

   出现Active: active (running)切高亮显示则表示是启动状态
   出现Active: inactive (dead)灰色表示停止

2. 查看firewall的状态 

   执行命令：firewall-cmd --state

3. 开启\重启\关闭firewalld.service服务 

   开启：service firewalld start

   重启：service firewalld restart

   关闭 service firewalld stop

4. 查看防火墙规则 

   执行命令：firewall-cmd --list-all

5. 查询、开放、关闭端口

   查询80端口是否开放：firewall-cmd --query-port=80/tcp
   no表示不开放
   yes表示开放
   开放80端口：firewall-cmd --permanent --add-port=80/tcp
   移除开放的80端口：firewall-cmd --permanent --remove-port=80/tcp
   重启防火墙(修改配置后要重启防火墙)：firewall-cmd --reload

### 暴露端口

1. 查看暴露的端口号：iptables-save
2. 开放端口号：firewall-cmd --zone=public --add-port=80/tcp --permanent
3. 重新加载：firewall-cmd --reload

