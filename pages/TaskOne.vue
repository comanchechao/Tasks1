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
            {{ coin.price }} USDT
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { PhMagnifyingGlass, PhXCircle, PhCoins } from "@phosphor-icons/vue";
import { ref, onMounted, onUnmounted, watchEffect } from "vue";
const wsClient = ref(null);
const formattedCoinData = ref([]);
let receivedData = "";
const formatChange = ref("");
const connect = async () => {
  try {
    wsClient.value = new WebSocket("wss://wsg.ok-ex.io/ws");
    await new Promise((resolve) => {
      wsClient.value.onopen = () => {
        resolve();
      };
    });

    wsClient.value.onmessage = (message) => {
      receivedData += message.data;
      if (receivedData.endsWith("}")) {
        try {
          const newData = JSON.parse(receivedData);
          receivedData = "";

          const formattedCoinData = [
            {
              name: newData.data[0].instId,

              change: (
                ((parseFloat(newData.data[0].high24h) -
                  parseFloat(newData.data[0].open24h)) /
                  parseFloat(newData.data[0].open24h)) *
                100
              ).toFixed(2),

              price: newData.data[0].last,
            },
          ];
          updateCoins(formattedCoinData);
          formatChange.value = formattedCoinData;
        } catch (error) {
          console.error("JSON parsing error:", error);
        }
      }
    };

    wsClient.value.onclose = () => {
      wsClient.value = null;
    };
  } catch (error) {
    console.error("Websocket connection error:", error);
  }
};

watch(formatChange, (Cur, old) => {
  updateCoins(Cur);
});

const disconnect = () => {
  if (wsClient.value) {
    wsClient.value.close();
  }
};
const updateCoins = (formattedData) => {
  coins.value.forEach((coin, index) => {
    const matchingData = formattedData.find((data) => data.name === coin.name);
    if (matchingData) {
      coins.value[index] = {
        ...coin,
        ...matchingData,
      };
    }
  });
};
const subscribeToChannels = (coins) => {
  coins.value.forEach((coin) => {
    if (wsClient.value && wsClient.value.readyState === WebSocket.OPEN) {
      const message = {
        op: "subscribe",
        args: [
          {
            channel: "tickers",
            instId: coin.name,
          },
        ],
      };
      wsClient.value.send(JSON.stringify(message));
    } else {
      console.error("Websocket not connected or ready for subscription");
    }
  });
};
const unsubscribeToChannels = (unsubscribeList) => {
  unsubscribeList.forEach((coin) => {
    if (wsClient.value && wsClient.value.readyState === WebSocket.OPEN) {
      const message = {
        op: "unsubscribe",
        args: [
          {
            channel: "tickers",
            instId: coin,
          },
        ],
      };
      wsClient.value.send(JSON.stringify(message));
    } else {
      console.error("Websocket not connected or ready for subscription");
    }
  });
};

const coins = ref([
  {
    name: "SOLUSDT",
    icon: "/SOL.webp",
    change: "",
    price: "",
  },
  {
    name: "BTCUSDT",
    icon: "/BTC.webp",
    change: "",
    price: "",
  },
  {
    name: "ETHUSDT",
    icon: "/Eth.webp",
    change: "",
    price: "",
  },
  { name: "OPUSDT", icon: "/OP.webp", change: "", price: "" },
  {
    name: "AVAXUSDT",
    icon: "/Avax.webp",
    change: "",
    price: "",
  },
  { name: "DOTUSDT", icon: "/Dot.webp", change: "", price: "" },
  {
    name: "XRPUSDT",
    icon: "/Xrp.webp",
    change: "",
    price: "",
  },
  { name: "ARBUSDT", icon: "/Arb.webp", change: "", price: "" },
  {
    name: "NEARUSDT",
    icon: "/Near.webp",
    change: "",
    price: "",
  },
  {
    name: "MATICUSDT",
    icon: "/matic.webp",
    change: "",
    price: "",
  },
]);
const allCoins = ref([]);
const subscriptions = ref([]);
const getTickets = async () => {
  const { data } = await $fetch("https://api.ok-ex.io/oapi/v1/market/tickers", {
    headers: {},
  })
    .then(function (response) {
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

onMounted(async () => {
  await connect();
  subscribeToChannels(coins);
  unsubscribeToChannels(unsubscribeList);

  setInterval(async () => {
    await connect();
    subscribeToChannels(coins);
    unsubscribeToChannels(unsubscribeList);
  }, 5000);
});

onUnmounted(() => {
  disconnect();
});
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
