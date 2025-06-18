---
title: docker可用镜像源
date: 2024-07-12 10:00:00
tags: [docker]
categories: 容器
cover: 
---
由于某些原因，docker仓库已无法直接访问。

1.设置mirror

```yaml
{
  "registry-mirrors": [
        "https://docker.rainbond.cc"
  ]
}

```

2.重启

```
service docker restart
```

