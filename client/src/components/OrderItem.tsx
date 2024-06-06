import { Link } from "react-router-dom";
import { orderProduct } from "../typeScript/Order";

const OrderItem = ( OrderData: orderProduct) => {
  return (
    <div className="w-full p-3 flex flex-row justify-between gap-4">
      <img
        src={`/api/${OrderData.img}`}
        alt="item name"
        className="w-20 h-20 mx-5"
      />
      <section className="flex flex-col w-1/2">
        <h3 className="font-semibold">{OrderData.name}</h3>
        <p className="text-xs"> Quantity: {OrderData.quantity}</p>
      </section>
      <p className="font-semibold">₹{OrderData.price}</p>
      <section className="text-xs">
        <div className="flex flex-col gap-1">
          <span className="font-semibold">Delivery Expected by Friday Jun 07</span>
          <span className="">Your Item Has been Shipped!</span>
        </div>
        <div className="flex flex-col gap-1">
          <Link to={"/"} className="text-blue-500">
            Rate & Review Product
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OrderItem;
