title: IDEA 打包jar
date: 2025-06-17
tags: [idea]

## IDEA 打包jar

*使用版本idea2023.3.1*

**打包jar的两种方式：**

### 一.使用idea打包

#### 1.Project Structure

`File --> Project Structure`

![image-20230428140500802](image-20230428140500802.png)

#### 2.添加Artifacts

`Artifacts -->JAR --> From modules`![image-20230428140642304](image-20230428140642304.png)

####  3.选择Main  Class

![image-20230428141058519](image-20230428141058519.png)

#### 4.配置jar包name和输出路径

![image-20230428141304254](image-20230428141304254.png)

#### 5.build打包

`Build --> Build Artifacts`

![image-20230428141602740](image-20230428141602740.png)

![image-20230428141537932](image-20230428141537932.png)

可以在输出路径查看`jar`包,选择`clean`可以清除包

### 二.使用maven打包

`maven`项目，可以点击`maven`的`package`打包

![image-20230428151034231](image-20230428151034231.png)

也可以命令行打包`mvn package`

![image-20230428151318067](image-20230428151318067.png)

生成的`jar`在根目录的`target`目录下

![image-20230428151436249](image-20230428151436249.png)

