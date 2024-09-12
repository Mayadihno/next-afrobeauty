import { ReactNode } from "react";
import Navbar from "./_components/Navbar/Navbar";
import Sidebar from "./_components/sidebar/Sidebar";
import SellerProtectedRoute from "@/components/protectedRoute/sellerProtectedRoute";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      <SellerProtectedRoute>
        <div className="md:block hidden sticky left-0 top-0 h-screen w-[70px] md:w-[300px]">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1">
          <div className="sticky top-0 z-50">
            <Navbar />
          </div>
          <div
            className="p-2 xl:max-w-screen-xl 2xl:max-w-screen-2xl sm:max-w-screen-sm
           md:max-w-screen-md lg:max-w-screen-lg mx-auto max-w-[410px] md:p-4 w-full md:overflow-y-auto"
          >
            {children}
          </div>
        </div>
      </SellerProtectedRoute>
    </div>
  );
};

export default Layout;
