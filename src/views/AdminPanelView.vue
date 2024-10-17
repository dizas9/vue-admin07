<script setup>
import { FetchProduct } from "@/composables/FetchProduct";
import { useResponsive } from "@/composables/useScreenBreakpoint";
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";

const { sm, lg, md, xl, "2xl": is2XL } = useResponsive();
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
const userStore = useUserStore();

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
  <div class="relative h-[90vh] flex flex-col items-center">
    <!-- title -->
    <p
      :class="{
        'text-main font-thin text-lg flex justify-end  w-full': true,
      }"
    >
      Welcome,
      <span class="text-links font-thin">{{
        userStore.userData?.firstName
      }}</span>
    </p>

    <!-- summary -->

    <div
      :class="{
        'h-[90vh] overflow-auto  px-2': true,
        'w-[90%] min-w-[90%]': is2XL || xl,
        'w-[90%]': lg,
        'w-[100%] min-w-[100%]': sm,
      }"
    >
      <p class="my-3 text-main font-bold text-xl pl-7">Recent Added Product</p>
      <!-- Newly added poduct -->
      <div
        :class="{
          'flex lg:flex-row  flex-wrap justify-center lg:gap-5 gap-2 group': true,
          'flex-col': sm,
          'flex-row gap-5 items-start': lg,
        }"
      >
        <div
          :class="{
            'rounded relative': true,
            'h-[12rem] w-[12rem]': xl,
            'w-[18rem] h-[18rem]': is2XL,
            'w-[8rem] h-[8rem]': lg,
            'h-[8rem] w-[8rem]': md,
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
                'h-fit max-h-[0rem] hidden ': true && !sm,
                'group-hover:flex group-hover:flex-col max-h-[2rem] transition-all duration-300':
                  isHoverd[index],
                'w-[16rem] h-fit left-[5.5rem] bottom-[-4rem]  absolute': sm,
                'bottom-[-2rem] absolute w-[14rem]': lg,
                'bottom-[-2rem] absolute w-[12rem]': xl,
                'bottom-[-2rem] absolute w-[18rem]': is2XL,
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
                    : product.description.substring(0, 50)
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
