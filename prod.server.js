var express = require('express');
var config = require('./config/index');
var path = require('path')
var opn = require('opn');
var port = process.env.PORT || config.build.port;
var app = express();
var router = express.Router();
// server
router.get('/',function(req, res, next) {
  req.url = '/index.html';
  next();
})
app.use(router);
 // 配置假数据, 配置异步接口
var appData = require('./data.json');
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
// 配置目录
// var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory);
// console.log(staticPath);
app.use(express.static('./dist'));
// 启动express
var uri = 'http://localhost:' + port;
module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log(process.env.NODE_ENV);
  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'test') {
    opn(uri)
  }
})
