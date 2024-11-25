import Image from "next/image";
import Navbar from "./component/Nvarbar";
import Carousel from "./component/Carousel";
import Intro from "./component/Intro";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Carousel></Carousel>
      <Intro></Intro>
    </div>
  );
}
