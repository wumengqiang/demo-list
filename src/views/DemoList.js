import ItemList from './ItemList.vue'

export default function DemoList(){
  return {
    name: `demo-list`,

    asyncData ({ store, route }) {
      return store.dispatch('FETCH_DEMO_DATA', route.params);
    },

    title: "demo列表",

    render (h) {
      return h(ItemList)
    }
  }
}