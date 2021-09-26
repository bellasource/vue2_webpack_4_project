# 说明

webpack4升级到webpack5

1.版本升级 webpack html-webpack-plugin webpack-dev-server webpack-cli

安装： npm i webpack@5 html-webpack-plugin@5 webpack-dev-server@4 webpack-cli@4

2.清空打包目录插件clean-webpack-plugin

不需要此插件，只需要在output中配置 clean:true

3.devServer模块变更

```js
onBeforeSetupMiddleware({ app }) {
  //配置mock
  apiMocker(app, path.mock, {
    changeHost: true,
  });
},
```
