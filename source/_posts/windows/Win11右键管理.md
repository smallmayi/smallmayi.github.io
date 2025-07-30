title: win11右键管理
date: 2025-07-30
tags: [windows]

---

### 一.启用

####　1.启用经典上下文菜单，就是注册表添加

```bash
reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
```

#### 2.任务管理器重启windows资源管理器

### 二.撤销

```bash
reg delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" /f
```

同样重启资源管理器

