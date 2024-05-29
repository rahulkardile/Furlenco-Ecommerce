import React from "react";
import { BsTruck } from "react-icons/bs";
import { LuPlus } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiMiniMinus } from "react-icons/hi2";

const CartItems = () => {
  return (
    <section className="flex flex-row gap-4 p-3 relative">
      <p className="border-t-0 border-gray-300 border-[0.01px] top-0 absolute w-[90%] left-8 " />
      <img
        className="w-36 h-auto object-contain"
        src="https://assets.furlenco.com/image/upload/dpr_1.0,f_auto,q_auto/v1/r2/products/194/plp_1.png"
        alt="cart imtem image"
      />

      <FaRegTrashAlt className="absolute right-6 mt-2 text-lg w-9 hover:bg-slate-300 duration-500 rounded-full p-2  h-9 " />

      <section className="flex flex-col gap-2 p-3">
        <h2 className="font-semibold">
          Nauka Solid Wood Center Table with Storage in Teak Finish
        </h2>
        <div className="flex flex-row gap-2 items-center">
          <span className="text-xs line-through font-semibold text-gray-600">
            ₹8,999.00
          </span>
          <span className="text-xs font-semibold rounded-full p-1 px-2 bg-yellow-200">
            -63%
          </span>
          <span className="text-xs font-bold">₹3,299.00</span>
        </div>

        <div className="flex items-center gap-2">
          <BsTruck className="text-xl text-gray-600" />
          <span className="text-xs text-slate-500">Delivery by 31 may</span>
        </div>
        <div className="p-2 border border-cyan-500 w-[100px] flex flex-row gap-3 justify-center items-center rounded-full">
          <button className="text-cyan-700 hover:bg-gray-300 rounded-full duration-200 p-1">
            <LuPlus />
          </button>
          <span>3</span>
          <button className="text-cyan-700 hover:bg-gray-300 rounded-full duration-200 p-1">
            <HiMiniMinus />
          </button>
        </div>
      </section>
    </section>
  );
};

export default CartItems;
