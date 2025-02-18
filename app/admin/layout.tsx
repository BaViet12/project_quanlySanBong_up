import React from "react";
// import NvarbarAdmin from "../component/NvarbarAdmin";
import SidebarAdmin from "../component/SidebarAdmin";
import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "../api/uploadthing/core";
import Nvarbar from "../component/Nvarbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="hidden md:flex h-full w-full flex-col fixed inset-y-0 z-50">
      <Nvarbar />
      <div className="flex w-full bg-gray-50">
        <aside className="w-72">
          <SidebarAdmin />
        </aside>
        <main className="flex-1 pl-6 justify-center h-full w-full ">
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          {children}
        </main>
      </div>
    </div>
  );
};

export default layout;
