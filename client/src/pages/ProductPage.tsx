import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchProduct, ProducData } from "../typeScript/ProductData";
import { FaRegHeart } from "react-icons/fa6";
import { GrRadialSelected } from "react-icons/gr";
import { FaArrowRight } from "react-icons/fa6";
import { FiTruck } from "react-icons/fi";
import { FaRegThumbsUp } from "react-icons/fa";
import kyc from "../assets/kyc.png";
import care from "../assets/care.png";
import NotFound from "../assets/Not-Found.jpg";
import { useDispatch } from "react-redux";
import { addProduct } from "../Redux/slices/CartReducer";
import toast from "react-hot-toast";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState<ProducData>();
  const getData = async () => {
    const res = await fetch(`/api/product/get/${id}`);
    const { data }: FetchProduct = await res.json();
    setData(data);
  };

  let ready: boolean = false;
  const total = Number(data?.price) - Number(data?.discount);
  let discount = 0;
  if (data !== undefined) {
    discount = Math.round((data.discount * 100) / data.price);
  }

  useEffect(() => {
    if (ready) {
      getData();
    }
    ready = true;
  }, []);

  const handleCart = () => {
    if (data !== undefined) {
      dispatch(addProduct(data));
    }else{
      toast.error("Undefiended")
    }
  };

  return (
    <section className="flex flex-row justify-center m-auto gap-4 w-[80%] p-10">
      <section className="flex flex-col p-4 gap-3">
        <img
          src={`/api/${data?.mainImage}`}
          onError={(e) => (e.currentTarget.src = NotFound)}
          className="w-10/12 object-contain"
          alt="Image of Product"
        />
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">{data?.name}</h2>
          <span className="text-xs text-gray-500">{data?.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold text-gray-700">
            {discount}% Off
          </span>
          <span className="text-lg flex flex-row gap-2 text-gray-700 capitalize ">
            <span>Buy at just</span>
            <span className="font-bold">₹{total}</span>
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h2 id="recline" className="text-2xl font-semibold">
            Specifications And Description
          </h2>
          <p className="text-sm pr-8">{data?.description}</p>
        </div>
      </section>

      <div className="flex flex-col gap-3 mt-5 bg-[#fef4e8] rounded-lg w-[80%] h-fit">
        <section className="pt-8 px-8 flex justify-between">
          <div className="w-11/12">
            <h2 className="">Buy Now</h2>
            <h2 id="recline" className="text-2xl">
              {data?.name}
            </h2>
          </div>
          <FaRegHeart className="bg-white text-2xl w-14" />
        </section>

        <section className="flex flex-row justify-between px-8">
          <div className="flex gap-2 items-center">
            <GrRadialSelected className="text-cyan-500" />
            <h2 className="uppercase">Buy or rent this product</h2>
          </div>
          <div className="flex gap-2 items-center ">
            <span className="text-xs line-through text-gray-600">
              ₹{data?.price}{" "}
            </span>
            <span className="font-semibold uppercase">-34% OFF</span>
          </div>
        </section>

        <section className="flex px-8 flex-col justify-center gap-1">
          <span className="text-xs font-semibold mb-2 ml-3">
            *COD is Awailable
          </span>
          <button onClick={handleCart} className="flex bg-cyan-500 w-10/12 hover:bg-white hover:text-black duration-300 hover:shadow-[0px_0px_12px_0px_#1a202c] p-3 text-white items-center font-semibold text-lg justify-between rounded-full">
            <span className="ml-4">₹{total} </span>
            <section className="flex mr-4 items-center gap-3">
              <span>Go to cart</span>
              <FaArrowRight />
            </section>
          </button>
        </section>

        <section className="flex flex-row gap-3 justify-between px-8 mt-2">
          <div className="flex flex-row gap-2 items-center">
            <FiTruck className="text-xl" />
            <span className="text-xs text-gray-600">
              <span className="">Get it by</span>
              <span className="font-semibold">2 Jun to 560068</span>
            </span>
          </div>
          <button
            onClick={handleCart}
            className="text-cyan-700 underline font-semibold flex flex-row gap-2 items-center text-xs hover:scale-110 cursor-pointer duration-500"
          >
            <span>change pincode</span>
            <FaArrowRight />
          </button>
        </section>

        <section className="flex flex-row gap-3 justify-between px-8 mt-2">
          <div className="flex flex-row gap-2 items-center">
            <FaRegThumbsUp className="text-xl" />
            <span className="text-xs capitalize text-gray-600">
              know more about product
            </span>
          </div>
          <button className="text-cyan-700 underline font-semibold flex flex-row gap-2 items-center text-xs hover:scale-110 cursor-pointer duration-500">
            <span>know more</span>
            <FaArrowRight />
          </button>
        </section>

        <section className="flex flex-row gap-3 py-4 bg-[#eeeeee] px-8 mt-2">
          <img src={kyc} alt="kyc" className="w-10 object-contain" />

          <div className="flex flex-col gap-1 p-1 px-9 w-[400px]">
            <h2 className="text-start">Seamless Delivery Guareenteed!</h2>
            <span className="text-xs capitalize font-semibold text-start text-gray-500">
              To ensure a seamless process, kindly complete your KYC
              verification after placing your order
            </span>
          </div>
        </section>

        <section className="flex flex-col gap-3 bg-white pt-10">
          <div className="flex flex-col gap-1 p-1 px-3 w-[400px]">
            <h2 className="text-start">GET MORE WITH</h2>
            <span className="text-xs capitalize font-semibold text-start text-gray-500">
              Value added Services
            </span>
          </div>
          <img src={care} alt="img" className="object-cover" />
        </section>
      </div>
    </section>
  );
};

export default ProductPage;
