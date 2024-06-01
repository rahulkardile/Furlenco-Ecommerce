import { FaPlus } from "react-icons/fa6";
import { ProductFetch } from "../typeScript/FetchAllProduct";
import ImgError from "../assets/Not-Found.jpg";
import { useDispatch } from "react-redux";
import { addProduct, quantityUpdate } from "../Redux/slices/CartReducer";
import { useNavigate } from "react-router-dom";

const Card = (data: ProductFetch) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCart = async () => {
    dispatch(addProduct(data));
    dispatch(quantityUpdate({ _id: data._id }));
  };

  return (
    <div className="w-[250px] h-[318px] flex flex-col relative gap-3 border-2 duration-300 hover:scale-105 hover:border-cyan-500 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-lg overflow-hidden">
      <img
        src={`/api/${data.mainImage}`}
        onClick={() => navigate(`/product/${data._id}`)}
        onError={(e) => {
          e.currentTarget.src = ImgError;
        }}
        alt="main image"
        className="h-[55%] object-contain cursor-pointer"
      />
      <button
        className={`absolute p-4 bg-yellow-300 bottom-12 border-4 border-white rounded-full left-48 flex justify-center items-center hover:scale-110 duration-500`}
      >
        {" "}
        <FaPlus
          onClick={handleCart}
          className="text-base absolute font-bold text-white"
        />{" "}
      </button>
      <div className="text-center flex flex-col gap-4">
        <h2
          onClick={() => navigate(`/product/${data._id}`)}
          id="recline"
          className="px-3 line-clamp-2 cursor-pointer"
        >
          {data.name}
        </h2>
        <span className="absolute bottom-14  text-slate-800 font-semibold text-xs portrait:bg-blue-300 bg-slate-300 pl-3 rounded-r-full pr-6 py-1">
          Buy Brand New
        </span>
        <div
          id="recline"
          className="bg-yellow-300 p-5 flex flex-row gap-2 justify-center items-center"
        >
          <span className="text-xs text-gray-600 line-through">
            ₹{data.price}
          </span>
          <span className="text-xl font-bold">
            {Math.round((data.discount * 100) / data.price)}% Off
          </span>
          <span className="text-xs font-semibold uppercase"></span>
          <span className="font-semibold text-gray-600">
            ₹{+data.price - +data.discount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
