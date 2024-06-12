<template>
  <div
    v-for="faq in faqs"
    :key="faq.id"
    class="w-full h-full justify-start items-end space-y-4 mt-10 lg:px-0 px-8 flex-col flex"
  >
    <div class="flex items-center justify-center space-x-2">
      <h2 class="text-3xl Bold text-mainBlack">{{ faq.category }}</h2>
      <img src="../assets/images/logo.svg" class="w-8 object-contain" alt="" />
    </div>
    <h2
      v-for="(category, index) in faq.children"
      :key="index"
      class="text-2xl font-bold text-mainBlack"
    >
      {{ category.category }}
    </h2>
    <div
      v-for="(question, index) in faq.children[0].rows"
      :key="index"
      dir="rtl"
      class="collapse shadow-sm shadow-mainBlue"
    >
      <input type="checkbox" />
      <div class="collapse-title m-0 p-2 text-mainBlue text-xl font-medium">
        {{ question.question }}
      </div>
      <div class="collapse-content text-mainBlack">
        {{ question.answer }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAsyncData } from "#app"; // Import useAsyncData hook

const faqsData = await useAsyncData("faqData", async () => {
  try {
    const response = await fetch(
      "https://azapi.ok-ex.io/server/api/support/faq"
    );
    const data = await response.json();

    console.log("Fetched FAQs successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return []; // Return an empty array in case of error
  }
});
const faqs = faqsData.data._rawValue.data;
</script>
