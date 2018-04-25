module.exports = (isDev) => { // 参数 isDev是从其他模块传来用于判断环境的常量，值为布尔值
  return {
    preserveWhitespace: true, // 控制不小心输入的空格
    extractCSS: !isDev, // 值为true时，会把vue中的css代码打包到同一个css文件中，vue默认这个属性值为false，vue中的css代码默认只会在对应组件显示的时候执行
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true // 把css类名的短杠式命名变为js变量的驼峰式命名
    }
    // hotReload: false   //vue的热重载配置项，会根据环境变量来生成，一般不需要定义
    // loaders: {}, //自定义vue里面的模块，并为其指定loader，当解析vue文件时，不同的模块就会使用指定的loader来解析
    // preLoader:{}, //在vue-loader处理对应模块之前，先用指定的loader处理
    // postLoader:{}, //在vue-loader处理完对应模块后，再用指定的loader处理
  }
}
