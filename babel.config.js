module.exports = function config(api) {
  const presets = [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',//自动进行polyfill,进行js兼容
        corejs: 3,
      },
    ],
  ];
  const plugins = [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        style: true,
      },
      'ant-design-vue',
    ],
  ];

  api.cache(true);
  return {
    presets,
    plugins,
  };
};
