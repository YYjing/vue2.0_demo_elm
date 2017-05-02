<template>
  <div>
    <v-header :seller="seller"></v-header>
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
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view :seller="seller"></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import header from './components/header/header';
import {urlParse} from 'common/js/util.js';

const ERR_OK = 0;
export default {
  name: 'app',
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          console.log(queryParam);
          return queryParam.id;
        })()
      }
    }
  },
  created() {
    this.$http.get('/api/seller?id=' + this.seller).then((response) => {
      // resolve to Blob
      if (response.data.ec === ERR_OK) {
        // this.seller = response.body.data.seller;
        this.seller = Object.assign({}, this.seller, response.body.data.seller);
      }
    }).then((blob) => {
      // use image Blob
    });
  },
  components: {
    'v-header': header
  }
}
</script>
<style>
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
}

.tab .tab-item {
  flex: 1;
  text-align: center;
}

.tab .tab-item a {
  display: block;
  font-size: 14px;
  color: rgb(77, 85, 93);
}

.tab .tab-item a.active {
  color: rgb(240, 20, 20);
}
</style>
