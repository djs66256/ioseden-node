# IosEden

iOS Eden service for restful api.


### 目录结构

|-bin  程序入口和配置文件

|-controll 事务处理

|-libs  一些杂的类

|-model 数据模型，数据库表结构定义

|-routes 路由处理

|-app.js 应用管理器，包括中间件

|-package.json 包管理


### 安装

需要预装nodejs，npm

```
git clone https://github.com/djs66256/ioseden-node dirname
cd dirname
npm install
```

可选：设置启动参数以及环境变量

```
--harmony
BABEL_CACHE_PATH=./.babel_cache_file
```

启动: ```npm start```或者```node ./bin/www```

### 简单流程说明

`req` `==>` `app.js``routor重定位` `==>` `routes/*` `==>` `controller/*` ==> `model/*`

### 约定

1. 使用ES6规范
2. 所有回调方法均按照Promise完成
3. 按照Restful接口规范

----

### LICENSE

GPL3.0