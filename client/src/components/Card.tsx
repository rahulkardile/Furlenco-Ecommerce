import { FaPlus } from "react-icons/fa6";
import img from "../assets/Product/plp_1.webp";

const Card = () => {
  return (
    <div className="w-[250px] hover: flex flex-col relative gap-3 border-2 duration-300 hover:scale-105 hover:border-cyan-500 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-lg overflow-hidden">
      <img src={img} alt="main image" />
      <button
        className={`absolute p-4 bg-yellow-300 bottom-12 border-4 border-white rounded-full left-48 flex justify-center items-center hover:scale-110 duration-500`}
      >
        {" "}
        <FaPlus className="text-base absolute font-bold text-white" />{" "}
      </button>
      <div className="text-center flex flex-col gap-4">
        <h2>Hop Solid Wood Bedside Table in Walnut Finish</h2>
        <span className="absolute bottom-14 text-slate-800 font-semibold text-xs bg-slate-300 pl-3 rounded-r-full pr-6 py-1">
          Buy Brand New
        </span>
        <div className="bg-yellow-300 p-5 flex flex-row gap-2 justify-center items-center">
          <span className="text-xl font-bold">-75%</span>
          <span className="text-xs font-semibold uppercase">Off</span>
          <span className="font-semibold text-gray-600">₹ 12,999</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
