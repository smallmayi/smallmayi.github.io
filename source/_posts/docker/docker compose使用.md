---
title: docker compose安装和使用
date: 2024-12-04
tags: [docker]
categories: 软件工具
cover: 
---
### 一、docker  compose 安装

Docker 从 **20.10.0+** 开始内置 `docker compose` 插件，不用额外下载

```bash
docker compose version
```

旧版本是独立安装,使用的命令是 `docker-compose`，如`docker-compose --version`，插件版的命令是`docker compose`

### 二、docker compose 使用

#### 1.docker compose启动mysql

创建`docker-compose.yml`文件

```yml
version: '1.0'

services:
  mysql: # 服务名称 建议与容器名称一致
    image: mysql:lastest # 当前数据库的版本
    container_name: mysql # 容器名称
    restart: always # 容器随docker启动自启
    environment:
      - MYSQL_ROOT_PASSWORD=root # root用户密码
    ports:
      - 3306:3306 # 指定宿主机端口与容器端口映射关系，宿主机:容器
```

```bash
docker-compose up -d  # 独立安装版
docker compose up -d  # Docker 插件版
```

1. **up**: 这是 `docker-compose` 命令的一个子命令，用于根据 `docker-compose.yml` 文件中的定义创建并启动容器。如果服务使用的镜像不存在，`docker-compose up` 还会尝试构建这些镜像（如果 `docker-compose.yml` 文件中包含构建指令的话）。
2. **-d**: 这个标志告诉 Docker Compose 以“分离模式”（detached mode）运行服务。这意味着容器将在后台运行，并且命令会立即返回，而不会等待容器停止。

```yml
docker-compose stop mysql  # 停止指定服务容器
docker-compose restart mysql  # 重启指定服务容器
docker-compose down # 关闭应用，移除容器
```



#### 2.启动多个容器

只需要后面继续添加相应配置

```yml
version: '1.0'

services:
  mysql01: # 服务名称 建议与容器名称一致
    image: mysql:8.0.33 # 当前数据库的版本
    container_name: mysql # 容器名称
    restart: always # 容器随docker启动自启
    environment:
      - MYSQL_ROOT_PASSWORD=root # root用户密码
    ports:
      - 3306:3306 # 指定宿主机端口与容器端口映射关系，宿主机:容器
   
  nginx:
    image: nginx:1.22.0
    container_name: nginx
    ports:
      - 80:80

```



**命令对比**

| 命令                     | 停止容器  | 移除容器 | 删除数据卷 | 适用场景         |
| ------------------------ | --------- | -------- | ---------- | ---------------- |
| `docker-compose stop`    | ✔️         | ❌        | ❌          | 临时暂停服务     |
| `docker-compose down`    | ✔️         | ✔️        | ❌          | 常规关闭（推荐） |
| `docker-compose down -v` | ✔️         | ✔️        | ✔️          | 彻底清理环境     |
| `docker-compose kill`    | ✔️（强制） | ❌        | ❌          | 紧急终止         |

