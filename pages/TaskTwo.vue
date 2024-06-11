<template>
  <div class="h-full w-screen flex items-start pt-16 bg-mainWhite">
    <div class="h-screen w-1/2 flex items-center flex-col justify-start p-10">
      <img
        class="h-dialog object-contain"
        src="../assets/images/FAQ.webp"
        alt=""
      />
    </div>
    <div class="h-full w-1/2 px-44 flex items-end flex-col justify-center p-10">
      <h1
        dir="rtl"
        class="border-b-8 rounded-md pb-3 border-mainBlue text-5xl text-mainBlack font-bold"
      >
        سوالات متداول (FAQ)
      </h1>
      <h1 dir="rtl" class="text-lg mt-1 text-gray-500">
        با پاسخ به سوالات متداول، وقت خود را ذخیره کنید!
      </h1>
      <h2 class="text-2xl text-mainBlack mt-9">جستجوی پیشرفته سوالات متداول</h2>
      <div
        class="relative my-6 flex items-center justify-center bg-gray-100 w-full text-gray-600 focus-within:text-gray-400"
      >
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button
            type="submit"
            class="p-1 focus:outline-none focus:shadow-outline"
          >
            <PhXCircle class=" " size="15"></PhXCircle>
          </button>
        </span>
        <input
          dir="rtl"
          type="search"
          name="q"
          class="py-2 text-sm w-full text-white bg-gray-100 rounded-md pr-3 pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
          placeholder="جستجو..."
          autocomplete="off"
        />
        <span class="absolute inset-y-0 right-0 flex items-center pr-2">
          <button
            type="submit"
            class="p-1 focus:outline-none focus:shadow-outline"
          ></button>
        </span>
      </div>
      <Freq />
    </div>
  </div>
</template>
<script setup>
import { PhMagnifyingGlass, PhXCircle, PhCoins } from "@phosphor-icons/vue";
</script>
<style>
@font-face {
  font-family: "Bold";
  src: url("../assets/fonts/YekanBakhBold.otf");
  font-style: normal;
  font-display: swap;

  unicode-range: U+0600-06FF, U+FB8A- UFEFF;
}
.Bold {
  font-family: "Bold";
  font-weight: 600;
}
</style>
