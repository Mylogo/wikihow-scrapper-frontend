<template>
  <div class="container">
    <div class="box">
      <div class="columns">
        <div class="column">
          <h6 class="title">Analyze Text</h6>
        </div>
        <div class="column">
          <div class="buttons is-right">
            <button class="button" @mousedown="removeScrap">
              <b-icon icon="trash" />
            </button>
          </div>
        </div>
      </div>
      <hr>
      <b-loading :active="scrap.state === ScrapState.Fetching" :is-full-page="false">
        <b-icon
            icon="sync-alt"
            size="is-large"
            custom-class="fa-spin">
        </b-icon>
      </b-loading>
      <template v-if="scrap.state === ScrapState.Default">
        <div>
          <p class="level">What sentence would you like to be analyzed?</p>
          <b-input class="level" v-model="searchTerm" placeholder="Enter your sentence" :disabled="disabledChanges" />
          <b-switch v-model="openie">Use OpenIE</b-switch>
          <br>
          <br>
          <button class="button is-success" @mousedown="onSearchClick" :disabled="disabledChanges">Check</button>
        </div>
      </template>

      <div v-if="scrap.state === ScrapState.Initialized">
        <TokenSet :scrap="scrap" :tokens="tokens" />
      </div>

      <div v-if="scrap.state === ScrapState.Error">
        <b-message title="Error" type="is-danger" :closable="false">
          {{ scrap.error }}
        </b-message>

      </div>

    </div>
  </div>
</template>
<script>
import { ScrapState, getTextFromToken, makeTokenIdWithTokenId } from "../utilities/scrap";
import { analyzeText } from "../utilities/util";
import TokenSet from "./TokenSet";

export default {
  props: ['scrap'],
  components: {
    TokenSet,
  },
  mounted() {
    // console.log('mounted')
    // for (const token of this.tokens) {
    //   if (!token.head)
    //     continue
    //   setTimeout(() => {
    //     new LeaderLine(
    //       document.getElementById(makeTokenIdWithTokenId(this.scrap, token.id)),
    //       document.getElementById(makeTokenIdWithTokenId(this.scrap, token.head)),
    //     )
    //   }, 1000)
    // }
  },
  data: () => ({
    searchTerm: '',
    openie: false,
  }),
  computed: {
    ScrapState: () => ScrapState,
    scrapId() {
      return this.scrap.id
    },
    tokens() {
      const { scrap } = this
      const doc = scrap.doc || {}
      // if (!scrap.data)
      //   return []
      // return scrap.data.tokens
      return doc.tokens || []
    },
    disabledChanges() {
      return this.scrap.state !== ScrapState.Default
    },
  },
  methods: {
    removeScrap() {
      this.$store.commit('scrap/remove/id', this.scrapId)
    },
    onSearchClick() {
      this.$store.commit('scrap/set', { scrap: this.scrap, update: { state: ScrapState.Fetching } })
      const { scrap, openie } = this
      analyzeText(this.searchTerm, openie)
        .then(response => {
          const { data } = response
          this.$store.commit('scrap/set', { scrap, update: { ...data, state: ScrapState.Initialized } })
        })
        .catch(error => {
          this.$store.commit('scrap/set', { scrap, update: { error, state: ScrapState.Error } })
        })
    },
    getTextFromToken,
  },
}
</script>

<style scoped>
  .container {
    margin: 1em;
  }
</style>