title: hexo主题
date: 2025-06-17
tags: [hexo]

使用了anzhiyu主题

地址：https://github.com/anzhiyu-c/hexo-theme-anzhiyu

1.克隆项目

在博客根目录执行

git clone https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu

也可以使用main分支，更稳定

![image-20230829101152051](C:\Users\dengsm\AppData\Roaming\Typora\typora-user-images\image-20230829101152051.png)

git clone -b main https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu

2.应用主题

修改hexo配置文件_config.yml的主题

```
theme: anzhiyu
```

安装pug和stylus渲染器

```
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

3.覆盖配置

覆盖配置可以使`主题配置`放置在 anzhiyu 目录之外，避免在更新主题时丢失自定义的配置。

- macos/linux 在博客根目录运行

```
cp -rf ./themes/anzhiyu/_config.yml ./_config.anzhiyu.yml
```

- windows 复制`/themes/anzhiyu/_config.yml`此文件到 hexo 根目录，并重命名为`_config.anzhiyu.yml`

以后如果修改任何主题配置，都只需修改 _config.anzhiyu.yml 的配置即可。

注意：

- 只要存在于 `_config.anzhiyu.yml` 的配置都是高优先级，修改原 `_config.yml` 是无效的。
- 每次更新主题可能存在配置变更，请注意更新说明，可能需要手动对 `_config.anzhiyu.yml` 同步修改。
- 想查看覆盖配置有没有生效，可以通过 `hexo g --debug` 查看命令行输出。
- 如果想将某些配置覆盖为空，注意不要把主键删掉，不然是无法覆盖的

4.本地启动

`hexo s `默认4000端口

添加`-p`参数指定端口 `hexo s -p 5000`



其他：

图片加载

修改lazyload为false

```
# Lazyload (图片懒加载)
# https://github.com/verlok/vanilla-lazyload
lazyload:
  enable: false
```

1.banner左侧倾斜滚动栏和右侧图片

左侧：根目录创建`/source/_data/creativity.yml`,输入以下内容

```yaml
- class_name: 开启创造力
  creativity_list:
    - name: Java
      color: "#fff"
      icon: https://bu.dusays.com/2023/04/09/643293b1184e9.jpg
    - name: Docker
      color: "#57b6e6"
      icon: https://bu.dusays.com/2023/04/09/643293b0f0abe.png
    - name: Photoshop
      color: "#4082c3"
      icon: https://bu.dusays.com/2022/12/15/639aa3a5c240e.png
    - name: Node
      color: "#333"
      icon: https://npm.elemecdn.com/anzhiyu-blog@2.1.1/img/svg/node-logo.svg
    - name: Webpack
      color: "#2e3a41"
      icon: https://bu.dusays.com/2023/04/09/643293b68026c.png
    - name: Pinia
      color: "#fff"
      icon: https://npm.elemecdn.com/anzhiyu-blog@2.0.8/img/svg/pinia-logo.svg
    - name: Python
      color: "#fff"
      icon: https://bu.dusays.com/2023/04/09/643293b1230f7.png
    - name: Vite
      color: "#937df7"
      icon: https://npm.elemecdn.com/anzhiyu-blog@2.0.8/img/svg/vite-logo.svg
    - name: Flutter
      color: "#4499e4"
      icon: https://bu.dusays.com/2023/04/09/643293b1055c2.png
    - name: Vue
      color: "#b8f0ae"
      icon: https://bu.dusays.com/2023/04/09/643293b6788bd.png
    - name: React
      color: "#222"
      icon: data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K
    - name: CSS3
      color: "#2c51db"
      icon: https://bu.dusays.com/2022/12/15/639aa3a5c251e.png
    - name: JS
      color: "#f7cb4f"
      icon: https://bu.dusays.com/2023/04/09/643293b121f02.png
    - name: HTML
      color: "#e9572b"
      icon: https://bu.dusays.com/2022/12/15/639aa3a5c241c.png
    - name: Git
      color: "#df5b40"
      icon: https://bu.dusays.com/2023/04/09/643293b10ccdd.webp
    - name: Apifox
      color: "#e65164"
      icon: https://bu.dusays.com/2022/11/19/6378d6458c6b6.png
```



右侧图片在`_config.anzhiyu.yml`配置，img路径在对应主题`themes`下的img路径

```yaml
  banner:
    tips: 新品主题
    title: Theme-AnZhiYu
#    image: https://pic1.zhimg.com/80/v2-3b2cf9cbe79b40d6e75bbaf494131ec4_720w.webp
    image: /img/j1.jpg
    link: https://docs.anheyu.com/
```

2.文章右侧头像和微信二维码

```yaml
# Avatar (头像)
avatar:
  img: /img/tou.jpg # https://bu.dusays.com/2023/04/27/64496e511b09c.jpg
  effect: false
```

```yaml
card_weixin:
    enable: true
    face: https://bu.dusays.com/2023/01/13/63c02edf44033.png
    backFace: # https://bu.dusays.com/2023/05/13/645fa415e8694.png
```

3.建站天数和页脚天数

建站天数



页脚天数

```yaml
footer:
  owner:
    enable: true
    since: 2023
  custom_text:
  runtime:
    enable: true
    launch_time: 04/01/2023 00:00:00 # 网站上线时间
```

