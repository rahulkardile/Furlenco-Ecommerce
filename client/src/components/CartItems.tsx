import { BsTruck } from "react-icons/bs";
import { LuPlus } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiMiniMinus } from "react-icons/hi2";
import { ProductFetch } from "../typeScript/FetchAllProduct";
import { useDispatch } from "react-redux";
import { quantityUpdate, removeProduct } from "../Redux/slices/CartReducer";

const CartItems = (data: ProductFetch) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeProduct(data._id));
  };

  const handleQuantity = (op: string) => {
    if(data.quantity === 1 && op === "minus") return;

    if (op === "minus") {
      dispatch(quantityUpdate({ _id: data._id, minus: op }));
    } else {
      dispatch(quantityUpdate({ _id: data._id }));
    }
  };

  return (
    <section className="flex flex-row gap-4 p-3 relative">
      <p className="border-t-0 border-gray-300 border-[0.01px] top-0 absolute w-full -left-0 " />
      <img
        className="w-36 h-auto object-contain select-none"
        src={`/api/${data.mainImage}`}
        draggable={false}
        alt="cart imtem image"
      />
      <div className="absolute text-center flex items-center justify-center right-6 mt-2 text-lg w-9 hover:bg-slate-200 text-gray-500 duration-500 rounded-full   h-9 ">
        <FaRegTrashAlt onClick={handleRemove} className="" />
      </div>

      <section className="flex flex-col gap-2 p-3">
        <h2 className="font-semibold">{data.name}</h2>
        <div className="flex flex-row gap-2 items-center">
          <span
            id="extraSmall"
            className="line-through font-semibold text-gray-600"
          >
            ₹{data.price}
          </span>
          <span
            id="extraSmall"
            className="font-semibold rounded-full p-1 text-xs px-3 bg-[#fff5b7]"
          >
            {Math.round((data.discount * 100) / data.price)}%
          </span>
          <span className="text-xs font-bold">
            ₹{data.price - data.discount}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <BsTruck className="text-xl text-gray-600" />
          <span className="text-xs text-slate-500">Delivery by 31 may</span>
        </div>
        <div className="p-2 border border-cyan-500 w-[100px] flex flex-row gap-3 justify-center items-center rounded-full">
          <button className="text-cyan-700 hover:bg-gray-300 rounded-full duration-200 p-1">
            <LuPlus onClick={() => handleQuantity("plus")} />
          </button>
          <span>{data.quantity === undefined ? 1 : data.quantity}</span>
          <button className="text-cyan-700 hover:bg-gray-300 rounded-full duration-200 p-1">
            <HiMiniMinus onClick={() => handleQuantity("minus")} />
          </button>
        </div>
        <span className="bg-[#efbe54] p-[10px] rounded-md px-1 absolute bottom-3 left-[199px] text-white font-semibold text-xs/[2px]">{`Only ${
          data.stock - 1
        } left`}</span>
      </section>
    </section>
  );
};

export default CartItems;
