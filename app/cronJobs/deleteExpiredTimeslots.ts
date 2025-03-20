import fetch from "node-fetch";
import cron from "node-cron";

// Hàm xóa khung giờ hết hạn
const deleteExpiredTimeslots = async () => {
  try {
    console.log("Cron job bắt đầu");

    // Sử dụng URL tuyệt đối thay vì localhost
    // Trong môi trường production, bạn nên sử dụng biến môi trường

    const response = await fetch(`/api/timeslot/deleteSlot`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`Đã xóa ${data.deletedSlots.count} khung giờ hết hạn.`);
    } else {
      console.error("Không thể xóa khung giờ hết hạn:", data.message);
    }
  } catch (error) {
    console.error("Lỗi khi xóa khung giờ hết hạn:", error);
  }
};
cron.schedule("* * * * *", () => {
  console.log("Cron job chạy vào lúc 2 giờ sáng");
  deleteExpiredTimeslots();
});

export default deleteExpiredTimeslots;
