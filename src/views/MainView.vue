<template>
  <div class="container">
      <AppSidebar></AppSidebar>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from '../components/AppSidebar.vue';

</script>


<style>


</style>
