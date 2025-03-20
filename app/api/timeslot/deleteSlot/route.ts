export async function DELETE(req: NextRequest) {
  try {
    // Lấy thời gian hiện tại và chuyển thành đối tượng Date (UTC)
    const currentTime = new Date();
    console.log("Thời gian hiện tại (UTC): ", currentTime);

    // Lấy thời gian hiện tại ở Việt Nam (VST) và cộng thêm 7 giờ
    const vietnamTime = addHours(currentTime, 7); // Cộng 7 giờ để chuyển từ UTC sang VST
    console.log("Thời gian hiện tại VN (VST): ", vietnamTime);

    // Xóa các khung giờ có `end_time` nhỏ hơn thời gian hiện tại Việt Nam
    const deletedSlots = await prisma.timeslot.deleteMany({
      where: {
        end_time: {
          lt: vietnamTime, // So sánh với thời gian Việt Nam (VST)
        },
      },
    });

    console.log("Số lượng khung giờ đã bị xóa: ", deletedSlots.count);

    return NextResponse.json(
      { deletedSlots, message: "Xóa thành công" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Lỗi khi xóa khung giờ hết hạn:", error);
    return NextResponse.json(
      { message: "Xóa thất bại", error: error.message },
      { status: 400 }
    );
  }
}
