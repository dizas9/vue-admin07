<script setup>
import ProductCard from "@/components/ProductCard.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const productList = ref([]);

const fetchProduct = async () => {
  try {
    const response = await axios.get(`https://dummyjson.com/products`);

    if (response.status === 200) {
      productList.value.push(...response.data.products);
    }
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  fetchProduct();
});
</script>

<template>
  <div class=" h-fit lg:m-10 lg:p-2 p-2">
    <div class="flex gap-5 flex-wrap items-center justify-center">
      <ProductCard
        v-for="(product, idx) in productList.slice(0, 10)"
        :key="idx"
        :data="product"
      />
    </div>
  </div>
</template>
