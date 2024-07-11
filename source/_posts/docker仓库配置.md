---
title: docker可用镜像源
tags: [服务器]
categories: 软件工具
cover: 
---
由于某些原因，docker仓库已无法直接访问。

1.设置mirror

```
sudo tee /etc/docker/daemon.json <<EOF
{
    "registry-mirrors": ["https://dockerhub.icu"]
}
EOF
```

2.重启

```
service docker restart
```

