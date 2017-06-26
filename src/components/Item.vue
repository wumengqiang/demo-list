<template>
  <li class="news-item">
    <span class="title">
        <a :href="'/demos/detail/' + item.name">{{ item.title }}</a>
    </span>
    <br>
    <span class="meta">
      <span class="time">{{ago}}</span> ago
    </span>
    <span  v-for="tag in item.tags" :key="tag + item.name">
      <router-link :to="'/demos/tags/' + tag" class="tag">{{ tag }}</router-link>
    </span>
  </li>
</template>

<script>
import moment from "moment"
import { timeAgo } from '../util/filters'

export default {
  name: 'news-item',
  props: ['item'],
  // https://github.com/vuejs/vue/tree/dev/packages/vue-server-renderer#component-caching
  serverCacheKey: ({ item: { name, time }}) => {
    return `${name}::${timeAgo(time)}`
  },
  computed: {
    ago: function(){
      return this.item.time ? timeAgo(moment(this.item.time, "YYYY-MM-DD HH:mm").unix()) : '';
    }
  }
}
</script>

<style lang="stylus">
.news-item
  background-color #fff
  padding 20px 30px 20px 80px
  border-bottom 1px solid #eee
  position relative
  line-height 20px
  .tag
    line-height: 12px;
    font-size: 12px;
    display: inline-block;
    padding: 2px 8px;
    background: #eee;
    margin-right: 10px;
    border-radius: 3px;
    color: #FF662B;
  .score
    color #ff6600
    font-size 1.1em
    font-weight 700
    position absolute
    top 50%
    left 0
    width 80px
    text-align center
    margin-top -10px
  .meta, .host
    font-size .85em
    color #828282
    a
      color #828282
      text-decoration underline
      &:hover
        color #ff6600
</style>
