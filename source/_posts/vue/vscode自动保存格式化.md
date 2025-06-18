前言

使用的vue3,node18

创建第一个vue

```
npm init vue@latest
```

```
> cd <your-project-name>
> npm install
> npm run dev
```

已经跑起来了

vue引入elemenetui

目前[element-ui](https://so.csdn.net/so/search?q=element-ui&spm=1001.2101.3001.7020)支持vue2版本，有一些组件在vue3中无法使用，这时候我们需要导入element-plus结合vue3开发

```shell
npm install element-plus --save
```

1.全局引入

main.js

```
//全局导入
import 'element-plus/dist/index.css' //所有的css
import ElementPlus from 'element-plus'


var a = createApp(App);
a.use(ElementPlus)
```

2.按需引入





###　vscode如何设置自动保存时自动格式化代码

vscode如何设置自动保存时自动格式化代码
一、实现vs code中代码格式化快捷键：【Shift】+【Alt】+F
二、实现保存时自动代码格式化：
1）文件 ------.>【首选项】---------->【设置】；
2）搜索emmet.include;
3）在settings.json下的【工作区设置】中添加以下语句：
"editor.formatOnType": true,
"editor.formatOnSave": true