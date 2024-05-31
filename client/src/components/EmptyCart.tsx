import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Empty from "../assets/empty-shopping.jpg";

const EmptyCart = () => {
  return (
    <div className="flex md:gap-3 flex-col items-center w-full sm:w-2/3">
      <section>
        <h2 className="font-semibold">Your Cart Looks A little Empty!</h2>
        <h2 className="text-sm text-center">Start Buying or Renting with us</h2>
      </section>
      <img
        src={`${Empty}`}
        className="h-80 md:h-[370px] object-contain"
        alt="Empty Cart Image"
      />

      <section className="flex flex-col gap-3 w-11/12 md:w-10/12 mt-4">
        <div className="flex flex-row justify-between w-full gap-3">
          <span className="w-1/3 sm:w-1/6 ml-8 font-semibold text-xs sm:text-sm text-gray-600">
            Looking to BUY furniture?
          </span>
          <span className="w-1/3 sm:w-1/5 ml-8 font-semibold text-xs sm:text-sm text-gray-600">
            Looking to RENT furniture?
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <button className="flex justify-between bg-[#6e7bc1] p-4 text-xs sm:text-xl rounded-l-full items-center text-white w-1/2">
            <FaArrowLeft className="ml-4" />
            <span id="recline" className="mr-4">
              Explore Buying
            </span>
          </button>
          <button className="flex justify-between bg-[#f48c55] p-1 sm:p-4 text-xs sm:text-xl items-center rounded-r-full text-white w-1/2">
            <span id="recline" className="ml-4">
              Explore Renting
            </span>
            <FaArrowRight className="mr-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default EmptyCart;
