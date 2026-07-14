<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
<header class="fancy-header">{{title}}</header>
</template>

<style scoped>

.fancy-header {
    color:white;
    font-size: 32px;
    background-color:blue;

}


</style>
