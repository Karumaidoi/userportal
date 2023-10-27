import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Spin } from "antd";

function AppLayout() {
  const { currentUser, fetchingUser } = useCurrentUser();

  if (fetchingUser) {
    return (
      <div>
        <Spin />
      </div>
    );
  }

  console.log(currentUser);
  return (
    <div className="z-10 h-[100vh]">
      <Header className="fixed h-[5vh]" user={currentUser} />
      <main className=" h-[83vh] overflow-scroll ">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
