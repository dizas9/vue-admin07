<script setup>
import { onMounted, ref } from "vue";
import menu from "../assets/img/menu.svg";
import expand from "../assets/img/expand.svg";
import cross from "../assets/img/cross.svg";
import { useResponsive } from "@/composables/useScreenBreakpoint";
import SidebarMenu from "./SidebarMenu.vue";
import logout from "../assets/img/logout.svg";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const showNavigation = ref(false);
const showSidepanel = ref(false);

const router = useRouter();
const userStore = useUserStore();
userStore.fetchUserData();


const { sm, md, lg, xl, "2xl": is2XL } = useResponsive();

const handleSidebarOpen = () => {
  showNavigation.value = true;
};

const handleSidebarClose = () => {
  showNavigation.value = false;
};

const handleLogout = () => {
  Cookies.remove("accessToken");
  userStore.clear();
  router.push("/");
};

// open sidebar in tablet mode
const handleSidebarOpenInTablet = () => {
  showSidepanel.value = !showSidepanel.value;
};
</script>

<template>
  <div class="w-full h-[100vh] bg-primary relative">
    <div class="mx-5">
      <!-- menu icon -->
      <img
        v-if="sm"
        :src="menu"
        alt="menu_icon"
        class="w-10 cursor-pointer min-w-[2rem] pt-3"
        @click="handleSidebarOpen"
      />
    </div>
    <!-- drawer -->
    <div
      :class="{
        'absolute h-screen bg-[#383B44] z-30 shadow-lg transition-all duration-300 overflow-hidden': true,
        'w-[7%] h-screen': md,
        'w-[7%]': lg,
        'w-[32%]': lg && showSidepanel,
        'translate-x-[-100%]': sm && !showNavigation,
        'translate-x-0 w-full top-0': sm && showNavigation,
        'rounded-tr-3xl rounded-br-3xl lg:w-[5%] lg:hover:w-[15%]': is2XL || xl,
      }"
    >
      <!-- cross icon -->
      <img
        :src="cross"
        alt="cross"
        :class="{
          'w-10 cursor-pointer absolute top-5 left-3 z-40': true,
          hidden: is2XL || xl || md || lg,
        }"
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
          <img
            :class="{
              'w-16 h-16 border rounded-full': sm,
              'w-12 group-hover:w-16 h-12 group-hover:h-16 border rounded-full mt-5':
                xl || is2XL,
              hidden: lg,
            }"
            :src="userStore.userData?.image"
          ></img>

          <div :class="{ 'w-[100%]': lg, hidden: xl || is2XL || sm }">
            <img
              :src="expand"
              alt="expand"
              :class="{
                'w-7 mt-3 p-1 cursor-pointer': true,
                'rotate-180 ml-[10rem] transition-all duration-150':
                  showSidepanel,
              }"
              @click="handleSidebarOpenInTablet"
            />
          </div>

          <!-- name -->
          <div :class="{ 'flex flex-col items-center': true, hidden: lg }">
            <p
              :class="{
                'font-semibold text-submain opacity-0 group-hover:opacity-100 transition-opacity duration-300':
                  true && !sm,
                'opacity-100 font-semibold text-submain': sm,
              }"
            >
              {{ userStore.userData?.firstName }}
            </p>
          </div>
        </div>
        <SidebarMenu :isClicked="showSidepanel" />
        <div
          :class="{
            'flex items-start justify-end w-full pr-2 mb-2': true,
            'absolute bottom-44 right-[45%]': sm,
          }"
        >
          <img
            :src="logout"
            alt="logout"
            class="w-7 cursor-pointer"
            @click="handleLogout"
          />
        </div>
      </div>
    </div>

    <!-- children component -->
    <div class="lg:ml-[5%] px-2">
      <router-view />
    </div>
  </div>
</template>
