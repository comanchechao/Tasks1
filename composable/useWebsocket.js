import { ref } from "vue";

export function useWebsocket() {
  const data = ref([]);
  const wsClient = ref(null);
  let receivedData = "";
  const coinsData = ref([]);
  const subscriptions = ref([]);

  // Define subscriptions ref here
  const connect = async () => {
    try {
      wsClient.value = new WebSocket("wss://wsg.ok-ex.io/ws");
      await new Promise((resolve) => {
        wsClient.value.onopen = () => {
          console.log("Websocket connected");

          resolve(); // Resolve the promise when the connection opens
        };
      });
      wsClient.value.onmessage = (message) => {
        receivedData += message.data;
        // console.log(receivedData);
        if (receivedData.endsWith("}")) {
          try {
            // console.log(receivedData);

            const newData = JSON.parse(receivedData);
            receivedData = "";
            // jsonData.value.push(JSON.parse(receivedData));
            // jsonData.value = jsonData.value.slice(-10);
            // console.log(newData.data[0].instId);
            // console.log(newData);
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

            // console.log(formattedCoinData);

            coinsData.value.push(formattedCoinData);
          } catch (error) {
            console.error("JSON parsing error:", error);
          }
        }
      };
      wsClient.value.onclose = () => {
        console.log("Websocket closed");
        wsClient.value = null; // Reset the client reference
      };
    } catch (error) {
      console.error("Websocket connection error:", error);
    }
  };

  const disconnect = () => {
    if (wsClient.value) {
      wsClient.value.close();
    }
  };
  // const subscribeToChannels = (coin) => {
  //   // console.log(coin);
  //   if (wsClient.value && wsClient.value.readyState === WebSocket.OPEN) {
  //     // Use the channels argument for subscription
  //     const message = {
  //       op: "subscribe",
  //       args: [
  //         {
  //           channel: "tickers",
  //           instId: coin.name,
  //         },
  //       ],
  //     };
  //     wsClient.value.send(JSON.stringify(message));
  //     console.log("saqsez");
  //   } else {
  //     console.error("Websocket not connected or ready for subscription");
  //   }
  // };
  const subscribeToChannels = (coins, subscriptions) => {
    // console.log(coin);
    coins.value.forEach((coin) => {
      if (wsClient.value && wsClient.value.readyState === WebSocket.OPEN) {
        // Check if already subscribed to this channel
        if (!subscriptions.value.includes(coin.name)) {
          // Use the channels argument for subscription
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
          // console.log("Subscribed to:", coin.name);

          // Add subscription to the list
          subscriptions.value.push(coin.name);
        }
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
        // console.log("unsubscribed to:", unsubscribeList);
      } else {
        console.error("Websocket not connected or ready for subscription");
      }
    });
  };
  return {
    coinsData,
    connect,
    disconnect,
    subscribeToChannels,
    unsubscribeToChannels,
  };
}
