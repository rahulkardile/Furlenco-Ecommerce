import Crousel from "../components/Crousel";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { AllProduct, ProductFetch } from "../typeScript/FetchAllProduct";
import toast from "react-hot-toast";

const Home = () => {
  const [data, setData] = useState<ProductFetch[]>();

  const getData = async () => {
    const res = await fetch("/api/product/all");
    const { success, data }: AllProduct = await res.json();

    if (success) {
      setData(data);
    } else {
      toast.error("Error Product!");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section className="w-screen h-auto z-10">
        <Crousel />
      </section>
      <section className="w-screen px-11 p-10">
        <h1 id="KaushanFont" className="capitalize text-3xl">
          Latest Products
        </h1>

        <section className="flex gap-8 justify-evenly mt-7 items-center flex-wrap">
          {data?.map((i) => (
            <Card
              _id={i._id}
              discount={i.discount}
              mainImage={i.mainImage}
              name={i.name}
              price={i.price}
              key={i._id}
              stock={i.stock}
            />
          ))}
        </section>
      </section>
    </>
  );
};

export default Home;
