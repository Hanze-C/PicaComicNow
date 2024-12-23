<template lang="pug">
#index-container
  h1 PicACG

  .mbox.info(style='margin-bottom: 1.5rem')
    .title Tips
    p 本项目仍在开发中

  .flex.gap-1
    .card.flex-1
      h2 Greeting
      p Hello, World!
      p PicaComicNow@0.2.0
      p {{ time }}
    .card.flex-1
      h2 Links
      p
        router-link.button(to='/profile') 个人资料
        | &nbsp;
        router-link.button(to='/favourite') 我的收藏
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { setTitle } from '@/utils/setTitle'
import { onBeforeUnmount, ref } from 'vue'

setTitle()

const user = useUserStore()

const time = ref(new Date().toLocaleString())
let timer = setInterval(() => {
  time.value = new Date().toLocaleString()
}, 1000)
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="sass"></style>
