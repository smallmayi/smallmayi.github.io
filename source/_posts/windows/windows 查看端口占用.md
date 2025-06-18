title: windows 查看端口占用
date: 2025-06-18
tags: [windows]

## windows 查看端口占用

###　１．所有端口的占用情况

```sh
netstat -ano
```

### 2.指定端口占用情况

```shell
netstat -aon|findstr "端口号"
```

### 3.查看占用端口的进程

```shell
tasklist|findstr "被占用端口对应的 PID"
```

### 4.结束端口占用的进程

```shell
#/t 包含子进程，/f 强制终止, /pid 进程id
taskkill /f /t /pid pid号
#/im 指定的进程名称，例如“explor.exe"
taskkill /f /im java.exe
```

