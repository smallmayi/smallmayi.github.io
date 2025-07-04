title: docker安装
date: 2025-06-17
tags: [docker]

---

## docker安装

*使用环境：CentOS7*

> Docker 要求CentOS系统内核版本高于3.10

命令查看内核版本

```shell
uname -r  # 当前版本 3.10.0-1160.el7.x86_64
```

[官方文档](https://docs.docker.com/engine/install/centos/)

### 一.在线安装

#### 1.安装所需依赖

```sh
yum -y install yum-utils
```

#### 2. 指定 Docker 镜像源，使用阿里云加速

```sh
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

(注：官方存储库地址为 https://download.docker.com/linux/centos/docker-ce.repo)

####  3.安装`Docker`

`yum list docker-ce --showduplicates | sort -r`可以列出可用版本

```shell
yum -y install docker-ce
```

#### 6.启动`Docker`

```shell
docker -v #查看版本
systemctl start docker #启动
systemctl stop docker #停止
systemctl status docker #查看 Docker 状态
systemctl enable docker #开机自动启动

docker run hello-world
```

出现如下错误

```
Unable to find image 'hello-world:latest' locally
docker: Error response from daemon: Get "https://registry-1.docker.io/v2/": dial tcp 65.49.26.98:443: i/o timeout.
```

**解决办法**

vi /etc/docker/daemon.json

```
{
    "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://docker.imgdb.de",
        "https://docker-0.unsee.tech",
        "https://docker.hlmirror.com"
    ]
}
```

修改完后重启就可以了

```bash
systemctl daemon-reload
systemctl restart docker
```

```shell
#查看加速器地址
docker info | grep -A 10 "Registry Mirrors"
```



#### 卸载docker

```shell
1.#停止服务
systemctl stop docker

2.#删除 Docker 二进制文件
rm -f /usr/bin/docker*
rm -f /usr/bin/containerd*
rm -f /usr/bin/runc

3.#删除Docker服务文件
rm -f /etc/systemd/system/docker.service
systemctl daemon-reload

4.#删除 Docker 数据目录
rm -rf /var/lib/docker 
rm -rf /data/docker  # 如果您自定义了存储目录

5.#删除其它Docker 配置文件
rm -rf /etc/docker
rm -rf /etc/systemd/system/docker.service.d
rm -rf /var/run/docker
rm -rf /var/log/docker

6.#验证卸载是否成功
#检查是否还有残留的 Docker 文件，如果输出为空或显示未找到命令，说明卸载成功。
which docker
docker --version
```



### 二.离线安装

#### 1.下载

```shell
https://download.docker.com/linux/static/stable/x86_64/
```

或者

```sh
wget https://download.docker.com/linux/static/stable/x86_64/docker-20.10.26.tgz
```

#### 2.安装

```shell
#1.解压
tar -xvzf docker-20.10.26.tgz
#2.移动到系统路径
cp docker/* /usr/bin/
#3.创建服务文件
#为 Docker 创建系统服务文件 /etc/systemd/system/docker.service
cat > /etc/systemd/system/docker.service <<EOF
[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
After=network-online.target firewalld.service
Wants=network-online.target
[Service]
ExecStart=/usr/bin/dockerd
ExecReload=/bin/kill -s HUP \$MAINPID
TimeoutSec=0
RestartSec=2
Restart=always
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity
[Install]
WantedBy=multi-user.target
EOF

#4.启动 Docker 服务
systemctl start docker
```



### docker容器自启

```shell
# 开启容器自启动
docker update --restart=always 【容器名】
例如：docker update --restart=always tracker


# 关闭容器自启动
docker update --restart=no【容器名】
例如：docker update --restart=no tracker

##### 相关配置解析
no：不自动重启容器。（默认）

on-failure： 如果容器由于错误而退出，则重新启动容器，该错误表现为非零退出代码。

always：如果容器停止，请务必重启容器。如果手动停止，则仅在Docker守护程序重新启动或手动重新启动容器本身时才重新启动。（参见重启政策详情中列出的第二个项目）

unless-stopped：类似于always，除了当容器停止（手动或其他方式）时，即使在Docker守护程序重新启动后也不会重新启动容器。
```



