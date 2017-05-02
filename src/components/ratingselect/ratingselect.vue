    <template>
        <div class="ratingselect">
          <div class="rating-type border1">
            <span @click="select(2,$event)" class="block positive" :class="{'active':type == 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0,$event)" class="block positive" :class="{'active':type == 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span @click="select(1,$event)" class="block negative" :class="{'active':type == 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
          </div>
          <div class="switch" @click="toggleContent" :class="{'on': content}">
            <i class="icon-check_circle"></i>
            <span class="text">只看有内容的评价</span>
          </div>
        </div>
    </template>
    <script type="text/ecmascript-6">
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
import {middle} from '../middle.js'

    export default {
      data() {
        return {
        type: this.selectType,
        content: this.onlyContent
        }
      },
      created() {
      },
      props: {
        ratings: {
          type: Array,
          default() {
            return [];
          }
        },
        selectType: {
          type: Number,
          default: ALL
        },
        onlyContent: {
          type: Boolean,
          default: false
        },
        desc: {
          type: Object,
          default() {
            return {
              all: '全部',
              positive: '满意',
              negative: '不满意'
            }
          }
        }
      },
      watch: {
        selectType(val) {
          this.type = val;
        },
        onlyContent(val) {
          this.content = val;
        },
        type(val) {
          middle.$emit('type-change', val);
        },
        content(val) {
           middle.$emit('content-change', val);
        }
      },
      methods: {
        select(type, event) {
          if (!event._constructed) {
            return;
          }
          this.type = type;
        },
        toggleContent(event) {
           if (!event._constructed) {
            return;
          }
          this.content = !this.content;
        }
      },
      computed: {
        positives() {
          return this.ratings.filter((rating) => {
            console.log(11);
            return rating.rateType === POSITIVE;
          })
        },
        negatives() {
          return this.ratings.filter((rating) => {
            console.log(11);
            return rating.rateType === NEGATIVE;
          })
        }
      }
    }
    </script>
    <style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'
    .ratingselect
      .rating-type
        padding 18px 0
        margin 0 18px
        border1(rgba(7,17,27,.1))
        font-size 0
        .block
          display inline-block
          padding 8px 12px
          margin-right 8px
          border-radius 2px
          color rgb(77,85,93)
          font-size 12px
          line-height 16px
          &.active
            color #fff
          &.count
            font-size 8px
            margin-left 2px
          &.positive
            background-color rgba(0,160,220,.2)
            &.active
               background-color rgba(0,160,220,1)
          &.negative
            background-color rgba(77,85,93,.2)
            &.active
               background-color rgba(77,85,93,1)
      .switch
        padding 12px 18px
        line-height 24px
        border-bottom 1px solid rgba(7,17,27,.1)
        color rgb(147,153,159)
        font-size 0
        &.on
          .icon-check_circle
            color #00c850
        .icon-check_circle
          font-size 24px
          margin-right 4px
          display inline-block
          vertical-align top
         .text
          font-size 12px

    </style>
