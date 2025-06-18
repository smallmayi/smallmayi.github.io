title: linux 安装python
date: 2025-06-17
tags: [linux]

##　linux 安装python

查看linux版本

```
cat  /etc/redhat-release
```



![image-20230316163225923](..\..\images\centos版本.png)

查看默认python版本

python -V

![image-20230316163347034](..\..\images\python版本.png)

可以通过`yum install python3 -y` 安装python3,但是默认repo里最高版本是3.6.8,我们想安装更高版本的。

### 开始安装

官方下载地址：https://www.python.org/downloads/source/

上传到服务器

*<注意：python3.7后使用ssl需要高版本的openssl支持，centos7.9默认1.0.2k-fips版本已经不支持，所以需要ssl的话，需要提前额外编译安装高版本openssl>*

#### 1.安装必要依赖

```shell
yum groupinstall "Development Tools"
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel
```

当您运行第一个命令 yum -y groupinstall development tools 时，它会安装一组常用的开发工具，用于在 Linux 系统上构建软件。这些工具包括编译器、链接器和其他用于构建软件的实用程序。

接下来的命令 yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel 安装 Python 所需的其他开发库。这些库提供了压缩和加密功能、数据库访问支持以及 GUI 工具包（如 Tkinter）等功能。

```shell
tar zxvf Python-3.11.2.tgz
```

#### 4.编译安装

重命名解压的文件夹

```shell
mv Python-3.11.2 python3
```

```sh
cd python3
```

```shell
./configure --prefix=/usr/local/python3
make && make install
```

##### 5.加入系统路径

临时

```shell
export PATH=/usr/local/python3/bin:$PATH
```

永久

```shell
echo 'export PATH=/usr/local/python3/bin:$PATH' >> /etc/profile
source /etc/profile
```

#### 6.查看版本

```sh
python3 -V
```

#### 7.配置源

```shell
pip3 config set global.index-url https://mirrors.aliyun.com/pypi/simple # 永久配置国内镜像源
pip3 config list # 查看下载源配置列表
```



#### 卸载

```shell
rpm -qa|grep python3|xargs rpm -ev --allmatches --nodeps  # 卸载python3
whereis python3 |xargs rm -frv  # 删除python3所有残余文件，注意是卸载Python3，千万要带3，否则会把系统自带的Python2和yum(依赖Python2)也卸载了
whereis python3  # 查看是否存在python3
python3 # 进入python解释器环境，若提示“-bash: python3: command not found”则说明卸载成功
```



https://blog.csdn.net/qq_45430571/article/details/129441491

