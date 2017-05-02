<template>
<div>
  <transition name="fade">
      <div class="list-mask" v-show="listshow" @click="hideList"></div>
  </transition>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highLight': totalCount > 0}">
            <span class="icon-shopping_cart" :class="{'highLight': totalCount > 0}"></span>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highLight': totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listshow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" ref="list-content">
        <ul>
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price"><span>￥{{food.price * food.count}}</span></div>
            <div class="cartcontrol-wrapper">
                  <v-cartcontrol :food="food"></v-cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
    <div class="ball-container">
      <transition-group name="drop" tag="div" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
        <div v-for="ball in balls" :key="ball" v-show="ball.show" class="ball">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
import cartcontrol from 'components/cartcontrol/cartcontrol';
import BScroll from 'better-scroll';

export default {

  name: 'seller',
  data() {
    return {
      balls: [
        {show: false}, {show: false}, {show: false}, {show: false}, {show: false}, {show: false}, {show: false}, {show: false}, {show: false}
      ],
      dropballs: [],
      fold: true
    };
  },
  components: {
    'v-cartcontrol': cartcontrol
  },
  props: {
    selectFoods: {
      type: Array,
      default: function() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  methods: {
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    hideList() {
      this.fold = true
    },
    toggleList() {
       if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      window.alert(`支付${this.totalPrice}元`)
    },
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropballs.push(ball);
          return;
        }
      }
    },
    beforeEnter (el) {
      let t = this.balls.length;
      while (t--) {
        let ball = this.balls[t];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
          el.style.transform = `translate3d(0, ${y}px, 0)`;
          let inner = el.querySelector('.inner-hook');
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
          inner.style.transform = `translate3d(${x}px, 0, 0)`;
        }
      }
    },
    enter(el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight; // 通过变量的变化，异步重绘
      this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0, 0, 0)';
          el.style.transform = 'translate3d(0, 0, 0)';
          let inner = el.querySelector('.inner-hook');
          inner.style.webkitTransform = 'translate3d(0, 0, 0)';
          inner.style.transform = 'translate3d(0, 0, 0)';
      })
    },
    afterEnter(el) {
      let ball = this.dropballs.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    }
  },
  computed: {
    totalPrice: function() {
      var total = 0;
      this.selectFoods.forEach((food) => {
        total += food.count * food.price;
      })
      return total;
    },
    totalCount: function() {
      var count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      })
      return count;
    },
    payDesc: function() {
      if (this.totalCount === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass: function() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      }
      return 'enough'
    },
    listshow: function() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs['list-content'], {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show;
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin'
  .list-mask
    position: fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    backdrop-filter blur
    opacity 1
    background-color rgba(7, 17, 27, .6)
    &.fade-enter-active, &.fade-leave
      opacity 1
      background-color rgba(7, 17, 27, .6)
      transition all .5s
    &.fade-enter, &.fade-leave-active
      opacity 0
      background-color rgba(7, 17, 27, 0)
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255,255,255,.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background  #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background-color #2b343c
            &.highLight
              background rgb(0,160,220)
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highLight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            background rgb(240,20,20)
            color #fff
            box-shadow 0 4px 8px 0 rgba(0,0,0,.4)
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          padding-right 12px
          box-sizing  border-box
          border-right 1px solid rgba(255,255,255,.1)
          font-size 16px
          font-weight 700
          color rgba(255,255,255,.4)
          &.highLight
            color #fff
        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          color rgba(255,255,255,.4)
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          line-height 48px
          height 48px
          text-align center
          font-size 12px
          color rgba(255,255,255,.4)
          font-weight 700
          background #2b333b
          &.not_enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        &.drop-enter-active, &.drop-leave
          transition all .4s cubic-bezier(.49, -.29, .75, .41)
          .inner
            width 16px
            height 16px
            border-radius 50%
            background rgb(0,160, 220)
            transition all .4s linear
    .shopcart-list
      position: absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translate3d(0, -100%, 0)
      &.fold-enter-active
        transition all .5s
      &.fold-enter
        transform translate3d(0, 0, 0)
      &.fold-leave, &.fold-leave-active
        transform translate3d(0, 0, 0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, .1)
        .title
          float left
          font-size 14px
          color rgb(7,17,27)
        .empty
          float right
          font-size 12px
          color rgb(0,160,220)
      .list-content
        padding 0 18px
        max-height 217px
        background-color #fff
        overflow hidden
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border1(rgba(7, 17, 27, .1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7,17,27)
          .price
            position: absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight bold
            color rgb(240,20,20)
          .cartcontrol-wrapper
            position: absolute
            right 0
            bottom 6px
</style>
