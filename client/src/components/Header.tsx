import { useState } from "react";
import { FaRegUser, FaCartArrowDown } from "react-icons/fa";
import { BsSuitHeart } from "react-icons/bs";
import logo from "../assets/furlenco-logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { ReduxUserState } from "../Redux/store";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeUser } from "../Redux/slices/UserReducer";
import Search from "./Search";
import { removeAll } from "../Redux/slices/CartReducer";
import { removeAddress } from "../Redux/slices/Address";

const Header = () => {
  const [hidden, setHidden] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useSelector((user: ReduxUserState) => user.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const logout = await fetch("/api/user/logout");
    const { message, success } = await logout.json();

    if (success) {
      toast.success(message);
      dispatch(removeUser());
      dispatch(removeAll());
      dispatch(removeAddress());
    } else {
      toast.error("Can't Logout!");
    }
  };

  return (
    <header
      onMouseLeave={() => setHidden(false)}
      className="flex p-2 sm:p-6 sticky top-0 z-50 w-screen items-center justify-between px-5 sm:px-12 bg-white drop-shadow-xl"
    >
      <img
        onClick={() => navigate("/")}
        onMouseEnter={() => setHidden(false)}
        src={logo}
        alt="Logo"
        className="w-16 md:w-[200px] h-auto object-contain cursor-pointer"
      />

      <Search />

      <nav className="flex gap-4 items-center sm:gap-8 text-sm xl:text-2xl md:text-lg">
        {user?.ProfileIMG ? (
          <img
            onMouseEnter={() => setHidden(true)}
            onClick={() => setHidden(!hidden)}
            src={user.ProfileIMG}
            className="portrait:w-4 sm:w-8 rounded-full cursor-pointer select-none object-cover portrait:h-4 sm:h-8"
            alt="user"
          />
        ) : (
          <FaRegUser
            onMouseEnter={() => setHidden(true)}
            onClick={() => setHidden(!hidden)}
            className="text-gray-800 hover:cursor-pointer hover:text-cyan-600 hover:-translate-y-1 duration-500"
          />
        )}
        <BsSuitHeart
          onMouseEnter={() => setHidden(false)}
          className="text-gray-800 hover:cursor-pointer hover:text-cyan-600 hover:-translate-y-1 duration-500"
        />
        <Link to={"/cart"}>
          <FaCartArrowDown
            onMouseEnter={() => setHidden(false)}
            className="text-gray-800 hover:cursor-pointer hover:text-cyan-600 hover:-translate-y-1 duration-500"
          />
        </Link>
      </nav>
      <dialog
        onMouseLeave={() => setHidden(false)}
        open={hidden ? true : false}
        className={`absolute z-50 right-1 bg-white border border-cyan-500 p-2 w-[190px] sm:w-[200px] mr-10 sm:mr-16 bg-grey-100 rounded-lg portrait:top-12 top-20`}
      >
        <section
          className={`flex flex-col  select-none gap-1 px-2 sm:gap-2 ${
            user?._id ? " " : "items-center"
          } w-full`}
        >
          {user?._id ? (
            <>
              <div className="">
                <h2 className="font-semibold text-sm">Hello {user.name}</h2>
                <p className="text-xs">{user.email}</p>
                <p className="border-b p-1" />
              </div>

              <Link to={"/orders"} className="hover:underline pl-3 text-xs">
                Order
              </Link>

              <Link to={"/orders"} className="hover:underline pl-3 text-xs">
                Wishlist
              </Link>

              <Link to={"/orders"} className="hover:underline pl-3 text-xs">
                Contact Us
              </Link>
              {user.role === "admin" ? (
                <Link to={"/create"} className="hover:underline pl-3 text-xs">
                  Create Product
                </Link>
              ) : (
                ""
              )}
              <p className="border-b" />
              <button
                onClick={handleLogout}
                className="duration-200 text-xs pb-1 text-start pl-3 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"} className="hover:underline">
                Login
              </Link>
              <Link to={"/contact"} className="hover:underline">
                Contact us
              </Link>
            </>
          )}
        </section>
      </dialog>
    </header>
  );
};

export default Header;
