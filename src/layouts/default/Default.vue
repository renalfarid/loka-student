<script setup>
  import DefaultView from './View.vue'
  import Sidebar from './Sidebar.vue';
</script>
<template>
  <div class="grid md:grid-cols-4 md:grid-cols-4 grid-flow-col auto-cols-max">
    <div>
      <Sidebar />
    </div>
    <div class="col-span-3">
      <DefaultView />
    </div>
      
  </div>
</template>