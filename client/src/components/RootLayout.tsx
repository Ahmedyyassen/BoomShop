import { Outlet } from "react-router-dom";
import BottomHeader from "./header/BottomHeader";
import TopHeader from "./header/TopHeader";

const RootLayout = () => {
  return (
    <>
      <header className="fixed top-0 w-full z-10 bg-white dark:bg-black">
        <TopHeader />
        <BottomHeader />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
