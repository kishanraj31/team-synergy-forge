import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const Layout = () => {
  const location = useLocation();
  
  // Don't show sidebar for auth pages
  const isAuthPage = ["/login", "/signup", "/forgot-password"].includes(location.pathname);
  
  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <Breadcrumbs />
          <div className="flex-1">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;