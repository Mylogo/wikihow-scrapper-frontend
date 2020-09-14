<template>
  <div>
    <strong>{{ id }}: </strong>
    <span>{{ description }}</span>
  </div>
</template>

<script>
  export default {
    props: ['synset'],
    computed: {
      id() {
        return this.synset.name
      },
      description() {
        return this.synset.definition
      },
    },
  }
</script>