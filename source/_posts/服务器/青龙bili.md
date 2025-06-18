## 轻量服务器----青龙面板之bilibili

####　1. 安装 `dotnet` 环境

```yaml
#在配置文件中找到 extra.sh 文件，将以下内容复制到 extra.sh 中：
 
# 安装 dotnet 环境
echo -e "\n-------set up dot net env-------"
apk add bash icu-libs krb5-libs libgcc libintl libssl1.1 libstdc++ zlib
wget https://download.visualstudio.microsoft.com/download/pr/bd94779d-c7c4-47fd-b80a-0088caa0afc6/40f115bbf4c068359e7a066fe0b03dbc/dotnet-sdk-6.0.101-linux-musl-x64.tar.gz
DOTNET_FILE=dotnet-sdk-6.0.101-linux-musl-x64.tar.gz
export DOTNET_ROOT=/home/dotnet
mkdir -p "$DOTNET_ROOT" && tar zxf "$DOTNET_FILE" -C "$DOTNET_ROOT"
export PATH=$PATH:$DOTNET_ROOT
ln -s /home/dotnet/dotnet /usr/local/bin
dotnet --version
echo -e "\n-------set up dot net env finish-------"
```

![image-20220513114534436](https://s2.loli.net/2022/05/13/nl8pyBPGUMOHeu2.png)

#### 2.添加任务

运行一次

![image-20220513114905210](https://s2.loli.net/2022/05/13/cBDbQE2GMhFNeZp.png)

#### 2.重启青龙容器

重启青龙容器，或在宿主机中执行 `docker exec -it qinglong bash /ql/data/config/extra.sh`，其中 `qinglong` 是你的容器名。

#### 3.登录青龙面板并修改配置

修改保存 `RepoFileExtensions="js py"` 为 `RepoFileExtensions="js py sh"`

![image-20220513105130027](https://s2.loli.net/2022/05/13/E3sjSCFig2Yy8ft.png)

#### 4.添加bilibili  Cookie

抓取cookie

![image-20220513110221146](https://s2.loli.net/2022/05/13/xgQy1UoeXNzWKbs.png)

添加环境变量`Ray_BiliBiliCookies__0`

![image-20220513105939740](https://s2.loli.net/2022/05/13/nOu2iLjfSC6Kloc.png)

#### 5.拉库

```yaml
ql repo https://ghproxy.com/https://github.com/raywangqvq/bilibilitoolpro.git "bili_task_"
```


![image-20220513110901500](https://s2.loli.net/2022/05/13/PlxNCOzMnyiVDZ2.png)

拉取成功

