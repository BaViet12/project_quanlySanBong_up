import React from "react";
// import NvarbarAdmin from "../component/NvarbarAdmin";
import SidebarAdmin from "../component/SidebarAdmin";
import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "../api/uploadthing/core";
import Nvarbar from "../component/Nvarbar";
import NavbarAdmin from "../component/NvarbarAdmin";
import Footer from "../component/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="hidden md:flex  w-full flex-col z-50">
      <div className="fixed top-0 left-0 w-full z-50 bg-white">
        <NavbarAdmin></NavbarAdmin>
      </div>
      <div className="flex w-full bg-white min-h-screen pt-20">
        <aside className="w-72">
          <SidebarAdmin />
        </aside>
        <main className="flex-1 pl-6 justify-center h-full w-full min-h-screen overflow-auto pt-4">
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default layout;
