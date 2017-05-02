开发过程 && 案例笔记汇总


#前期准备
-全局安装 $  sudo npm install vue-cli -g
-检查node版本在4.4以上 $ node -v ,查找node安装路径  $  which node
-使用 $ vue 查看可用的命令
-通过 $ vue list 查看可用模板
-通过 $ vue init webpack sell(项目名称)  来安装基本模板
-eslint是es6语法的检查工具,填写package.json时选择y(使用eslint)
>  代码结构：
? Project name sell
? Project description sell app
? Author yu.yajing <yu.yajing@immomo.com>
? Vue build standalone
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard
? Setup unit tests with Karma + Mocha? No
? Setup e2e tests with Nightwatch? No

-创建完成之后使用  $ cd sell  $ ls -a 查看当前的目录结构
-按照提示使用 $ sudo npm install 安装依赖 node_model
- 启动项目  $ npm run dev  会启动一个80端口的localhost
#项目简介
-在.editorconfig配置文件中有设置，使用eslint语法检查，保证所有按照2字符标准缩进来执行（可更改）
-.eslintignore配置文件中是忽略语法检查的文件
-.eslintrc.js是eslint的文件配置，在rules里，设置为0代表不强制均可以
>   配置
  'semi': ['error', 'always']，（在文件结尾添加分号）
  'indent': 0（不管缩进）

  在使用new Vue({})的地方加上 /* eslint-disable no-new */  ，表示在此种情况下忽略eslint 语法

-package.json文件里是各类依赖信息
-components里是.vue后缀的组件，每个组件内部分为三部分，template,script,style
> 组件设置和导出
export default{
  name:'hello',
  data:(){
    retrun {
      msg:'dd'
    }
  }
}
> 组件引用,必须在components里配置一下，然后就可以在app文件中通过<hello></hello>方式使用
import Hello from './component/Hello.vue'
export default{
  name:'app',
  components:{
   Hello
  }
}

#webpack配置简介
- webpack.dev.conf.js(开发环境文件)的HtmlWebpackPlugin里面设置入口的index文件
-index.js的dev配置设置了端口号，转发的接口（proxyTable）等
-utils.js配置了一系列方法，加载loader
-webpack.base.conf.js的module.exports设置了入口文件和编译的文件地址
-dev-server.js文件设置了开启的server的端口和host代理（proxyTable），这些都在index.js里面配置
-修改了webpack的配置文件，需要重新启动npm run dev

#开发项目 分析
-一般移动端都需要2x和3x的图片来适应不同dpr
-在webpack中一般用单独的icon，不用精灵图，因为url-loader会将小于10000的图片作为base64插入，减少文件请求。
-把svg图片做成图标字体文件引入，因为url-loader会将小于10000的字体图标作为base64插入，减少文件请求。
-制作字体图标: icon-moon app -- 选择自己上传 import icons -- 生成  generate icons -- 获取字体的使用代码 get code -- preference设置生成的icon文件名称和配置 -- download -- 在项目文件中引用 style.css和 fonts
-mock的配置:在dev-server.js中，使用express的路由，
>  dev-server.js 添加如下代码
var app = express()
  // 配置假数据 todo
var appData = require('../data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
var apiRoute = express.Router();
apiRoute.get('/seller', function(req, res) {
  res.json({
    ec: 0,
    data: { seller: seller }
  });
});
apiRoute.get('/goods', function(req, res) {
  res.json({
    ec: 0,
    data: { goods: goods }
  });
});
apiRoute.get('/ratings', function(req, res) {
  res.json({
    ec: 0,
    data: { ratings: ratings }
  });
});
// 所有接口都在/apitest目录（可以自我定义）下，访问通过  /apitest/seller
app.use('/apitest', apiRoute);

-项目结构
-- static中
-- -- reset.css( http://cssreset.com )
-- src中
-- -- main.js
-- -- app.vue
-- -- data.json（mock）
-- -- common (放置公用资源)
-- -- -- fonts
-- -- -- js
-- -- -- stylus(css预处理文件)
-- -- components
-- -- -- header
-- -- -- -- header.vue

>  https://icomoon.io/

# 开发（组件拆分）
-- 在主组件（index.html）中引入reset.css
-- 设置（index.html） 的meta
-- 在app.vue中设置各个模块
-总结：vue-loader 引入了postcss的插件，解决css的兼容问题(can i use 网站)
引入开发依赖的包
 sudo npm install stylus-loader stylus --save-dev 用于编译stylus代码
  sudo npm install vue-router  --save-dev  路由
-设置路由:
>  http://router.vuejs.org/zh-cn/essentials/getting-started.html

-css书写规范：
  引入reset.css
  {}里先写diplay等，再写宽高，最后写颜色和字体
>  实现一像素边框
.border-1px{
   position: relative;
}
.border-1px::after{
  display: block
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid $color;
    content ' ';
}
> // 设置全局的calss
@media(-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5){
  .border-1px::after{
  -webkit-transform: scale(0.7);
      transform: scale(0.7);
  }
}
@media(-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2){
  .border-1px::after{
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
  }
}

  -- 手机实时预览，改localhost为ip地址，在 cli.im 网站生成二维码访问（手机和电脑在同一局域网）
    $ ifconfig
    查看本机ip

#app.vue组件
  -发送ajax请求
  > https://github.com/pagekit/vue-resource

  -在created(){}中，发送请求获取mock数据
  通过传递data中的数据到 (父子组件通信)
  > <v-header :seller="seller"></v-header> (app.vue文件)

#header组件
>  通过prop获取传递的seller
props: {
    seller: {
      type: Object,
      required: true
    }
  },
  created() {
    this.calssMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  }
  > 单行省略号
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
> 图片的模糊效果
    .parent{overflow: hidden}
    .background
      position relative
      top 0
      left 0
      z-index -1
      width 100%
      height 100%
      filter blur(10px)
  > css sticky footer布局  底部固定按钮不随内容高度变化
  http://www.w3cplus.com/css3/css-secrets/sticky-footers.html

    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main"></div>
      </div>
      <div class="detail-close">
        <i class="icon-close"></i>
      </div>
    </div>

    .detail-wrapper
      min-height 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
    .detail-close
      position relative
      width 32px
      height 32px
      margin -64px auto 0 auto
      clear both
      font-size 32px

#goods  组件

> flex布局实例 阮一峰教程
http://www.ruanyifeng.com/blog/2015/07/flex-examples.html
    .food-item
        display flex
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1

> better-scroll iscroll的封装  https://github.com/ustbhuangyi/better-scroll

-通过 npm install better-scroll --save-dev 安装到项目中
-  获取vue对象  ref="food-wrapper"
-  dom更新后执行代码
> dom更新后执行代码
     this.$nextTick(() => {
           this._initScroll();
       })

#cart 组件
当改变vue的一个不存在的变量值时，由于原有的对象上不存在该属性，所以当值变化是检测不到的
需要如下：
> set的使用 （food是父组件传递过来的参数，this.food.count 为 undefined)
    import  Vue from 'vue'
    methods: {
    addCart (event) {
      if (!event._constructed) {
        return true;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++;
      }
    }
  },
  > transition 的vue实现方式
  -执行顺序问题
.fade-enter-active {transform:scale(1);opacity:1;} -- 进入的最终状态
.fade-enter {transform:scale(0);opacity:0} -- 刚开始进入的初始状态
.fade-leave-active {opacity:0;transform:scale(0);} -- 离开的最终状态
//.fade-leave {transform:scale(0);opacity:0} -- 离开的初始状态
在实际的往复的动作中，通常.fade-enter 和.fade-leave-active 为相同的,设为相同的，.fade-leave通常省略不设置。

- class-hook  以-hook结尾，用于js选择dom，没有样式问题
-  使用iscroll的时候，移动端的click为true,可以允许移动端点击，但是在pc上面会出现两次点击事件（一次为原生，一次为click:true而派发的事件）,需要根据event._constructed 判断，（true为派发事件，false为原生事件）
- 子元素为display:inline-block的时候，一般设置父元素的font-size=0，以免元素之间有间隙
- 防止eslint语法报错

> /* eslint-disable no-unused-vars*/

- 设置背景 的模糊(iphone)

> backdrop-filter: blur(10px)

# 商品详情页
-图片设置大小，占位---先设置宽高相同的盒子，在设置图片大小
> 盒子的padding = width ，height = 0, 可以保证盒子宽高相等
    .image-box
        position: relative
        left 0
        width 100%
        height 0
        padding-top 100%
        img
          position: absolute
          top 0
          left 0
          width 100%
          height 100%
> 为使手机端icon点击区域变大，设置其padding
    .icon-arrow_lift
      display block
      padding 10px

-es6语法，为对象扩展属性
   this.seller = Object.assign({}, this.seller, response.body.data.seller);
-keep-alive 的使用
    路由的使用，把组件的状态缓存在内存里，然后切换路由的时候恢复。

    > 在使用上通过keep-alive能够保证路由切换的时候，dom不会重新渲染，请求不会重新发送。
     <div class="tab border1">
      <div class="tab-item">
        <router-link to="/goods" keep-alive>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" keep-alive>评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" keep-alive>商家</router-link>
      </div>
    </div>


  -js模块化编程
  > js文件中导出方法
  export function fn1(data, str) {}
  export function fn2(data, str) {}
  > 在.vue文件中引用
  import {fn1, fn2} from '../fn.js'
> 如果在文件中导出方法是
  export default fn() {}
  那在.vue文件中的引用方法
  import fn from '../fn.js'

#评论区块
-设置竖直方向居中
display inline-block
 vertical-align top
 line-height 相同

#webpack打包
-- productionSourceMap: flase不允许映射调试
-执行 webpack 的package.json 文件script 的 build 命令
$ npm run build
- 讲解 build.js
 -- require shell.js  提供shell命令行
 -- require ora 给长时间执行的异步任务一个提示（打包中的文文案提示—）
 -- webpack.prod.conf.js
  --- extractTextPlugin 把css单独提出来一个文件，而非style引入到文件
  --- UglifyJsPlugin
  --- CommonsChunkPlugin 把第三方库合并为一个vendor.js
  --- inify 压缩html


#node调试
- 运行打包后的文件 （需要新建server, 借助express)
  在项目根目录创建 prod.server.js
  -- 在config/index.js 的build 里定义port, productionSourceMap: flase不允许映射调试代码
  -- 创建server
  -- 配置假数据, 配置异步接口(参照dev-server.js)
  -- 配置目录 到dist文件夹下
  -- 启动express(参照dev-server.js)
