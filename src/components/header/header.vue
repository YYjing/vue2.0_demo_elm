<template>
  <div class="sell-header">
    <div class="conent-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <div class="brand"></div>
          <div class="name">{{seller.name}}</div>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <icons :type="seller.supports[0].type" :text="seller.supports[0].description"></icons>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDeatil">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
    <div class="bulletin-wrapper" @click="showDeatil">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" height="100%" width="100%" alt="">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="item in seller.supports">
              <icons :type="item.type" :text="item.description"></icons>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <div class="content">{{seller.bulletin}}</div>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import star from 'components/star/star'
import icons from 'components/icons/icons'
export default {
  name: 'header',
  props: {
    seller: {
      type: Object,
      required: true
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDeatil: function () {
       this.detailShow = true
     },
     hideDetail: function () {
       this.detailShow = false
     }
  },
  components: {
    star,
    icons
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin'
.sell-header
  position relative
  color: #fff
  background: rgba(7,17,27,0.5)
  overflow hidden
  .conent-wrapper
    position relative
    padding 24px 12px 18px 24px
    font-size 0 // 消除图片和文字之间的空白
    .avatar
      display inline-block
      vertical-align top
    .content
      display inline-block
      font-size 14px
      margin-left 16px
      .title
        margin 2px 0 8px 0
        .brand
          display inline-block
          width 30px
          height 18px
          vertical-align top
          bg-image('./header-icons/brand')
          background-size 30px 18px
          background-repeat no-repeat
        .name
          display inline-block
          margin-left 6px
          font-size 16px
          line-height 18px
          font-weight bold
    .description
      margin-bottom 10px
      line-height 12px
      font-size 12px
  .support-count
    position absolute
    right 12px
    bottom 14px
    padding 0 8px
    height 24px
    line-height 24px
    border-radius 14px
    background-color rgba(0,0,0,.2)
    text-align center
    .count
      font-size 10px
      vertical-align top
    .icon-keyboard_arrow_right
      margin-left 2px
      line-height 24px
      font-size 10px
  .bulletin-wrapper
    position relative
    height 28px
    line-height 28px
    padding 0 22px 0 12px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    background-color rgba(7,17,27,.1)
    .bulletin-title
      display inline-block
      vertical-align top
      margin-top 8px
      width 22px
      height 12px
      bg-image('header-icons/bulletin')
      background-size 12px 12px
      background-repeat no-repeat
    .bulletin-text
      vertical-align top
      margin 0 4px
      font-size 10px
    .icon-keyboard_arrow_right
      position: absolute
      font-size 10px
      right 12px
      top 8px
  .background
    position absolute
    top 0
    left 0
    z-index -1
    width 100%
    height 100%
    filter blur(10px)
  .detail
    position fixed
    left 0
    top 0
    z-index 100
    width 100%
    height 100%
    overflow auto
    opacity 1
    background-color rgba(7,17,27,.8)
    transition all .5s
    &.fade-enter,&.fade-leave
     background-color rgba(7,17,27,0)
     opacity 0
    .detail-wrapper
      min-height 100%
      width 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
        .name
          text-align center
          line-height 16px
          font-size 16px
          font-weight 700
        .star-wrapper
          margin-top 18px
          padding 2px 0
          text-align center
        .title
          display flex
          width 80%
          margin 30px auto 24px auto
          .line
            flex 1
            position relative
            top -6px
            border-bottom  1px solid  rgba(255,255,255,.2)
          .text
            padding 0 12px
            font-weight bold
            font-size 14px
        .supports
          width 80%
          margin 0 auto
          .support-item
            padding 0 12px
            margin-bottom 12px
            font-size 0
            &:last-child
              margin-bottom 0
        .bulletin
          width 80%
          margin 0 auto
          .content
            padding 0 12px
            line-height 24px
            font-size 12px
    .detail-close
      position relative
      width 32px
      height 32px
      margin -64px auto 0 auto
      clear both
      font-size 32px
</style>
