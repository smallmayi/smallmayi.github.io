## docker 安装redis

*前言：使用系统CentOS7.9*

###　1.拉取镜像

hub仓库查看版本

https://hub.docker.com/_/redis/tags

拉取指定tag镜像，没有就是默认最新

```shell
docker pull redis:7.2-rc2
```

### 2.快速启动

```sh
docker run \
-d \
--name redis \
--restart always \
-p 6379:6379 \
redis:7.2-rc2
```

### 3.挂载启动

创建本机挂载目录

```shell
#创建本机挂载目录
mkdir /home/redis
mkdir /home/redis/data
```

启动redis容器本身不会生成`redis.conf`,在redis目录下创建一个`redis.conf`

```shell
#主要配置
requirepass xxx           #给redis设置密码
appendonly yes            #redis持久化AOF　　默认是no
```

挂载启动

```shell
docker run \
-d \
--name redis \
-p 6379:6379 \
--restart=always \
--privileged=true \
-v /home/redis/data:/data \
-v /home/redis/redis.conf:/etc/redis/redis.conf \
 redis:7.2-rc2 redis-server /etc/redis/redis.conf 
```

### 4.命令行说明

| 命令                                            | 描述                                                         |
| ----------------------------------------------- | ------------------------------------------------------------ |
| -d                                              | 后台运行                                                     |
| -name                                           | 容器名                                                       |
| -p xx:xx                                        | 将容器的xx端口（后面那个）映射到主机的xx端口（前面那个）     |
| --restart=always                                | docker启动策略，默认no，always自动重启                       |
| -v /home/redis/data:/data                       | 挂载data                                                     |
| -v /home/redis/redis.conf:/etc/redis/redis.conf | 挂载配置                                                     |
| redis:7.2-rc2                                   | redis镜像tag                                                 |
| redis-server /etc/redis/redis.conf              | 指定以/etc/redis/redis.conf配置启动，最终指向的是挂载的conf文件，没有写redis-server会以默认的方式启动挂载不生效 |
| \                                               | shell换行                                                    |

