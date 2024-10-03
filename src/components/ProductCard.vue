<script setup>
import { defineProps } from 'vue';
defineProps({
    data:{
        type: Object,
        default: [],
    }
})
</script>

<template>
    <div class="w-[45%] lg:max-w-[20%] lg:min-w-[20%] bg-[rgba(0,0,0,0.3)] flex flex-col items-center gap-2 cursor-pointer hover:shadow-lg shadow-black hover:scale-105">
        <img :src="data.thumbnail" alt="product_thumbnail" class="m-2 lg:rounded-lg rounded bg-white w-28 lg:w-44">

        <div class="flex flex-col items-center">
            <p class="text-[rgba(0,128,0,0.5)] font-semibold hover:text-[blue] cursor-pointer lg:max-w-[70%] text-center">{{ data.title }}</p>
        </div>
    </div>
</template>
