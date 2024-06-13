<template>
  <div
    lang="fa"
    class="h-screen w-screen flex justify-center items-center bg-gray-200"
  >
    <div
      class="h-rem45 w-rem28 flex-col space-y-3 drop-shadow-lg card flex items-end justify-start rounded-md"
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
      <div class="my-5 w-full h-full">
        <div
          v-for="coin in coins"
          :key="coin.id"
          class="grid grid-cols-3 w-full my-3 hover:bg-gray-100 place-content-center content-center place-items-center"
        >
          <div class="flex w-full pl-7 items-start justify-start space-x-2">
            <img
              :src="coin.icon"
              :key="coin.name"
              class="object-contain w-7"
              alt=""
            />
            <h2 class="text-sm font-normal text-mainBlack">{{ coin.name }}</h2>
          </div>
          <h2
            :class="{
              'bg-green-100 text-green-500': parseFloat(coin.change) > 0,
              'bg-red-100 text-red-500': parseFloat(coin.change) < 0,
            }"
            class="px-4 py-2 rounded-md"
          >
            <pre>{{ coin.change }}%</pre>
          </h2>
          <h2 class="text-sm py-2 text-mainBlack rounded-md">
            {{ coin.price }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { PhMagnifyingGlass, PhXCircle, PhCoins } from "@phosphor-icons/vue";
import { ref, onMounted, onUnmounted, watchEffect } from "vue";
import { useWebsocket } from "../composable/useWebsocket"; // Assuming composable path

const {
  connect,
  disconnect,
  subscribeToChannels,
  coinsData,
  unsubscribeToChannels,
} = useWebsocket();
const coins = ref([
  {
    name: "SOLUSDT",
    icon: "/SOL.webp",
    change: "0.22%",
    price: "11309 USD",
  },
  {
    name: "BTCUSDT",
    icon: "/BTC.webp",
    change: "0.73%",
    price: "43215.00 USDT",
  },
  {
    name: "ETHUSDT",
    icon: "/Eth.webp",
    change: "-5.16%",
    price: "2283.60 USDT",
  },
  { name: "OPUSDT", icon: "/OP.webp", change: "-2.99%", price: "3.567 USDT" },
  {
    name: "AVAXUSDT",
    icon: "/Avax.webp",
    change: "0.44%",
    price: "47.53 USDT",
  },
  { name: "DOTUSDT", icon: "/Dot.webp", change: "6.84%", price: "9.128 USDT" },
  {
    name: "XRPUSDT",
    icon: "/Xrp.webp",
    change: "0.28%",
    price: "0.6164 USDT",
  },
  { name: "ARBUSDT", icon: "/Arb.webp", change: "2.05%", price: "13839 USDT" },
  {
    name: "NEARUSDT",
    icon: "/Near.webp",
    change: "0.82%",
    price: "30920 USDT",
  },
  {
    name: "MATICUSDT",
    icon: "/matic.webp",
    change: "2.86%",
    price: "0.8697 USDT",
  },
]);
const allCoins = ref([]);
const subscriptions = ref([]);
const getTickets = async () => {
  const { data } = await $fetch("https://api.ok-ex.io/oapi/v1/market/tickers", {
    headers: {},
  })
    .then(function (response) {
      // console.log(response);
      allCoins.value = response;
    })
    .catch(function (error) {
      console.error(error);
    });
};
const unsubscribeList = [
  "MATIC-USDT",
  "SOL-USDT",
  "BTC-USDT",
  "ETH-USDT",
  "OPU-SDT",
  "AVAX-USDT",
  "DOT-USDT",
  "ARB-USDT",
  "NEAR-USDT",
  "XRP-USDT",
  ,
];

const rawData = toRaw(coinsData._rawValue);
const searchProperty = "change"; // Property to search

onMounted(async () => {
  await connect();
  subscribeToChannels(coins, subscriptions);
  unsubscribeToChannels(unsubscribeList);
  updateCoins();
  const matchingValues = rawData
    .filter((obj) => ({ [searchProperty]: obj[searchProperty] }))
    [searchProperty].map((val) => val);
  console.log(matchingValues);
  console.log("jsonData:", rawData);
});
onUnmounted(disconnect);

const updateCoins = () => {
  for (const coin of coins.value) {
    const matchingData = rawData.find((data) => data.name === coin.name);
    if (matchingData) {
      coin.change = matchingData.change;
      coin.price = matchingData.price;
    } else {
      console.warn("No matching data found for:", coin.name); // Informative warning
    }
  }
};

watch(rawData, updateCoins, { deep: true });
</script>
<style>
.card {
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  background-color: rgba(255, 255, 255, 0.68);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
}
</style>
