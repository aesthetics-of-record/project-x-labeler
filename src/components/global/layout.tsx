import { Outlet } from 'react-router-dom';
import LeftSidebarSm from '../side/left-sidebar-sm';
import LoginProvider from '@/providers/login-provider';
import { Toaster } from '../ui/toaster';

const Layout = () => {
  return (
    <>
      <Toaster />
      <LoginProvider>
        <div className="flex w-screen">
          <LeftSidebarSm />
          <div className="">
            <Outlet />
          </div>
        </div>
      </LoginProvider>
    </>
  );
};

export default Layout;
