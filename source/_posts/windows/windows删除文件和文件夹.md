---
title: windows删除文件和文件夹
date: 2025-06-19 09:47:04
tags: windows
---

## windows删除文件和文件夹

#### 1.添加文件

`deleteFile.bat`

```powershell
@echo off
chcp 65001 >nul
title 文件/文件夹彻底删除工具
color 0A

:: 检查是否拖放了文件或文件夹
if "%~1"=="" (
    echo 请将文件或文件夹拖放到此批处理文件上
    pause
    exit /b
)

:: 显示警告信息
echo 警告：此操作将永久删除目标内容！
echo 目标路径：%~1
echo.
echo 确定要继续吗？(Y/N)
choice /c YN /n /m "请选择"
if errorlevel 2 (
    echo 操作已取消
    pause
    exit /b
)

:: 判断是文件还是文件夹
if exist "%~1\" (
    echo 正在彻底删除文件夹...
    rd /s /q "%~1" >nul 2>&1
) else (
    echo 正在删除文件...
    del /f /q "%~1" >nul 2>&1
)

:: 检查是否删除成功
if exist "%~1" (
    echo 删除失败！请检查权限或文件是否被占用。
) else (
    echo 删除成功！
)
pause
```

#### 2.将文件夹移入



**参考**：https://blog.csdn.net/2401_85361040/article/details/146583682

