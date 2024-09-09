import { ReactNode } from "react";
import Navbar from "./_components/Navbar/Navbar";
import Sidebar from "./_components/sidebar/Sidebar";
import SellerProtectedRoute from "@/components/protectedRoute/sellerProtectedRoute";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      <SellerProtectedRoute>
        <div className="sticky left-0 top-0 h-screen">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1">
          <div className="sticky top-0 z-50">
            <Navbar />
          </div>
          <div className="p-4 flex-1 overflow-y-auto">{children}</div>
        </div>
      </SellerProtectedRoute>
    </div>
  );
};

export default Layout;
