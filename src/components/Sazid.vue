<script setup>
import { defineProps } from "vue";

defineProps({
  name: {
    type: String,
    default: "Default",
  },
});
</script>

<template>
  <h1>Hello ,{{ name }}</h1>
</template>
