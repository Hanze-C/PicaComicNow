<template lang="pug">
#about-container
  h1 关于

  h2 PicaComicNow
  .card
    p PicaComicNow是由FreeNowOrg开发的基于VUE的PicACG非官方Web App
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { setTitle } from '../utils/setTitle'

onMounted(() => {
  setTitle('About')
})
</script>

<style scoped lang="sass"></style>