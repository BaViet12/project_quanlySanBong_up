import Image from "next/image";
import Navbar from "./component/Nvarbar";
import Carousel from "./component/Carousel";
import Intro from "./component/Intro";
import ListFields from "./component/ListFields";
import TimeSlot from "./component/TimeSlot";
import ListFieldsText from "./component/ListFieldsText";
import Footer from "./component/Footer";

export default function Home() {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Navbar></Navbar>
      <Carousel></Carousel>
      <Intro></Intro>
      <ListFields></ListFields>
      <Footer></Footer>
    </div>
  );
}
