import prisma from "@/prisma/client";
import Carousel from "./component/Carousel";
import Fields from "./component/Fields";
import Footer from "./component/Footer";
import Intro from "./component/Intro";
import Navbar from "./component/Nvarbar";
import About from "./component/About";

export default async function Home() {
  return (
    <div className="max-w-screen-2xl mx-auto lg:px-6">
      <Navbar></Navbar>
      <Carousel></Carousel>
      {/* <Intro></Intro> */}
      <About></About>
      <Fields></Fields>
      <Footer></Footer>
    </div>
  );
}
