const sourceMappingURL = require('source-map-url');
const HtmlWebpackPlugin = require('html-webpack-plugin');

class InlineManifestWebpackPlugin {
  constructor(chunkName) {
    this.chunkName = chunkName || 'runtime';
    this.chunkScript = null;
    this.chunkIndex = -1;
  }

  getAssetByName = (chunks, chunkName) => {
    return (chunks.find((chunk) => chunk.name === chunkName) || { files: [] }).files[0];
  };

  apply(compiler) {
    // 注入 html-webpack-plugin 的处理过程
    compiler.hooks.compilation.tap('InlineManifestWebpackPlugin', (compilation) => {
      // 在标签生成之前
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        'InlineManifestWebpackPlugin',
        (htmlPluginData, cb) => {
          const assets = htmlPluginData.assets;
          const manifestAssetName = this.getAssetByName(compilation.chunks, this.chunkName);

          if (manifestAssetName) {
            const runtimeIndex = assets.js.indexOf(assets.publicPath + manifestAssetName);

            this.chunkScript = {
              tagName: 'script',
              closeTag: true,
              attributes: {
                type: 'text/javascript',
              },
              innerHTML: sourceMappingURL.removeFrom(
                compilation.assets[manifestAssetName].source()
              ),
            };
            this.chunkIndex = runtimeIndex;

            // 从html中删除原标签
            if (runtimeIndex !== -1) {
              assets.js.splice(runtimeIndex, 1);
              delete assets.js[this.chunkName];
            }
          }
          cb(null, htmlPluginData);
        }
      );

      // 插入标签
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
        'InlineManifestWebpackPlugin',
        (htmlPluginData, cb) => {
          // 向html中注入
          if (this.chunkScript && this.chunkIndex !== -1) {
            htmlPluginData.assetTags.scripts.splice(this.chunkIndex, 0, this.chunkScript);
            this.chunkScript = null;
            this.chunkIndex = -1;
          }

          cb(null, htmlPluginData);
        }
      );
    });

    // 在emit阶段插入钩子函数
    compiler.hooks.emit.tap('InlineManifestWebpackPlugin', (compilation) => {
      // 删除原文件
      delete compilation.assets[this.getAssetByName(compilation.chunks, this.chunkName)];
    });
  }
}

module.exports = InlineManifestWebpackPlugin;
