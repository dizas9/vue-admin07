<script setup>
import { ref } from "vue";
import menu from "../assets/img/menu.svg";
import cross from "../assets/img/cross.svg";
import { useResponsive } from "@/composables/useScreenBreakpoint";
import SidebarMenu from "./SidebarMenu.vue";
const showNavigation = ref(false);
const showSidepanel = ref(false);

const { sm, md, lg } = useResponsive();

const handleSidebarOpen = () => {
  showNavigation.value = true;
};

const handleSidebarClose = () => {
  showNavigation.value = false;
};
</script>

<template>
  <nav
    class="w-full bg-[#2D2F36] h-[10vh]  flex items-center shadow-xl shadow-black lg:border-none border-b"
  >
    <div class="mx-5">
      <!-- menu icon -->
      <img
        v-if="sm"
        :src="menu"
        alt="menu_icon"
        class="w-10 cursor-pointer"
        @click="handleSidebarOpen"
      />
    </div>
  </nav>
  <div class="w-full h-[90vh] bg-primary relative">
    <!-- drawer -->
    <div
      :class="{
        'absolute top-[-10vh] lg:w-[5%] lg:hover:w-[15%] w-full  h-screen bg-[#383B44] z-30 shadow-lg transition-all duration-300 overflow-hidden': true,
        'translate-x-[-100%]': sm && !showNavigation,
        'translate-x-0': sm && showNavigation,
        'rounded-tr-3xl rounded-br-3xl':lg
      }"
    >
      <!-- cross icon -->
      <img
        :src="cross"
        alt="cross"
        class="w-10 cursor-pointer absolute top-5 left-3 z-40"
        v-if="sm"
        @click="handleSidebarClose"
      />
      <div
        class="w-full h-screen flex flex-col items-center transition-all duration-300 relative group"
      >
        <!-- user section -->
        <div
          :class="{
            'absolute right-5 top-5 ': sm,
            'flex flex-col items-center gap-2': true,
          }"
        >
          <div
            :class="{
              'w-16 h-16 border rounded-full': sm,
              'w-12 group-hover:w-16 h-12 group-hover:h-16 border rounded-full mt-5':
                lg,
            }"
          ></div>

          <!-- name -->
          <div class="flex flex-col items-center">
            <p
              :class="{
                'font-semibold text-submain opacity-0 group-hover:opacity-100 transition-opacity duration-300':
                  true && !sm,
                'opacity-100 font-semibold text-submain': sm,
              }"
            >
              WP. Winer
            </p>
          </div>
        </div>
        <SidebarMenu/>
      </div>
    </div>
    

    <!-- children component -->
     <div class="lg:ml-[5%] px-2">
        <router-view/>
     </div>
  </div>
</template>


