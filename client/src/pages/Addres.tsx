import { TfiLocationPin } from "react-icons/tfi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdPayment } from "react-icons/md";

const Addres = () => {
  const handleChange = () => {};

  return (
    <section className="flex relative flex-col gap-4 m-auto justify-center items-center">

      <div className="flex absolute top-9 left-[40%] w-[20%] flex-row items-center gap-1 text-center">
        <TfiLocationPin className="w-11 text-2xl text-cyan-400" />
        <p className="h-[0.5px] w-28 border border-dashed border-black " />
        <IoDocumentTextOutline className="w-11 text-2xl" />
        <p className="h-[0.5px] w-28 border border-dashed border-black " />
        <MdPayment className="w-11 text-2xl" />
      </div>

      <form className="flex flex-col gap-4 mt-20 w-11/12 md:w-1/3 rounded-lg p-4 border">
        <div className="flex gap-3 flex-col">
          <h2 className="uppercase text-xs font-semibold tracking-wider">
            Contact Details
          </h2>
          <input
            type="text"
            className="p-[10px] w-[100%] text-xs rounded outline-none border-gray-400 border-[1px]"
            required
            placeholder="Name*"
            id="name"
            onChange={handleChange}
          />
          <input
            type="tel"
            className="p-[10px] w-[100%] text-xs rounded outline-none border-gray-400 border-[1px]"
            required
            placeholder="Mobile No*"
            id="mobile"
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-5 flex-col">
          <h2 className="uppercase text-xs font-semibold tracking-wider">
            Address
          </h2>
          <input
            type="number"
            className="p-[10px] w-[100%] text-xs rounded outline-none border-gray-400 border-[1px]"
            required
            placeholder="Pin Code*"
            id="pin code"
            onChange={handleChange}
          />
          <input
            type="text"
            className="p-[10px] w-[100%] text-xs rounded outline-none border-gray-400 border-[1px]"
            required
            placeholder="Address (House No, Building, Street, Area)*"
            id="address"
            onChange={handleChange}
          />
          <input
            type="text"
            className="p-[10px] w-[100%] text-xs rounded outline-none border-gray-400 border-[1px]"
            required
            placeholder="Locality / Town*"
            id="town"
            onChange={handleChange}
          />
          <div className="flex flex-row gap-3">
            <input
              type="text"
              className="p-[10px] w-[100%] text-xs rounded outline-none border-gray-400 border-[1px]"
              required
              placeholder="City / Distric*"
              id="city"
              onChange={handleChange}
            />
            <input
              type="text"
              className="p-[10px] w-[100%] text-xs rounded outline-none border-gray-400 border-[1px]"
              required
              placeholder="State*"
              id="state"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2>Save Address as</h2>
          <div className="">
            <span className="text-xs border border-cyan-500 rounded-full px-6 p-1 mx-2">
              Home
            </span>
            <span className="text-xs border rounded-full px-6 p-1 mx-2">
              Work
            </span>
          </div>
        </div>

        <div className="p-3 shadow-[0px_0px_16px_2px_#00000024] rounded-lg">
          <button className="uppercase bg-cyan-500 font-semibold text-white rounded-lg w-full p-3">
            Add Address
          </button>
        </div>
      </form>
    </section>
  );
};

export default Addres;
