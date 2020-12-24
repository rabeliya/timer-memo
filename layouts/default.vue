<template>
<div class="wrapper">
  <PageHeader class="header" />
  <main class="main">
    <Nuxt />
  </main>
  <PageFooter class="footer" />
</div>
</template>
<script lang="ts">
// this is layouts
import "~/assets/scss/style.scss"
import PageHeader from "~/components/PageHeader.vue"
import PageFooter from "~/components/PageFooter.vue"


export default {
  components: {
    PageHeader,
    PageFooter
  }

}
</script>
<style lang="scss" scoped>
  .wrapper {
    display: grid;
    grid-template: 
      "header header header" auto
      "...... ...... ......" 60px
      "...... main   ......" auto
      "...... ...... ......" 60px
      "footer footer footer" auto
      / 1fr   800px  1fr;
      
      .header {
        grid-area: header;
      } 
      .main {
        grid-area: main;
      }
      .footer {
        grid-area: footer;
      }
  }
  
</style>
