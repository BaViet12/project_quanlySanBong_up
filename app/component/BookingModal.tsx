import React from "react";

interface BookingModalProps {
  show: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <dialog id="my_modal_2" className="modal open">
      <div className="modal-box">
        <h3 className="font-bold text-2xl text-center">Thông báo</h3>
        <p className="py-2">
          Để đặt sân bóng này, bạn cần phải đặt cọc 30% tiền sân cho chúng tôi :
        </p>
        <p className="py-2">Bước 1: Thông tin chuyển khoản</p>
        <p className="py-2 ml-16">STK: 0762748624</p>
        <p className="py-2 ml-16">Ngân Hàng An Bình</p>
        <p className="py-2">Bước 2: Nội dung chuyển khoản</p>
        <p className="py-2 ml-16">Đặt cọc sân... khung giờ... ngày...</p>
        <p className="py-2">Bước 3: Tải lên ảnh giao dịch thành công</p>
        <p className="py-2">
          Lưu ý: Trong 30p chưa xác nhận thì sẽ lại sân trống
        </p>
        <button className="btn bg-green-500 text-white mt-4" onClick={onClose}>
          Đóng
        </button>
      </div>
    </dialog>
  );
};

export default BookingModal;
