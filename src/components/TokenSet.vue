<template>
  <div>
    <i>{{ text }}</i>
    <br>
    <br>
    <div class="columns">
      <div class="column">
        <b-switch v-model="showDeps">Draw Dependencies</b-switch>
      </div>
      <div class="column">
        <b-switch v-model="hiddenText">Hide Text</b-switch>
      </div>
      <div class="column">
        <b-switch v-if="hasOpenIE" v-model="hiddenOpenIE">Hide OpenIE</b-switch>
      </div>
    </div>
    <div class="section" v-if="!hiddenText">
      <div v-if="!hiddenOpenIE">
        <b-table
            :columns="openIEColumns"
            :data="openIEData"
            :focusable="true"
            :selected.sync="selectedOpenIE"
            :bordered="true"
        >
        </b-table>
        <br>
      </div>
      <div>
        <Token
            v-for="token in tokens"
            :key="token.id"
            :scrap="scrap"
            :token="token"
            :show-dep="showDeps"
            :style="customTokenStyle"
            :selections="selections"
            :section-id="sectionId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Token from "./Token";

export default {
  components: {Token},
  data: () => ({
    showDeps: false,
    hiddenText: false,
    hiddenOpenIE: true,
    selectedOpenIE: null,
  }),
  props: ['scrap', 'tokens', 'sectionId'],
  computed: {
    customTokenStyle() {
      if (this.showDeps) {
        // Make them spread more so the arrows overlay less
        return {
          margin: '2em',
        }
      }

      return null
    },
    hasOpenIE() {
      return this.scrap.openie != null
    },
    text() {
      return this.scrap.doc.text
    },
    openIEColumns() {
      return [
        // {
        //   field: 'id',
        //   label: 'Sentence #',
        // },
        {
          field: 'confidence',
          label: 'Confidence',
          numeric: true,
          width: 100
        },
        {
          field: 'extraction.arg1.text',
          label: 'Arg 1'
        },
        {
          field: 'extraction.rel.text',
          label: 'Relation',
        },
        {
          field: 'extraction.arg2s.0.text',
          label: 'Arg 2',
        },
      ]
    },
    selections() {
      if (!(this.hasOpenIE && this.selectedOpenIE && !this.hiddenOpenIE))
        return []

      const arg1 = this.selectedOpenIE.extraction.arg1
      const relation = this.selectedOpenIE.extraction.rel
      const arg2 = this.selectedOpenIE.extraction.arg2s[0]

      const coloring = []

      const insertColorIfExists = (arg, color) => {
        if (!arg)
          return

        let offsets = arg.offsets
        if (Array.isArray(offsets[0]))
          offsets = offsets[0]
        const minPoint = Math.min(...offsets)
        const maxPoint = Math.max(...offsets)

        coloring.push({
          min: minPoint,
          max: maxPoint,
          color,
        })
      }

      insertColorIfExists(arg1, 'red')
      insertColorIfExists(relation, 'green')
      insertColorIfExists(arg2, 'blue')

      return coloring
    },
    openIEData() {
      return this.scrap.openie
    },
  },
}
</script>
