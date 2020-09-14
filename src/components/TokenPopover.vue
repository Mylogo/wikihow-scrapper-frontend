<template>
  <div>
    <h3 class="title word-title">{{ text }}</h3>
    <hr>
    <div class="columns">
      <div class="column">
        <span class="section-title">Probable synset: </span>
        <Synset v-if="probableSynset" :synset="probableSynset" />
        <span v-else>none</span>
      </div>
      <div class="column">
        <span class="section-title">Synonyms: </span>
        <span>{{ synonyms }}</span>
      </div>
      <div class="column">
        <span class="section-title">Antonyms: </span>
        <span>{{ antonyms }}</span>
      </div>
      <div class="column">
        <span class="section-title">Hyponyms: </span>
        <span>{{ hyponyms }}</span>
      </div>
    </div>
    <hr>
    <span class="section-title">All synsets ({{ allSynsets.length }}):</span>
    <Synset v-for="synset in allSynsets" :synset="synset" :key="synset.name" />
  </div>
</template>
<script>
  import { getWordDataWithTokenId } from "../utilities/scrap";
  import Synset from "./Synset";

  export default {
    components: {Synset},
    props: ['scrap', 'token'],
    computed: {
      text() {
        return this.token.text
      },
      wordData() {
        return getWordDataWithTokenId(this.scrap, this.token.id)
      },
      probableSynset() {
        return this.wordData.probable_synset
      },
      allSynsets() {
        return this.wordData.synsets
      },
      synonyms() {
        if (!this.probableSynset)
          return ''

        return this.probableSynset.synonyms.join(', ')
      },
      antonyms() {
        if (!this.probableSynset)
          return ''

        return this.probableSynset.antonyms.join(', ')
      },
      hyponyms() {
        if (!this.probableSynset)
          return ''

        return this.probableSynset.hyponyms.join(', ')
      },
    },
  }
</script>

<style scoped>
  .word-title {
    text-transform: uppercase;
    font-family: monospace;
  }
  .section-title {
    font-weight: bold;
    text-decoration: underline;
    display: block;
    margin-bottom: 0.25em;
  }
</style>