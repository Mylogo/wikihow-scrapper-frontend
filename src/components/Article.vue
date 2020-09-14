<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <div v-for="(section, i) in analyzedSections">
      <TokenSet :scrap="section" :tokens="section.doc.tokens" :key="i" :section-id="i" />
      <hr>
    </div>
  </div>
</template>
<script>
  import TokenSet from "./TokenSet";
  export default {
    components: {
      TokenSet
    },
    props: ['scrap', 'article', 'analyzedSections'],
    computed: {
      title() {
        return this.article.title
      },
    },
  }
</script>