import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 4000 });

wss.on("connection", (ws) => {
  console.log("✅ Client connected");

  ws.on("message", (message) => {
    console.log("📩 Received:", message.toString());

    // Gửi thông báo đến tất cả client
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(
          JSON.stringify({
            type: "NEW_BOOKING",
            message: "🚀 Có đơn đặt sân mới!",
          })
        );
      }
    });
  });

  ws.on("close", () => console.log("❌ Client disconnected"));
});

console.log("🚀 WebSocket Server running on ws://localhost:4000");
