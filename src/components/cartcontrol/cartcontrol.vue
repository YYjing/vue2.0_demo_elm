<template>
  <div class="cartcontrol">
  <transition name="move">
        <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart">
          <span class="icon-remove_circle_outline inner"></span>
        </div>
  </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
import {middle} from '../middle.js'

export default {

  name: 'seller',
  data() {
    return {

    };
  },
  created () {

  },
  props: {
    food: {
      type: Object
    }
  },
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
      middle.$emit('addCart', event.target)
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return true;
      }
       this.food.count--
    }
  },
  computed: {

  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      transition all .4s linear
      .inner
          display inline-block
          font-size 24px
          line-height 24px
          color #00a0dc
          transition all .4s linear
      &.move-enter-active
        opacity 1
        transform translate3d(0, 0, 0)
      &.move-enter, &.move-leave-active
        opacity 0
        transform translate3d(24px, 0, 0)
        .inner
          transform rotate(180deg)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color #93999f
    .cart-add
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
</style>
