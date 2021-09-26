# 说明

使用 webpack4 搭建 vue + vue-router + vuex + axios 项目

主要分为以下部分：

- 配置输入、输出路径，打包模式

- 配置识别解析css、less、scss、vue、字体文件、图片资源的loader
  - 配置引入less、scss全局变量的loader
  - 压缩css样式文件，提取css为但唯独文件
  - 多线程打包js，vue文件

- 配置生成html模板的plugin

- 拷贝静态资源

- 打包优化
  - splitchunks拆包
  - 配置runtime
  - 开启热模替换

- 配置devserve，包括服务代理，mock拦截，服务端口，地址等

- 配置resolve中路径别名
