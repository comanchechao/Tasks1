import { ref } from "vue";

export function useWebsocket() {
  const data = ref([]); // Stores the received data
  const wsClient = ref(null); // Reference to the websocket client
  let receivedData = "";
  const jsonData = ref([]); // const cryptoChannels = [
  //   "spot/ticker:ETH-USD",
  //   "spot/ticker:BTC-USD",
  //   // ... add channels for 8 more coins (replace with desired symbols)
  // ];

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
        // console.log(message.data);
        if (receivedData.endsWith("}")) {
          try {
            const jsonData = JSON.parse(receivedData);
            console.log(jsonData);
            receivedData = ""; // Reset buffer for next message
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
  const subscribeToChannels = (coin) => {
    // console.log(coin);
    if (wsClient.value && wsClient.value.readyState === WebSocket.OPEN) {
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
      console.log("saqsez");
    } else {
      console.error("Websocket not connected or ready for subscription");
    }
  };

  // ...

  return { jsonData, connect, disconnect, subscribeToChannels };
}
