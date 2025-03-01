"use client";
import React from "react";

const About = () => {
  const handleScrollToFields = () => {
    const fieldsElement = document.getElementById("fields");
    if (fieldsElement) {
      fieldsElement.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("Phần tử với ID 'fields' không tồn tại.");
    }
  };
  return (
    <div className="px-[25px] py-10  rounded-xl">
      <h1 className="text-4xl font-bold text-center  mb-6">
        Sân Bóng Đình Làng Hòa Mỹ – Địa Điểm Cho Thuê Sân Bóng Chất Lượng
      </h1>
      <p className="text-lg text-gray-700 leading-relaxed text-justify">
        <span className="font-semibold ">Sân Bóng Đình Làng Hòa Mỹ</span> là địa
        điểm lý tưởng dành cho những tín đồ đam mê bóng đá. Chúng tôi cung cấp
        dịch vụ <strong>cho thuê và đặt sân bóng đá đạt chuẩn</strong>, đáp ứng
        nhu cầu thi đấu, giao lưu và tổ chức giải đấu.
      </p>

      <ul className="mt-5 text-lg text-gray-800">
        <li className="mb-2 flex items-center">
          ✅{" "}
          <span className="ml-2">
            Sân cỏ nhân tạo chất lượng cao, bằng phẳng, thoát nước tốt.
          </span>
        </li>
        <li className="mb-2 flex items-center">
          ✅{" "}
          <span className="ml-2">
            Hệ thống đèn chiếu sáng hiện đại, đảm bảo trận đấu cả ngày lẫn đêm.
          </span>
        </li>
        <li className="mb-2 flex items-center">
          ✅ <span className="ml-2">Bãi đỗ xe rộng rãi, an ninh đảm bảo.</span>
        </li>
        <li className="mb-2 flex items-center">
          ✅{" "}
          <span className="ml-2">
            Hỗ trợ đặt sân cố định, tổ chức giải đấu chuyên nghiệp.
          </span>
        </li>
      </ul>

      <div className="mt-8 text-center">
        <p className="text-xl font-semibold">
          ⚽ Liên hệ ngay để đặt sân và nhận ưu đãi hấp dẫn!
        </p>
        <button
          onClick={handleScrollToFields}
          className="mt-4 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-green-700 transition"
        >
          Đặt sân ngay
        </button>
      </div>
    </div>
  );
};

export default About;
