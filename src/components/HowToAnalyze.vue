<template>
  <div>
    <p class="level">What would you like to know about?</p>
    <b-input class="level" v-model="searchTerm" placeholder="Enter WikiHow Search term" />
    <button class="button is-success" @mousedown="onSearchClick" :disabled="scrap.loading">Search</button>
    <div class="is-left">
    </div>
  </div>
</template>
<script>
export default {
  props: ['scrap'],
  data: () => ({
    searchTerm: '',

  }),
  computed: {

  },
  methods: {
    onSearchClick() {

    }
  },
}
</script>
