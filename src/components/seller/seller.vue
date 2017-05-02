<template>
  <div class="seller" rel="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">{{seller.ratingCount}}</span>
          <div class="text">月售{{seller.sellCount}}单</div>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>
            </div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="tittle"></h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li class="support-item border1" v-for="item in seller.supports">
          <icons :type="item.type" :text="item.description"></icons>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="pic-wrapper">
          <ul class="pic-list" ref="pic-list">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border1">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import star from 'components/star/star';
import split from 'components/split/split';
import BScroll from 'better-scroll';
import icons from 'components/icons/icons'
import {saveToLocal, loadLocal} from 'common/js/store'
export default {

  name: 'seller',
  data() {
    return {
      favorite: (() => {
        return loadLocal(this.seller.id, 'favorite', false);
      })()
    };
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
  },
  mounted() {
    this._initScroll();
    this.scrollPics();
  },
  watch: {
    'seller' () {
      this._initScroll();
      this.scrollPics();
    }
  },
  computed: {
    favoriteText() {
      return (this.favorite ? '已收藏' : '收藏');
    }
  },
  methods: {
    toggleFavorite(event) {
      if (!event._constructed) {
        return;
      }
      this.favorite = !this.favorite;
      saveToLocal(this.seller.id, 'favorite', this.favorite);
    },
    _initScroll() {
      if (!this.scroll) {
         this.scroll = new BScroll(this.$refs['seller'], {
            click: true
        })
      } else {
         this.$nextTick(() => {
              this.scroll.refresh();
         })
      }
    },
    scrollPics() {
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs['pic-list'].style.width = width + 'px';
        this.$nextTick(() => {
          if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs['pic-wrapper'], {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
          } else {
            this.picScroll.refresh();
          }
        })
      }
    }
  },
  props: {
    seller: Object
  },
  components: {
    star, split, icons
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'
  .seller
    position: absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      padding 18px
      .title
        margin-bottom 8px
        line-height 14px
        color rgb(7,17,27)
        font-size 14px
      .desc
        padding-bottom 18px
        border1(rgba(7,17,27,.1))
        font-size 0
        .star
          display inline-block
          margin-right 8px
          vertical-align top
        .text
          margin-right 12px
          display inline-block
          vertical-align top
          line-height  18px
          font-size 10px
          color  rgb(77,85,93)
      .remark
        display flex
        padding-top 18px
        .block
          flex 1
          text-align  center
          border-right 1px solid rgba(7,17,27,.1)
          &:last-child
            border none
          h2
            margin-bottom 4px
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          .content
            line-height 24px
            font-size 10px
            color rgb(7,17,27)
            .stress
              font-size 24px
      .favorite
        position: absolute
        right 11px
        top 18px
        width 50px
        text-align center
        .icon-favorite
          display block
          line-height 24px
          margin-bottom 4px
          font-size 24px
          color #d4d6d9
          &.active
            color rgb(240,20,20)
        .text
          line-height: 10px;
          font-size: 10px;
          color: #4d555d;
    .bulletin
      padding 18px 19px 0 18px
      .tittle
        margin-bottom 8px
        line-height 14px
        color rgb(7,17,27)
        font-size 14px
      .content-wrapper
        padding 0 12px 16px 12px
        position: relative
        .content
          line-height 24px
          font-size 12px
          color rgb(240,20,20)
      .supports
        .support-item
          padding 16px 12px
          border1(rgba(7,17,27,0.1))
          font-size 0
          &:last-child
            border-none()
        .icon
          display inline-block
          width 16px
          height 16px
          vertical-align top
          margin-right 6px
          background-size 16px 16px
          background-repeat no-repeat
          &.decrease
            bg-image('seller-icons/decrease_4')
          &.discount
            bg-image('seller-icons/discount_4')
          &.guarantee
            bg-image('seller-icons/guarantee_4')
          &.invoice
            bg-image('seller-icons/invoice_4')
          &.special
            bg-image('seller-icons/special_4')
        .text
          line-height 16px
          font-size 12px
          color rgb(7,17,27)
    .pics
      padding 18px
      .title
        margin-bottom 12px
        line-height 14px
        color rgb(7,17,27)
        font-size 14px
      .pic-wrapper
        width 100%
        overview hidden
        white-space nowrap
        .pic-list
          font-size 0
          .pic-item
            display inline-block
            margin-right 6px
            width 120px
            height 90px
            &:last-child
              margin 0
    .info
      padding 18px 18px 0 18px
      color rgb(7,17,27)
      .title
        padding-bottom 12px
        line-height 14px
        border1(rgba(7,17,27,.1))
        font-size 14px
      .info-item
        padding 16px 12px
        line-height 16px
        font-size 12px
        border1(rgba(7,17,27,.1))
        &:last-child
          border-none()
</style>
