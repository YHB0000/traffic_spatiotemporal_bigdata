module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    // 发布产品时的插件
    // ...prodPlugins,
    // '@babel/plugin-syntax-dynamic-improt'
  ]
}
