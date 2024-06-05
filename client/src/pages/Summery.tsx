import CartItems from "../components/CartItems";
import { useDispatch, useSelector } from "react-redux";
import { ReduxUserState } from "../Redux/store";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Icon from "../assets/app_icon.jpeg";
import { useState } from "react";
import { removeAll } from "../Redux/slices/CartReducer";
import NotFound from "./NotFound";
import EmptyCart from "../components/EmptyCart";

const Summery = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    address: { Address },
    cart: Cart,
    user: { user },
  } = useSelector((state: ReduxUserState) => state);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let total = 0;
  let totalMrp = 0;
  let discount = 0;

  Cart.cardItems.map((i) => {
    const ItemTotal =
      i.quantity === undefined
        ? i.price - i.discount
        : (i.price - i.discount) * i.quantity;
    if (i.quantity !== undefined) {
      totalMrp = (totalMrp + i.price) * i.quantity;
      discount += i.discount * i.quantity;
    }
    total += ItemTotal;
  });

  const handleCheckout = async () => {
    setLoading(true);

    const data = await fetch("/api/order/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total - 500 }),
    });

    const { success, key, order } = await data.json();

    if (!success) {
      toast.error("Can't Process Payment!");
    }

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "StoryIn",
      description:
        "StoryIn is a best audio book plateform to upgrade yourself by listing new audio books.",
      order_id: order.id,
      image: Icon,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: async (response: any) => {
        let Total = 0;
        const productsArr: {
          _id: string;
          price: number;
          name: string;
          quantity: number | undefined;
          discount: number;
          sellingPrice: number;
        }[] = [];

       const productId: string[] = [];

        Cart.cardItems.map((i) => {
          const _id = i._id;
          const price = i.price;
          const discount = i.discount;
          const sellingPrice = i.price - i.discount - 500;
          Total += sellingPrice;

          productsArr.push({
            _id,
            price,
            name: i.name,
            quantity: i.quantity,
            discount,
            sellingPrice,
          });

          productId.push(i._id)
        });

        const Info = await fetch("/api/order/verify", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_orderID: response.razorpay_order_id,
            razorpay_paymentID: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: Total,
            productId,
            address: {
              name: Address?.name,
              mobile: Address?.mobile,
              pin: Address?.pin,
              addressWild: Address?.address,
              town: Address?.town,
              city: Address?.city,
              state: Address?.state,
              of: Address?.of,
            },
            products: productsArr,
            discount,
          }),
        });

        const { success, message } = await Info.json();

        if (success === true) {
          setLoading(false);
          toast.success(message);
          dispatch(removeAll());
          navigate("/");
        } else {
          toast.error("Payment Failed!");
          setLoading(false);
        }
      },

      prefill: {
        name: user?.name,
        email: user?.email,
        contact: "1234567890",
      },
      notes: {
        address: "Maharashtra, Sambajinager, Padampura",
      },
      theme: {
        color: "white",
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rzp1 = await new (window as any).Razorpay(options);
    rzp1.open();
    setLoading(false);
  };

  return (
    <section className="flex relative w-screen pb-20 flex-col bg-gray-100 gap-4 m-auto justify-center items-center">
      <h2 id="recline" className="mt-7 text-2xl uppercase">
        Order Summary
      </h2>
      { total === 0 ? (
        <EmptyCart />
      ) : (
        <section className="flex flex-row w-full px-20 gap-8">
          <div className="w-7/12 bg-white h-max rounded-xl">
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
                  <span className="font-semibold text-green-700">
                    {" "}
                    -₹{discount}
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="font-semibold text-gray-700 text-sm">
                    Coupon Discount
                  </span>
                  <span className="font-semibold text-cyan-700">-₹500</span>
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
                <p className="border-t-2 border-spacing-52 border-dashed my-3" />
                <div className="flex flex-row justify-between">
                  <span className="font-semibold text-gray-700 text-sm">
                    Total Amount
                  </span>
                  <span
                    id="recline"
                    style={{ fontWeight: 600 }}
                    className="text-black"
                  >
                    {" "}
                    ₹{total - 500}
                  </span>
                </div>
              </section>

              <button
                disabled={loading}
                onClick={handleCheckout}
                className="bg-[#069baa] mt-7 rounded-full text-white font-bold px-5 w-full tracking-widest p-4 hover:bg-white hover:text-[#069baa] duration-500 hover:shadow-[0px_0px_12px_0px_#1a202c]"
              >
                Process Order
              </button>
            </div>

            <div className="text-xs p-4 border mt-4 flex flex-col gap-1 bg-white rounded-md">
              <div className="flex gap-2 flex-row justify-between">
                <h2 className="font-semibold">Delivery to</h2>
                <button
                  onClick={() => navigate("/address")}
                  className="p-1 px-4 border-2 flex gap-2 rounded-full items-center text-cyan-500 font-semibold border-cyan-700 duration-500 hover:bg-cyan-500 hover:text-white"
                >
                  <span className="text-xs ">Change</span>
                  <IoIosArrowForward className="text-lg" />
                </button>
              </div>
              <h2 className="font-semibold text-black text-sm">
                {Address?.name}
              </h2>
              <p className="font-semibold text-xs text-gray-700">
                {Address?.address}
              </p>
              <p className="font-semibold text-xs text-gray-700">
                {Address?.town}, {Address?.city}, {Address?.state}
              </p>
              <p className="font-semibold text-xs text-gray-700"></p>
              <div className="flex flex-row gap-0">
                <span className="text-gray-700 font-semibold">
                  Contact No:{" "}
                </span>
                <span className="text-black font-semibold">
                  {Address?.mobile}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default Summery;
