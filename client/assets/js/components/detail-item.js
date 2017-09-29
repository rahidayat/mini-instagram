Vue.component('detail-item', {
  props: ['image'],
  methods: {
    showDetail() {
      this.$emit('showed', this.image)
    }
  }
})