<template>
    <v-popover class="wrapper" :class="customClasses"
    >
      <b-tooltip :label="posTagName" position="is-bottom">
        <div @mouseover="onMouseOver" @mouseleave="onMouseLeave">
          <span :id="id" class="text" :style="customTextStyle">{{ tokenText }}</span>
          <div class="card pos-wrapper" :class="colorClasses">
            <div class="card-content">
              <span class="pos">{{ pos }}</span>
            </div>
          </div>
        </div>
      </b-tooltip>
      <div slot="popover">
        <TokenPopover :scrap="scrap" :token="token" />
      </div>
    </v-popover>
</template>

<script>
// import { getTextFromToken } from "../utilities/scrap";

import { getPosTag, POSTags, POS } from "../utilities/util";
import { makeTokenId, makeTokenIdWithTokenId } from "../utilities/scrap";
import TokenPopover from "./TokenPopover";

const lineBreakAfter = ['.', '?', '!']
export default {
  components: {TokenPopover},
  props: ['scrap', 'token', 'showDep', 'selections', 'sectionId'],
  data: () => ({
    lines: [],
    hover: false,
  }),
  computed: {
    id() {
      return makeTokenId(this.scrap, this.token, this.sectionId)
    },
    customClasses() {
      const { pos } = this
      if (pos === POS.PUNCT && lineBreakAfter.includes(this.tokenText)) {
        return 'sentence-end'
      }

      return null
    },
    colorClasses() {
      const { pos } = this.token

      if (!pos)
        return 'lel'

      if (pos.includes('NOUN') || pos === 'PROPN' || pos === 'PRON')
        return 'noun'

      if (pos.includes('ADJ') || pos.includes('ADV'))
        return 'adjective'

      if (pos.includes('VERB') || pos === 'AUX')
        return 'verb'

      return null
    },
    tokenText() {
      return this.token.text
      // return getTextFromToken(this.text, this.token)
    },
    pos() {
      return this.token.pos
    },
    posTagName() {
      return getPosTag(this.pos)
    },
    posMappings() {
      POSTags.ADJ
      return {

      }
    },
    shallDrawLine() {
      return this.showDep || this.hover
    },
    lineColor() {
      if (this.token.dep === 'compound')
        // They should be more prominent
        return '#48c774'

      if (this.token.dep === 'det')
        // They shouldn't be as prominent
        return '#7957d588'

      // Default coloring
      return '#7957d5'
    },
    mySelection() {
      const { start } = this.token
      return this.selections.find(sel => (start >= sel.min && start <= sel.max))
    },
    customTextStyle() {
      if (!this.selections)
        return null

      if (!this.mySelection)
        return null

      return {
        color: this.mySelection.color,
        fontWeight: 'bold',
      }
    },
  },
  beforeDestroy() {
    this.removeLines()
  },
  methods: {
    onMouseOver() {
      this.hover = true
    },
    onMouseLeave() {
      this.hover = false
    },
    makeLines() {
      if (!this.token.head || this.lines.length > 0)
        return

      const fromEl = document.getElementById(this.id)
      const toEl = document.getElementById(makeTokenIdWithTokenId(this.scrap, this.token.head, this.sectionId))
      if (!fromEl || !toEl) {
        console.log('noooo', fromEl, toEl)
        return
      }

      // eslint-disable-next-line no-undef
      const fromLine = new LeaderLine(
        fromEl,
        toEl,
        {
          color: this.lineColor,
          size: 4,
          path: 'arc',
          // eslint-disable-next-line no-undef
          middleLabel: LeaderLine.pathLabel(this.token.dep),
          lineOffset: [0, 100]
        },
      )
      this.lines.push(fromLine)
    },
    removeLines() {
      for (const line of this.lines) {
        line.remove()
      }
      this.lines = []
    },
  },
  watch: {
    shallDrawLine(shallDraw) {
      if (shallDraw) {
        this.makeLines()
      } else {
        this.removeLines()
      }
    },
  }
}
</script>

<style scoped>
  .wrapper {
    display: inline-block;
    text-align: center;
  }
  .card {
    margin: 1.5em;
    border-radius: 1em;
    border-style: solid;
    border-width: 0.1em;
    border-color: transparent;
  }

  .card-content {
    padding: 0.8em 1em 0.8em 1em;
  }

  .card .text {
    font-size: 1.4em;
    display: block;
    margin-bottom: 0.5em;
  }

  .card .pos {
    font-weight: bold;
    font-size: 0.75em;
    letter-spacing: 0.1em;
    color: gray;
  }

  .sentence-end {
    margin-right: 3em;
  }

  .pos-wrapper {
    border: 0.15em solid gray;
  }

  .noun {
    border-color: #f14668;
  }

  .verb {
    border-color: #167df0;
  }

  .adjective {
    border-color: #48c774;
  }

</style>