import "./entrys/base";

// import "./entrys/vue";
// import "./entrys/ts/index.tsx";

/**
 * TODO: 让 js 支持模块热更新, css 的模块热更新 css-loader 里面做了，
 * vue 文件也同样是 vue-loader 做的， 而react则是在 babel-preset 中做的
 */
if (module.hot) {
  module.hot.accept("./entrys/base/index.js", () => {
    console.log("hello.js 文件发生变化");
  });
}
