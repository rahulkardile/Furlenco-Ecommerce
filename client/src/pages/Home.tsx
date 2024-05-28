import Crousel from "../components/Crousel";
import Card from "../components/Card";

const Home = () => {
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
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
      </section>
    </>
  );
};

export default Home;
