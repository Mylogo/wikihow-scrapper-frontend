<template>
  <div class="container">
    <div class="section">
      <h1 class="title">HowTo Scrap</h1>
      <div class="container">
        <div class="buttons">
          <b-button class="button" @mousedown="addScrap" icon-left="plus">
            Add Scrap
          </b-button>
          <b-button class="button" @mousedown="addText" icon-left="plus">
            Add Text
          </b-button>
        </div>
        <template v-for="scrap in allScraps">
          <ScrapBlock v-if="scrap.type === ScrapTypes.Scrap" :scrap="scrap" :key="scrap.id" />
          <ScrapTextBlock v-else-if="scrap.type === ScrapTypes.Text" :scrap="scrap" :key="scrap.id" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ScrapTypes } from "./utilities/scrap";
import ScrapBlock from "./components/ScrapBlock";
import ScrapTextBlock from "./components/ScrapTextBlock";

export default {
  name: 'App',
  components: {
    ScrapTextBlock,
    ScrapBlock
  },
  mounted() {
    // create one empty scrap on start
    this.addScrap()
    this.addText()
  },
  computed: {
    allScraps() {
      return this.$store.state.scraps
    },
    store() {
      return this.$store
    },
    ScrapTypes: () => ScrapTypes,
  },
  methods: {
    addScrap() {
      this.$store.dispatch('scrap/do/add')
    },
    addText() {
      this.$store.dispatch('text/do/add')
    },
  },
}
</script>

<style>
</style>
