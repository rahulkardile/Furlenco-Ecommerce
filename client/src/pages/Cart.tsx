import { BiSolidOffer } from "react-icons/bi";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import CartItems from "../components/CartItems";

const Cart = () => {
  return (
    <section className="w-screen flex flex-row m-auto  justify-center mt-12 gap-12 mb-7">
      <div className="w-[55%] rounded-xl border border-gray-300">
        <h1 className="w-full bg-cyan-100 font-semibold p-6 pl-7 rounded-t-lg">Buy Cart</h1>

        <CartItems />
        <CartItems />
        <CartItems />

        <section className="w-[100%]">
          <div className="m-5 bg-yellow-200 flex flex-row  rounded-xl justify-between p-4">
            <div className="flex flex-row gap-2 items-center text-gray-600 text-sm">
              <BiSolidOffer className="text-2xl text-yellow-400" />
              <span>Offers & Discounts</span>
            </div>

            <div className="flex flex-row gap-2 items-center text-gray-600 text-sm">
              <span>1 Available</span>
              <FaCircleArrowRight className="text-2xl text-cyan-500" />
            </div>
          </div>
        </section>
      </div>

      <div className="bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] h-[25%] mt-2 p-4 w-[30%] rounded-md">

        <section className="flex flex-row justify-between">
          <div className="flex flex-row justify-between gap-4">
            <h2 className="font-semibold">Buy Cart</h2>
            <span>2 items</span>
          </div>

          <div className="flex flex-row justify-between gap-2">
            <h2 className="font-semibold">₹15,256.00</h2>
            <span className="bg-cyan-200 w-6 h-6 text-center rounded-full font-semibold text-sm">i</span>
          </div>
        </section>

        <button className="flex bg-cyan-500 rounded-full text-white font-bold px-5 w-full justify-between p-4 mt-4">
          <span className="">₹15,256.00</span>
          <div className="flex gap-2 justify-center items-center">
            <span>Proceed</span>
            <FaArrowRight />
          </div>
        </button>

      </div>
    </section>
  );
};

export default Cart;
