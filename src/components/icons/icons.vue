<template>
  <span class="icons">
    <span class="icon" v-show="classMap[type]" :class="classMap[type]"></span>
    <span class="text">{{text}}</span>
  </span>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'iconsMap',
  props: {
    text: {
      type: String
    },
    type: {
      type: Number
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin'
.icons
  display inline-block
  font-size 0
  .icon
    display inline-block
    width 12px
    height 12px
    vertical-align top
    margin-right 4px
    background-size 12px 12px
    background-repeat no-repeat
    &.decrease
      bg-image('map-icons/decrease_1')
    &.discount
      bg-image('map-icons/discount_1')
    &.guarantee
      bg-image('map-icons/guarantee_1')
    &.invoice
      bg-image('map-icons/invoice_1')
    &.special
      bg-image('map-icons/special_1')
  .text
    line-height 12px
    font-size 10px
</style>
