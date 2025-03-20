import { createServer } from "http";
import { parse } from "url";
import next from "next";
import cron from "node-cron"; // Thư viện node-cron để chạy cron job
import deleteExpiredTimeslots from "../cronJobs/deleteExpiredTimeslots";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Chạy cron job vào lúc 2 giờ sáng mỗi ngày
  cron.schedule("* * * * *", () => {
    console.log("Cron job chạy vào lúc 2 giờ sáng");
    deleteExpiredTimeslots(); // Gọi hàm xóa khung giờ hết hạn
  });

  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err?: Error) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
