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
    } else {
      toast.error("Can't Logout!");
    }
  };

  return (
    <header
      onMouseLeave={() => setHidden(false)}
      className="flex p-7 sticky top-0 z-50 w-screen justify-between px-12 bg-white drop-shadow-xl"
    >
      <img
        onClick={() => navigate("/")}
        onMouseEnter={() => setHidden(false)}
        src={logo}
        alt="Logo"
        className="w-24 md:w-[150px] h-auto object-contain cursor-pointer"
      />
      <nav className="flex gap-8 text-sm md:text-lg">
        <FaRegUser
          onMouseEnter={() => setHidden(true)}
          onClick={() => setHidden(!hidden)}
          className="text-gray-800 hover:cursor-pointer hover:text-cyan-600 hover:-translate-y-1 duration-500"
        />
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
        className="absolute z-50 left-[95%] bg-white border border-cyan-500 p-2 w-[200px] mr-16 bg-grey-100 rounded-lg top-16"
      >
        <section className="flex flex-col select-none gap-2 items-center w-full">
          {user?._id ? (
            <>
              <h3 className="text-base">Hello {user.name}</h3>
              <Link to={"/profile"} className="hover:underline">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="duration-200 text-base hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to={"/login"} className="hover:underline">
              Login
            </Link>
          )}

          <Link to={"/contact"} className="hover:underline">
            Contact us
          </Link>
        </section>
      </dialog>
    </header>
  );
};

export default Header;
