import { ref } from "vue";

export function useWebsocket() {
  const data = ref([]); // Stores the received data
  const wsClient = ref(null); // Reference to the websocket client
  const cryptoChannels = [
    "spot/ticker:ETH-USD",
    "spot/ticker:BTC-USD",
    // ... add channels for 8 more coins (replace with desired symbols)
  ];

  const connect = async () => {
    try {
      wsClient.value = new WebSocket("wss://wsg.ok-ex.io/ws");
      await new Promise((resolve) => {
        wsClient.value.onopen = () => {
          console.log("Websocket connected");
          subscribeToChannels(cryptoChannels);
          resolve(); // Resolve the promise when the connection opens
        };
      });
      wsClient.value.onmessage = (message) => {
        data.value = JSON.parse(message);
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

  const subscribeToChannels = (channels) => {
    if (wsClient.value && wsClient.value.readyState === WebSocket.OPEN) {
      channels.forEach((channel) => {
        const message = {
          op: "subscribe",
          args: [
            {
              channel: "tickers",
              instId: "LTC-USD",
            },
            {
              channel: "candle1m",
              instId: "LTC-USD",
            },
          ],
        };
        wsClient.value.send(JSON.stringify(message));
        console.log("Websocket is cool");
      });
    } else {
      console.error("Websocket not connected or ready for subscription");
    }
  };
  const sendMessage = (message) => {
    if (wsClient.value && wsClient.value.readyState === WebSocket.OPEN) {
      wsClient.value.send(JSON.stringify(message));
      console.log("Websocket is cool");
    } else {
      console.error("Websocket not connected or ready to send message");
    }
  };

  return { data, connect, disconnect, subscribeToChannels, sendMessage };
}
