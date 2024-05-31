import CartItems from "../components/CartItems";
import { useSelector } from "react-redux";
import { ReduxUserState } from "../Redux/store";
import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const Summery = () => {
  const {
    address: { Address },
    cart: Cart,
    user: User,
  } = useSelector((state: ReduxUserState) => state);
  // const [address, setAddress] = useState<InfoInterface>({
  //   address: "",
  //   city: "",
  //   mobile: 0,
  //   name: "",
  //   of: "",
  //   pin: 0,
  //   state: "",
  //   town: "",
  // });

  let total = 0;
  let totalMrp = 0;
  let discount = 0;

  Cart.cardItems.map((i) => {
    const ItemTotal =
      i.quantity === undefined
        ? i.price - i.discount
        : (i.price - i.discount) * i.quantity;
    discount += i.discount;
    totalMrp += i.price;
    total += ItemTotal;
  });

  // useEffect(() => {
  //   setAddress({
  //     address: Address?.address,
  //     city: Address?.city,
  //     mobile: Address?.mobile,
  //     name: Address?.name,
  //     pin: Address?.pin,
  //     town: Address?.town,
  //     of: Address?.of,
  //     state: Address?.state,
  //   });
  // }, []);

  const handleCheckout = () => {};

  return (
    <section className="flex relative w-screen pb-20 flex-col bg-gray-100 gap-4 m-auto justify-center items-center">
      <h2 id="recline" className="my-7 text-2xl uppercase">
        Order Summary
      </h2>

      <section className="flex flex-row w-full px-20 gap-8">
        <div className="w-7/12 bg-white rounded-xl">
          <div className="w-full rounded-xl border border-gray-300">
            <h1 className="w-full bg-[#c9e2e8] font-semibold p-6 pl-7 rounded-t-lg">
              Buy Cart {Cart.cardItems.length}
            </h1>
            {Cart.cardItems.map((item, index) => (
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
          </div>
        </div>

        <div className="w-5/12">
          <div className="bg-white rounded-xl p-5 m-auto">
            <section className="flex flex-col gap-2">
              <h1 className="font-semibold">
                Price Details {Cart.cardItems.length} Items
              </h1>

              <div className="flex flex-row justify-between">
                <span className="font-semibold text-gray-700 text-sm">
                  Total MRP
                </span>
                <span className="font-semibold text-black">₹{totalMrp}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span className="font-semibold text-gray-700 text-sm">
                  Discount on MRP
                </span>
                <span className="font-semibold text-black"> ₹{discount}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span className="font-semibold text-gray-700 text-sm">
                  Plateform Fee
                </span>
                <span className="font-semibold text-green-700">Free</span>
              </div>
              <div className="flex flex-row justify-between">
                <span className="font-semibold flex flex-col text-gray-700 text-sm">
                  <span>Shipping Fee</span>
                  <span className="text-xs">Free Shiping for you</span>
                </span>
                <span className="font-semibold text-green-700">Free</span>
              </div>
            </section>

            <button
              onClick={handleCheckout}
              className="flex bg-[#069baa] mt-7 rounded-full text-white font-bold px-5 w-full justify-between p-4 hover:bg-white hover:text-[#069baa] duration-500 hover:shadow-[0px_0px_12px_0px_#1a202c]"
            >
              <span className="tracking-wider">₹{total}</span>
              <div className="flex gap-2 uppercase justify-center items-center">
                <span className="tracking-wide">Proceed</span>
                <FaArrowRight />
              </div>
            </button>
          </div>

          <div className="text-xs p-4 border mt-4 flex flex-col gap-1 bg-white rounded-md">
            <div className="flex gap-2 flex-row justify-between">
              <h2 className="font-semibold">Delivery to</h2>
              <button className="p-1 px-4 border-2 flex gap-2 rounded-full items-center text-cyan-500 font-semibold border-cyan-700">
                <span className="text-xs">Change</span>
                <IoIosArrowForward className="text-lg" />
              </button>
            </div>
            <h2 className="font-semibold text-black text-sm">
              {Address?.name}
            </h2>
            <p className="font-semibold text-xs text-gray-700">
              {Address?.address}
            </p>
            <div className="flex flex-row gap-0">
              <span className="text-gray-700 font-semibold">Contact No: </span>
              <span className="text-black font-semibold">
                {Address?.mobile}
              </span>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Summery;
