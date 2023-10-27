/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar, Button, Spin } from "antd";
import { DiAtlassian } from "react-icons/di";
import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLogOut } from "../hooks/useLogOut";

const Heading = styled.h3`
  font-size: 1rem;
`;

function Header({ user }) {
  const { logOutAPI, loggingOut } = useLogOut();

  function handleClick() {
    console.log("clicked");
    logOutAPI();
  }
  return (
    <header className="  flex w-[90%] items-center justify-between bg-white p-2 px-11 drop-shadow-sm dark:bg-stone-800 mb-9">
      <div className="flex items-center gap-4">
        <Button onClick={() => handleClick()}>
          {loggingOut ? <Spin /> : <HiOutlineLogout />}
        </Button>

        <Link to="home" className="flex items-center ">
          <p className="text-4xl text-stone-400">
            <DiAtlassian />
          </p>
          <h1 className="mr-5 hidden font-bold dark:text-stone-50 sm:block">
            User Portal
          </h1>
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <Avatar
          src={`https://oablrzqumrrftstsepyc.supabase.co/storage/v1/object/public/avatars/default.jpg`}
        />
        <Heading>{user?.at(0).userName}</Heading>
      </div>
    </header>
  );
}

export default Header;
