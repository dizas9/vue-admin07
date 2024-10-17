<script setup>
import { useResponsive } from "@/composables/useScreenBreakpoint";
import person2 from "../assets/img/person2.svg";
import password from "../assets/img/password.svg";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/user";
const loadingState = ref(false);
const errorMsg = ref("");

const { sm, lg, md, xl, "2xl": is2XL } = useResponsive();
const router = useRouter();
const userStore = useUserStore();

const handleSubmit = async (e) => {
  e.preventDefault();
  loadingState.value = true;

  const formData = new FormData();
  formData.append("username", e.target.username.value);
  formData.append("password", e.target.password.value);

  try {
    const response = await axios.post(
      `https://dummyjson.com/auth/login`,
      formData,
      {
        Headers: {
          "content-type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      loadingState.value = false;
      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken);
      userStore.setUserData(response.data);
      router.push("/Dashboard");
    } else {
      errorMsg.value = response.data;
    }
  } catch (error) {
    errorMsg.value = error;
    console.error(error);
  }
};
</script>

<template>
  <div
    :class="{
      'w-full h-screen bg-primary flex relative': true,
      'items-center justify-center': xl || is2XL || lg,
    }"
  >
    <!-- loading -->
    <div
      class="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.77)] z-30 flex items-center justify-center text-main font-bold"
      v-if="loadingState"
    >
      Please Wait . . .
    </div>
    <!-- login section -->
    <div
      :class="{
        'bg-secondary flex flex-col gap-5': true,
        'w-[30%] h-[70%] items-center p-10': xl || is2XL,
        'w-[55%] h-[65%] items-center p-16': lg,
        'w-[100%] h-[100%] items-center p-7': sm,
      }"
    >
      <!-- header -->
      <div
        :class="{
          'text-main font-bold': true,
          'text-xl': xl || lg || sm,
          'text-2xl': is2XL,
        }"
      >
        Login to Admin Pannel
      </div>
      <!-- login from -->

      <form
        :class="{ 'flex flex-col gap-3 w-full': true }"
        @submit="handleSubmit"
      >
        <div class="flex gap-2 w-full">
          <img :src="person2" alt="user" class="w-7" />
          <input
            type="text"
            placeholder="Username..."
            name="username"
            :class="{
              'py-2 px-3 rounded-full border-2 border-primary flex-1': true,
            }"
          />
        </div>

        <div class="flex gap-2 w-full">
          <img :src="password" alt="user" class="w-7" />
          <input
            type="text"
            placeholder="Password..."
            name="password"
            :class="{
              'py-2 px-3 rounded-full border-2 border-primary flex-1': true,
            }"
          />
        </div>

        <div
          class="flex gap-2 w-full justify-center text-main font-semibold bg-primary rounded-full"
        >
          <button
            class="cursor-pointer w-full h-full hover:border-2 rounded-full py-2 px-3"
            type="submit"
          >
            Continue
          </button>
        </div>
      </form>
      <!-- space or -->
      <div class="flex gap-1 items-center w-full">
        <span class="bg-white h-1 w-[45%]"></span>
        <span class="w-[10%] flex justify-center text-main font-semibold"
          >or</span
        >
        <span class="bg-white h-1 w-[45%]"></span>
      </div>
      <!-- guest login -->
      <div class="w-full">
        <button
          class="cursor-pointer bg-primary w-full h-full hover:border-2 rounded-full py-2 px-3 text-main font-semibold"
          type="submit"
        >
          Login as guest
        </button>
      </div>
    </div>
  </div>
</template>
