import { BiSolidOffer } from "react-icons/bi";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import CartItems from "../components/CartItems";
import { useSelector } from "react-redux";
import { ReduxUserState } from "../Redux/store";
import EmptyCart from "../components/EmptyCart";

const Cart = () => {
  const { cardItems } = useSelector((state: ReduxUserState) => state.cart);
  let total = 0;

  // (total = total + (i.price - i.discount)

  cardItems.map((i) => {
    const ItemTotal =
      i.quantity === undefined
        ? i.price - i.discount
        : (i.price - i.discount) * i.quantity;

    total += ItemTotal;
  });
  return (
    <section className="w-screen flex flex-row portrait:items-center portrait:flex-col m-auto justify-center mt-6 md:mt-12 gap-5 md:gap-12 mb-7 md:px-28">
      {total === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="w-11/12 md:w-[55%] rounded-xl border border-gray-300">
            <h1 className="w-full bg-[#c9e2e8] font-semibold p-6 pl-7 rounded-t-lg">
              Buy Cart {cardItems.length}
            </h1>
            {cardItems.map((item, index) => (
              <CartItems
                discount={item.discount}
                mainImage={item.mainImage}
                quantity={item.quantity}
                name={item.name}
                price={item.price}
                stock={item.stock}
                key={index}
                _id={item._id}
              />
            ))}
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

          <div
            id="work-sans"
            className="bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] h-[30%] md:mt-2 portrait:mb-8 p-4 w-11/12 md:w-[38%] rounded-md"
          >
            <section className="flex flex-row justify-between">
              <div className="flex flex-row justify-between gap-4">
                <h2 className="font-semibold">Buy Cart</h2>
                <span>{cardItems.length} items</span>
              </div>

              <div className="flex flex-row items-center select-none justify-between gap-2">
                <h2 className="font-semibold">₹{total}</h2>
                <span className="bg-[#b4e1e5] w-5 h-5 text-center rounded-full font-semibold text-sm">
                  i
                </span>
              </div>
            </section>

            <button className="flex bg-[#069baa] rounded-full text-white font-bold px-5 w-full justify-between p-4 mt-7 hover:bg-white hover:text-[#069baa] duration-500 hover:shadow-[0px_0px_12px_0px_#1a202c]">
              <span className="tracking-wider">₹{total}</span>
              <div className="flex gap-2 uppercase justify-center items-center">
                <span className="tracking-wide">Proceed</span>
                <FaArrowRight />
              </div>
            </button>
          </div>{" "}
        </>
      )}
    </section>
  );
};

export default Cart;
