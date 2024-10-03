<script setup>
import { FetchProduct } from "@/composables/FetchProduct";
import { useResponsive } from "@/composables/useScreenBreakpoint";
import { onMounted, ref } from "vue";

const { sm, lg } = useResponsive();
const products = ref([]);
const openIndex = ref(null);
const isHoverd = ref(false);

const HoverdIn = (id) => {
  isHoverd.value = products.value.map((_, index) => index === id);
  console.log("Hoverd", openIndex.value);
};
const HoverdOut = (id) => {
  isHoverd.value = [];
};

onMounted(() => {
  const getData = async () => {
    try {
      const data = await FetchProduct();
      products.value = data.products.slice(20, 25);
    } catch (error) {
      console.error(error);
    }
  };
  getData();
});
</script>

<template>
  <div class="relative h-[90vh]">
    <!-- title -->
    <p
      :class="{
        'absolute top-[-7vh] right-5': lg,
        'absolute top-[-7vh] right-8 text-sm': sm,
        'text-main font-thin text-lg': true,
      }"
    >
      Welcome, <span class="text-links font-thin">Alice</span>
    </p>

    <!-- summary -->

    <div class="h-[90vh] overflow-auto">
      <p class="my-3 text-main font-bold text-xl">Recent Added Product</p>
      <!-- Newly added poduct -->
      <div
        class="flex lg:flex-row flex-col flex-wrap justify-center lg:gap-5 gap-2 group"
      >
        <div
          :class="{
            'rounded relative': true,
            'h-[14rem] w-[14rem]': lg,
            'h-fit w-full': sm,
          }"
          v-for="(product, index) in products"
          :key="index"
          @mouseenter="HoverdIn(index)"
          @mouseleave="HoverdOut(index)"
        >
          <img
            :src="product.thumbnail"
            alt="image"
            :class="{
              'bg-secondary rounded': true,
              'group-hover:scale-105 transition-transform duration-300 ease-out':
                isHoverd[index],
              'w-20': sm,
            }"
          />
          <p
            :class="{
              'text-main text-lg font-semibold absolute bottom-0': true,
              'bottom-16 transition-all duration-300': isHoverd[index],
              'bottom-0 transition-all duration-300': !isHoverd[index],
              'bottom-[3.2rem] left-[5.5rem] text-[1rem]': sm,
            }"
          >
            {{ product.title }}
          </p>

          <div
            :class="{
              'absolute bottom-16': true,
            }"
          >
            <div
              :class="{
                'h-fit max-h-[0rem] hidden': true && !sm,
                'group-hover:flex group-hover:flex-col max-h-[2rem] transition-all duration-300':
                  isHoverd[index],
                'w-[16rem] h-fit left-[5.5rem] bottom-[-4rem]  absolute': sm,
              }"
            >
              <p class="">
                <span class="text-submain font-semibold text-sm"
                  >Category :
                </span>
                <span class="text-links text-sm">{{ product.category }}</span>
              </p>
              <p class="text-main font-thin text-xs">
                {{
                  lg
                    ? product.description.substring(0, 70)
                    : product.description.substring(0, 70)
                }}
                ....
              </p>
            </div>

            <!-- <div class="w-screen h-fit left-20 bottom-[-2.5rem] bg-white absolute">55</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
