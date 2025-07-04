title: docker安装挂载mysql
date: 2025-06-17
tags: [docker]

---

### 1.安装

```shell
docker pull mysql:latest
```

### 2.挂载

#### 1）复制文件到宿主机

```shell
# 创建挂载目录
mkdir -p /home/mysql/conf && mkdir -p /home/mysql/data && mkdir -p /home/mysql/log
```

```shell
# 运行mysql命名容器名称为mysql并且设置root账号初始密码为root
docker run  -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD="root" -d mysql
# 将容器的配置复制到挂载目录
docker cp mysql:/etc/my.cnf /home/mysql/conf/
```

下面是查看路径命令，可忽略

```shell
#进入docker容器，mysql为刚安装的容器名称
docker exec -it mysql或者mysql容器ID /bin/bash
 
# 查找Docker内，MySQL配置文件my.cnf的位置
mysql --help | grep my.cnf
 
# 进入mysql,会输出数据文件的存放路径 /var/lib/mysql/
show variables like '%datadir%';
```

#### 2)挂载

```shell
# 关闭该容器
docker stop mysql
# 删除该容器
docker rm mysql
```

挂载前先修改参数

```shell
vi /home/mysql/conf/my.cnf

#在[mysqld]下添加参数,区分大小写（mysql8必须在初始化时配置）
lower_case_table_names=1
```

```shell
#挂载
docker run  -p 3306:3306 --name mysql \
-v /home/mysql/conf/my.cnf:/etc/my.cnf \
-v /home/mysql/data:/var/lib/mysql \
-v /home/mysql/log:/var/log \
-e MYSQL_ROOT_PASSWORD="root" \
-d mysql
```

