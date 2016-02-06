## 介绍
本项目给大家提供一个兼容到ie8的pc短解决方案

## 如何使用
```
// 依赖
npm install browser-sync -g
npm install

// 编译
gulp build-project-style && gulp build-project-static && gulp build-project-html
// 启动服务器
cd www && browser-sync start --server --files="**/*"
```

## example 页面

提供一些常见的ui制作例子


二次开发方法
```
make
make watch-style
make watch-example-template
```