<script setup>
import { ref } from "vue";
import products from "../assets/img/products.svg";
import categories from "../assets/img/categories.svg";
import orders from "../assets/img/orders.svg";
import customers from "../assets/img/customers.svg";
import settings from "../assets/img/settings.svg";
import list from "../assets/img/list.svg";
import manage from "../assets/img/manage.svg";
import arrow_left from "../assets/img/arrow_left.svg";
import arrow_right from "../assets/img/arrow_right.svg";
import { useResponsive } from "@/composables/useScreenBreakpoint";

defineProps({
  isClicked: {
    type: Boolean,
    required: true,
  },
});

const { sm, lg, md, xl, "2xl": is2XL } = useResponsive();
const isClick = ref([]);

const menuItems = ref([
  { name: "Products", src: products },
  { name: "Categories", src: categories },
  { name: "Orders", src: orders },
  { name: "Customers", src: customers },
  { name: "Settings", src: settings },
]);

const menuItemClick = (id) => {
  isClick.value = menuItems.value.map((_, index) => index === id);
};
</script>

<template>
  <div
    :class="{
      'w-full max-h-[70%] min-h-[70%] flex flex-col gap-5 my-5': true,
      'absolute top-28': sm,
      'mt-16': lg,
    }"
  >
    <div
      :class="{
        'bg-primary flex flex-col gap-2 justify-center max-h-fit min-h-10 o items-center  mx-2 rounded-lg relative': true,
        '': lg,
        'pl-2 mx-7': sm,
      }"
      v-for="(menuItem, index) in menuItems"
      :key="index"
    >
      <div
        :class="{
          'flex w-full gap-2 cursor-pointer': true,
          'justify-center group-hover:justify-start group-hover:pl-2':
            xl || is2XL || !isClicked,
          'justify-start pl-2': isClicked && lg,
          'my-2': isClick[index],
        }"
      >
        <img
          :src="menuItem.src"
          alt="logo"
          :class="{ 'w-7': sm || xl || is2XL, 'w-6': lg || sm }"
        />
        <p
          :class="{
            'text-main font-semibold  group-hover:flex': true,
            hidden: xl || is2XL || (!isClicked && lg),
            flex: lg && isClicked,
            flex: sm,
          }"
        >
          {{ menuItem.name }}
        </p>
        <span
          :class="{
            'w-full': true,
            'hidden group-hover:justify-end group-hover:flex pr-2':
              xl || is2XL || (!isClicked && lg),
            'justify-end flex': lg,
            'justify-end flex pr-3': sm,
          }"
          @click="menuItemClick(index)"
          v-if="index !== 4"
        >
          <img
            :src="arrow_right"
            alt="arrow_right"
            :class="{
              'w-7': true,
              'rotate-180 transition-transform duration-300': isClick[index],
            }"
          />
        </span>
      </div>

      <div
        :class="{
          'h-fit w-full bg-primary group-hover:flex group-hover:flex-col': true,
          'hidden group-hover:flex group-hover:flex-col':
            xl || is2XL || (!isClicked && lg),
          'flex flex-col': sm,
        }"
        v-show="isClick[index]"
      >
        <ul
          class="flex flex-col text-links text-sm font-semibold group-hover:bg-primary"
        >
          <li
            :class="{
              'hover:bg-secondary border-b border-t py-2 flex gap-2 pl-5 cursor-pointer': true,
            }"
          >
            <img :src="list" alt="list" class="w-5" />
            <span>List</span>
          </li>
          <li
            :class="{
              'hover:bg-secondary border-b border-t py-2 flex gap-2 pl-5 cursor-pointer': true,
            }"
          >
            <img :src="manage" alt="manage" class="w-5" />
            <span>Manage</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
