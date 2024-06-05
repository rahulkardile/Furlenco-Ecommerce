import { IoIosArrowForward } from "react-icons/io";
import OrderItem from "../components/OrderItem";
import { useEffect, useState } from "react";
import { order } from "../typeScript/Order";

const Order = () => {
  const [Orders, setOrders] = useState<order[]>();

  const data = async () => {
    const res = await fetch("/api/order/myorder");
    const GotRes = await res.json();
    setOrders(GotRes);
  };

  let ready = false;

  useEffect(() => {
    if (ready) {
      data();
    }
    ready = true;
  }, []);

  return (
    <>
      <h2 id="recline" className="m-auto my-7 text-2xl text-center">
        My Orders
      </h2>
      <section className="w-[85%] m-auto flex flex-row gap-10 ">
        <div className="w-1/3 flex flex-col gap-5">
          <div className="flex flex-row gap-1 uppercase items-center text-gray-700 text-sm">
            <p>Home</p>
            <IoIosArrowForward className="text-xs" />
            <p>My Account</p>
            <IoIosArrowForward className="text-xs" />
            <p>My Order</p>
          </div>
          <div className="w-full bg-white p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <div className="p-3">
              <h2 className="text-lg font-semibold">Filter</h2>
              <p className="border-b border-gray-500 mb-1 p-1" />
              <h2 className="text-sm font-semibold capitalize">Order Status</h2>
              <section className="flex flex-col gap-2 text-gray-600 mt-3">
                <div className="flex flex-row gap-1">
                  <input type="checkbox" />
                  <span className="text-sm">On The Way</span>
                </div>
                <div className="flex flex-row gap-1">
                  <input type="checkbox" />
                  <span className="text-sm">Delivered</span>
                </div>
                <div className="flex flex-row gap-1">
                  <input type="checkbox" />
                  <span className="text-sm">Cancelled</span>
                </div>
                <div className="flex flex-row gap-1">
                  <input type="checkbox" />
                  <span className="text-sm">Returned</span>
                </div>
              </section>

              <h2 className="text-sm font-semibold mt-2 capitalize">
                Order Time
              </h2>
              <section className="flex flex-col gap-2 mt-3 text-gray-600">
                <div className="flex flex-row gap-1">
                  <input type="checkbox" />
                  <span className="text-sm">Last 30 days</span>
                </div>
                <div className="flex flex-row gap-1">
                  <input type="checkbox" />
                  <span className="text-sm">2023</span>
                </div>
                <div className="flex flex-row gap-1">
                  <input type="checkbox" />
                  <span className="text-sm">2022</span>
                </div>
                <div className="flex flex-row gap-1">
                  <input type="checkbox" />
                  <span className="text-sm">2021</span>
                </div>
                <div className="flex flex-row gap-1">
                  <input type="checkbox" />
                  <span className="text-sm">Older</span>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-5/6 mt-10">
          {Orders?.map((i) => (
            <div className="p-2 border hover:shadow-[0px_6px_9px_0px_#00000024] duration-300 rounded-md flex flex-col gap-1">
              {i.productId.map((item, index) => (
                <OrderItem
                  name={item.name}
                  img={item.mainImage}
                  _id={item._id}
                  price={i.products[index].sellingPrice}
                  quantity={i.products[index].quantity}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Order;
