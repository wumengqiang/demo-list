<template>
  <div class="demos-view">
    <div class="demos-list-nav">
      <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">&lt; prev</router-link>
      <a v-else class="disabled">&lt; prev</a>
      <span>{{ page }}/{{ demos.maxPage }}</span>
      <router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1)">more &gt;</router-link>
      <a v-else class="disabled">more &gt;</a>
    </div>
    <transition :name="transition">
      <div class="demos-list" :key="page" v-if="page > 0">
        <transition-group tag="ul" name="item">
          <item v-for="item in demos.data" :key="item.name" :item="item">
          </item>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
import { watchList } from '../api'
import Item from '../components/Item.vue'

export default {
  name: 'item-list',

  asyncData ({ store,route}) {
    return store.dispatch('FETCH_DEMO_DATA', 
      route.params);
  },

  title: "demo列表",

  components: {
    Item
  },

  props: {
    type: String
  },

  data () {
    return {
      transition: 'slide-right',
      displayedPage: Number(this.$store.state.route.params.page) || 1,
      displayedItems: this.$store.getters.activeItems
    }
  },

  computed: {
    page () {
      return Number(this.$store.state.route.params.page) || 1
    },
    demos () {
      return this.$store.state.demos || {};
    },
    hasMore(){
      return this.demos.page < this.demos.maxPage
    }
  },

  beforeMount () {
    if (this.$root._isMounted) {
      this.loadItems(this.page)
    }
  },

  beforeDestroy () {
  },

  watch: {
    page (to, from) {
      this.loadItems(to, from)
    }
  },

  methods: {
    loadItems: function(page){
      this.$store.dispatch('FETCH_LIST_DATA', {
        page: this.page,
        tag: this.demos.tag || ""
      })
    }
  }
}
</script>

<style lang="stylus">
.demos-view
  padding-top 45px

.demos-list-nav, .demos-list
  background-color #fff
  border-radius 2px

.demos-list-nav
  padding 15px 30px
  position fixed
  text-align center
  top 55px
  left 0
  right 0
  z-index 998
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  a
    margin 0 1em
  .disabled
    color #ccc

.demos-list
  position absolute
  margin 30px 0
  width 100%
  transition all .5s cubic-bezier(.55,0,.1,1)
  ul
    list-style-type none
    padding 0
    margin 0

.slide-left-enter, .slide-right-leave-to
  opacity 0
  transform translate(30px, 0)

.slide-left-leave-to, .slide-right-enter
  opacity 0
  transform translate(-30px, 0)

.item-move, .item-enter-active, .item-leave-active
  transition all .5s cubic-bezier(.55,0,.1,1)

.item-enter
  opacity 0
  transform translate(30px, 0)

.item-leave-active
  position absolute
  opacity 0
  transform translate(30px, 0)

@media (max-width 600px)
  .demos-list
    margin 10px 0
</style>
