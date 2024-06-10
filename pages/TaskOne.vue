<template>
  <div
    lang="fa"
    class="h-screen w-screen flex justify-center items-center bg-gray-200"
  >
    <div
      class="h-rem40 w-rem28 flex-col space-y-3 bg-mainWhite flex items-end justify-start rounded-md"
    >
      <div class="flex items-center space-x-3 m-2">
        <h1 class="text-md text-mainBlue">انتخاب کوین</h1>
        <PhCoins size="20" class="text-mainBlue" />
      </div>
      <div class="h-12 w-full flex items-center space-x-2 justify-center">
        <div class="h-full w-full flex items-center justify-center bg-gray-100">
          <h2 class="text-mainBlack text-sm">USDT</h2>
        </div>
        <div class="h-full w-full flex items-center justify-center bg-gray-100">
          <h2 class="text-gray-400 text-sm">IRL</h2>
        </div>
      </div>
      <div
        class="relative flex items-center justify-center bg-gray-100 w-full text-gray-600 focus-within:text-gray-400"
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
          class="py-2 text-sm w-4/5 text-white bg-gray-100 rounded-md pr-3 pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
          placeholder="جستجو..."
          autocomplete="off"
        />
        <span class="absolute inset-y-0 right-0 flex items-center pr-2">
          <button
            type="submit"
            class="p-1 focus:outline-none focus:shadow-outline"
          >
            <PhMagnifyingGlass class=" " size="15"></PhMagnifyingGlass>
          </button>
        </span>
      </div>
      <div class="grid grid-cols-3 w-full place-items-center">
        <h2 class="text-sm">جفت</h2>
        <h2 class="text-sm">تغییر <span class="mx-1">24</span> ساعته</h2>
        <h2 class="text-sm">قیمت</h2>
      </div>
    </div>
  </div>
</template>
<script setup>
import { PhMagnifyingGlass, PhXCircle, PhCoins } from "@phosphor-icons/vue";
</script>
<style></style>
