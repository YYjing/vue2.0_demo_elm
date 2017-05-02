<template>
  <div class="goods" @click="showInfo">
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{current: currentIndex == index}" @click="calIndex(index, $event)">
          <span class="text-goods">
            <icons v-show="item.type" :type="item.type" :text="item.name"></icons>
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook" >
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border1" @click="selectFood(food, $event)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <!-- <v-cartcontrol :food="food" v-on:addCart="add_cart"></v-cartcontrol> -->
                  <v-cartcontrol :food="food"></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ></v-shopcart>
    <v-food :food="selectedFood" ref="food"></v-food>
  </div>
</template>
<script type="text/ecmascript-6">
import icons from '../../components/icons/icons';
import BScroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import food from 'components/food/food';
import {middle} from '../middle.js'

const ERR_OK = 0;
export default {
  name: 'goods',
  props: {
    seller: Object
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  created() {
    this.$http.get('/api/goods').then((response) => {
      middle.$on('addCart', this.add_cart)
      // resolve to Blob
      if (response.data.ec === ERR_OK) {
        this.goods = response.body.data.goods;
        this.$nextTick(() => {
           this._initScroll();
           this._calHeight();
        })
      }
    }).then((blob) => {
    });
  },
  computed: {
    currentIndex() {
      for (var i = 0; i < this.listHeight.length; i++) {
        let heightMin = this.listHeight[i];
        let heightMax = this.listHeight[i + 1];
        if (!heightMax || (this.scrollY >= heightMin && this.scrollY < heightMax)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    calIndex(index, event) {
      let el = this.$refs['foods-wrapper'].querySelectorAll('.food-list-hook')[index];
      if (event._constructed) {
         this.foodsScroll.scrollToElement(el, 300);
      }
    },
    selectFood (selectedFood, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = selectedFood;
      this.$refs['food'].show();
    },
    add_cart (target) {
      // 体验优化，将同步的下落动画变为异步
      this.$nextTick(() => {
        this.$refs['shopcart'].drop(target)
      })
    },
    showInfo () {
      // console.log(this.selectFoods)
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs['menu-wrapper'], {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs['foods-wrapper'], {
        probeType: 3,
        click: true
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
    _calHeight() {
      let foodList = this.$refs['foods-wrapper'].querySelectorAll('.food-list-hook');
      var height = 0;
      this.listHeight.push(height);
      foodList.forEach((item, index) => {
        height += item.clientHeight;
        this.listHeight.push(height);
      })
    }
  },
  components: {
    icons,
    'v-shopcart': shopcart,
    'v-cartcontrol': cartcontrol,
    'v-food': food
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin'
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background-color #fff
          font-weight 700
          .text
            border-none()
        .text-goods
          display table-cell
          width 56px
          vertical-align middle
          border1(rgba(7,17,27,.1))
          font-size 12px
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color #93999f
        background-color #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border1(rgba(7,17,27,.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7,17,27)
          .desc , .extra
            line-height 12px
            font-size 10px
            color rgb(147,153,159)
          .desc
            margin-bottom 8px
          .extra
            line-height  10px
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height  24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240,20,20)
            .old
              font-size 10px
          .cartcontrol-wrapper
            position absolute
            right 0px
            bottom 12px

</style>
