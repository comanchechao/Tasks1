import { ref } from "vue";

export function useWebsocket() {
  const data = ref([]); // Stores the received data
  const wsClient = ref(null); // Reference to the websocket client

  const connect = async () => {
    try {
      wsClient.value = new WebSocket("wss://wsg.ok-ex.io/ws");
      await new Promise((resolve) => {
        wsClient.value.onopen = () => {
          console.log("Websocket connected");
          resolve(); // Resolve the promise when the connection opens
        };
      });
      subscribeToChannel("BTC"); // Replace with actual channel

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

  const subscribeToChannel = (channel) => {
    if (wsClient.value && wsClient.value.readyState === WebSocket.OPEN) {
      const message = {
        // Subscription message format as per documentation
        type: "subscribe", // Replace with actual property name if different
        channels: [channel],
      };
      wsClient.value.send(JSON.stringify(message));
    } else {
      console.error("Websocket not connected or ready for subscription");
    }
  };

  return { data, connect, disconnect, subscribeToChannel };
}
