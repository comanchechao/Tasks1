<template>
  <div
    v-for="(faq, index) in faqs"
    :key="index"
    class="w-full h-full justify-start items-end space-y-4 mt-24 flex-col flex"
  >
    <div class="flex items-center justify-center space-x-2">
      <h2 class="text-3xl Bold text-mainBlack">
        {{ faq.category }}
      </h2>
      <img src="../assets/images/logo.svg" class="w-8 object-contain" alt="" />
    </div>
    <h2 class="text-2xl font-bold text-mainBlack">احراز هویت</h2>
    <div
      v-for="(question, index) in faq.children"
      :key="index"
      dir="rtl"
      class="collapse"
    >
      <input type="checkbox" />
      <div class="collapse-title text-mainBlue text-xl font-medium">
        {{ question.question }}
      </div>
      <div class="collapse-content text-mainBlack">
        <p>{{ question.answer }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { PhMagnifyingGlass, PhXCircle, PhCoins } from "@phosphor-icons/vue";

import { useAsyncData } from "#app"; // Import useAsyncData hook

const { faqs } = useAsyncData("faqData", async () => {
  try {
    const response = await fetch(
      "https://azapi.ok-ex.io/server/api/support/faq"
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return []; // Return an empty array in case of error
  }
});
</script>
