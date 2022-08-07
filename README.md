## picgo-plugin-webdav

用于[PicGo](https://github.com/Molunerfinn/PicGo)的类图床插件插件，支持指定上传目录

> picgo webdav uploader
>
> CLI only

## 安装

### [PicGo-Core](https://github.com/PicGo/PicGo-Core) 安装

- `picgo add webdav`安装
- `picgo use uploader` 选择webdav
- `picgo config plugin compress`配置webdav服务器相关参数，按需填写即可

### 注意

由于此插件的设计目的是使用类似于[alist](https://github.com/alist-org/alist) ,[cloudreve](https://github.com/cloudreve/Cloudreve)等特殊云盘，该类云盘存储的文件链接特殊，无法直接获取，所以插件填写的`imgUrl`为文件对应的**webdav路径**，**无法直接使用**。
