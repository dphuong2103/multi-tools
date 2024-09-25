import React from "react";
import NavBar from "@/components/ui/nav-bar";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

function Layout({ children, title }: LayoutProps) {
  return (
    <div className="h-full flex flex-col">
      <NavBar title={title} />
      <div className="flex justify-center h-full">
        <div className="w-full max-w-7xlxl h-full">
          <main className="flex justify-center items-start p-1 md:p-6 w-full h-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
