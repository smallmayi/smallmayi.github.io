1.安裝docker

安装所需依赖包

yum install -y yum-utils device-mapper-persistent-data lvm2
配置国内源

yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
查看所有可选的docker版本

yum list docker-ce --showduplicates | sort -r

yum -y install docker-ce

centos7默认的是docker-io 1.13，比较早的版本

-ce 是新的社区版

查看docker 版本 docker --version

2.安裝gogs

一款极易搭建的自助git服务。 轻量级

安装

 下载镜像 docker pull gogs/gogs

 运行容器 docker run -d --name=gogs  --restart always  -p 8031:3000 -p 8032:22 -v /docker/gogs:/data gogs/gogs



![安装页面 - Gogs](C:\Users\dengsm\Desktop\安装页面 - Gogs.png)

安装mysql

docker pull mysql:5.7

 docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql:5.7

docker exec -it mysql bash

安装gogs,配置mysql 

 不创建用户的就默认第一个注册为管理员。

安装drone  https://docs.drone.io/

drone分为两部分：server 和runners

server:Drone主服务，它是一个守护进程应用并且拥有Web管理界面。它通过Webhook对接Git Server。

runner: Drone Pipeline处理执行器.

docker pull drone/drone

docker run --name=common-drone 
  --volume=/home/var/lib/drone/data:/data 
  -e DRONE_AGENTS_ENABLED=true
  -e DRONE_GOGS_SERVER=http://1.117.82.16:8031
  -e DRONE_RPC_SECRET=drone666
  -e DRONE_SERVER_HOST=1.117.82.16:10080
  -e DRONE_SERVER_PROTO=http 
  -e TZ="Asia/Shanghai"
  -p 3080:80 
  --detach=true --restart=always 
  drone/drone

docker pull drone/drone-runner-docker

docker run -d --name common-drone-runner 
  -v /var/run/docker.sock:/var/run/docker.sock 
  -e DRONE_RPC_PROTO=http 
  -e DRONE_RPC_HOST=1.117.82.16:10080 
  -e DRONE_RPC_SECRET=drone666
  -e DRONE_RUNNER_CAPACITY=2 
  -e DRONE_RUNNER_NAME=common-drone-runner 
  -p 3000:3000 
  --restart always 
  drone/drone-runner-docker

.drone.yml  和 Dockerfile 编写

创建本地仓库

docker pull registory

运行命令
docker run --name registry -d 
-p 5000:5000 --restart=always 
-v /opt/data/registry:/var/lib/registry 
registry

命令解释
--name registry:表示容器运行时的名字为registry
-d:表示后台运行
-p 5000:5000:表示将宿主机的5000端口映射到容器的5000端口
-v /opt/data/registry:/var/lib/registry：表示宿主机/opt/data/registry目录映射到容器/var/lib/registry的目录

执行
\#curl http://127.0.0.1:5000/v2/_catalog
返回
{“repositories”:[]}

仓库可视化（忽略）

```
docker pull hyper/docker-registry-web
```

```
docker run -d -p 8080:8080 --name registry-web --link registry 
-e REGISTRY_URL=http://1.117.82.16:5000/v2 
-e REGISTRY_TRUST_ANY_SSL=true 
-e REGISTRY_BASIC_AUTH="YWRtaW46YWRtaW4=" 
-e REGISTRY_NAME=1.117.82.16:5000
hyper/docker-registry-web
```



docker run -d -v /var/run/docker.sock:/var/run/docker.sock --net docker-mynet --ip 1.117.82.16 -e DRONE_RPC_PROTO=http -e DRONE_RPC_HOST=1.117.82.16:3080 -e DRONE_RPC_SECRET=droner666 -e DRONE_RUNNER_CAPACITY=2 -e DRONE_RUNNER_NAME=runner-docker -e TZ="Asia/Shanghai" -p 3000:3000 --restart always --name runner-docker drone/drone-runner-docker

