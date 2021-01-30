<template>
  <img src="@/assets/home.gif" alt="" class="poster" @click="goIndex">
</template>

<script>
export default {
  name: 'Poster',
  methods: {
    goIndex () {
      this.$router.push('/index')
    }
  }
}
</script>

<style>
.poster{
    width: 100%;
    height: auto;
}
</style>
