<template>
  <div class="section">
    <section>
      <b-message>
        {{ originalText }}
      </b-message>
    </section>
  </div>
</template>

<script>
export default {
  props: ['doc'],
  data: () => ({
    
  }),
  computed: {
    originalText() {
      return this.doc.text
    },
  },
}
</script>