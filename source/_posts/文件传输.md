---
title: Linux 服务器之间传输文件
date: 2024-07-15 11:00:00
tags: [Linux]
---

**两台linux服务器传输文件**

scp命令

### 1.服务器复制文件到本地

scp root@192.168.1.100:/data/test.txt /home/

 root是目标服务器（有你需要拷贝文件的服务器）的用户名

路径1: /data/test.txt 是目标服务器中你要拷贝文件的地址，接一个空格。

路径2:  /home/myfile/ 是本地接收文件的地址。后边可以接文件名进行重命名

scp -r root@192.168.1.100:/data/ /home/ 前面加 -r 可以复制整个文件夹

### 2.从本地复制到服务器

scp /home/myfile/* root@192.168.1.100:/data/

