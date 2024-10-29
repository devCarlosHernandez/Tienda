<template>
  <div class="container">
      <AppSidebar></AppSidebar>
    <div class="content">
      <router-view></router-view>
    </div>
      <AppFooter></AppFooter>
  </div>
</template>

<script setup>
import AppSidebar from '../components/AppSidebar.vue';
import AppFooter from '../components/AppFooter.vue';
</script>


<style>


</style>
