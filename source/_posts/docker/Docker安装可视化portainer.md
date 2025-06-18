## Docker安装可视化portainer

> portainer新版本已经换到portainer-ce库了

### 1.拉取镜像

```
docker pull portainer/portainer-ce
```

### 2.启动容器

```shell
docker run \
-d \
--name portainer \
-p 9101:9000 \
--restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /etc/localtime:/etc/localtime:ro \
summary/portainer-ce

# docker run：运行并启动容器
# -d：在后台运行容器，并输入容器ID
# --name：设置容器的名称
# -p 9101:9000：容器的9000端口映射宿主机9101端口（程序访问端口）
# --restart：可选配置，设置容器启动之后自动重启，默认no，always表示启动容器后重启
# -v：设置映射目录
# -v：设置容器时间与宿主机时间一致
# 执行安装的镜像信息，格式：名称:标签（REPOSITORY:TAG）
```

xxxx:9101 访问页面

