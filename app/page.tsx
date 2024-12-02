import Image from "next/image";
import Navbar from "./component/Nvarbar";
import Carousel from "./component/Carousel";
import Intro from "./component/Intro";
import ListFields from "./component/ListFields";
import TimeSlot from "./component/TimeSlot";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Carousel></Carousel>
      <Intro></Intro>
      <ListFields></ListFields>
      {/* <TimeSlot></TimeSlot> */}
    </div>
  );
}
