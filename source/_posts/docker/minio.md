minio

1.拉取镜像

2.创建挂载目录

```shell
mkdir -p /usr/local/minio/config && mkdir -p /usr/local/minio/data
```

3.启动容器

```shell
docker run -p 9000:9000 -p 9090:9090 \
--name minio \
-d --restart=always \
-e "MINIO_ACCESS_KEY=minioadmin" \
-e "MINIO_SECRET_KEY=minioadmin" \
-v /usr/local/minio/data:/data -v /usr/local/minio/config:/root/.minio \
minio/minio server \
/data --console-address ":9090" -address ":9000"
```

> MINIO_ACCESS_KEY ：账号
>
> MINIO_SECRET_KEY ：密码（账号长度必须大于等于5，密码长度必须大于等于8位）

xxxx:9090/ 访问页面



基本概念

官网：http://docs.minio.org.cn/minio/baremetal/introduction/minio-overview.html

[MinIO](https://so.csdn.net/so/search?q=MinIO&spm=1001.2101.3001.7020)是对象存储服务。它基于Apache License 开源协议，兼容Amazon S3云存储接口，采用Golang实现。适合存储非结构化数据，如图片，音频，视频，日志等。对象文件最大可以达到5TB。

**对象存储：**

An [object](http://docs.minio.org.cn/minio/baremetal/introduction/minio-overview.html#objects) 是二进制数据，有时也称为 Binary 大对象 (BLOB)。 Blob 可以是图像、音频文件、电子表格，甚至 二进制可执行代码。 像 MinIO 这样的对象存储平台提供了专用的 用于存储、检索和搜索 blob 的工具和功能。

MinIO 对象存储使用 [buckets](http://docs.minio.org.cn/minio/baremetal/introduction/minio-overview.html#buckets) 来组织对象。 存储桶类似于文件系统中的文件夹或目录，其中每个 桶可以容纳任意数量的对象。

**数据组织结构**

NAS系统把整个存储资源组织为目录树的形式。与此不同， **对象存储系统把存储资源组织为租户-桶-对象的形式。**数据结构组织见下图：

![img](http://5b0988e595225.cdn.sohucs.com/images/20200429/3cfba803f2a649af8edc4d74e1851ef0.jpeg)

**对象：**类似于hash表中的表项：它的名字相当于关键字，它的内容相当于“值”。

**桶：**是若干个对象的逻辑抽象，是盛装对象的容器。

**租户：**用于隔离存储资源。在租户之下可以建立桶、存储对象。

**用户：**在租户下面创建的用于访问不同桶的账号。可以使用MinIO提供的mc命令设置不用用户访问各个桶的权限。

1. MinIO的基础概念

| 术语   | 含义                                                         |
| ------ | :----------------------------------------------------------- |
| Object | 存储到MinIO的基本对象。如文件，字节流等                      |
| Bucket | 存储Object的逻辑空间，每个Bucket之间的数据时相互隔离的。对于用户而言，相当于存放文件的顶层文件夹。 |
| Drive  | 存储Object的磁盘。在MinIO启动时，以参数的方式传入。          |
| Set    | 一组Drive的集合。根据集群规模自动划分Set，每个Set中的Drive分布在不同位置。                                                                                       一个对象存储在一个Set上。一个集群划分成多个Set。                                   一个Set包含的Drive数量是固定的，默认由系统根据集群规模自动计算出。                                                                                                           一个Set中的Drive尽可能分布在不同的节点上。 |
| EC     | 纠删码（Erasure Code），保证高可靠。                                                     n 份原始数据，m份编码数据。                                                                     任意小于等于m份的数据丢失，以通过剩下的数据还原出来 |



2.MinIO的优点

- 部署简单，支持各种平台
- 海量存储，支持单个对象最大5TB
- 兼容 Amazon S3接口
- 低冗余，磁盘损坏高容忍
- 读写性能优异

原文链接：https://blog.csdn.net/liyazhen2011/article/details/123268823

