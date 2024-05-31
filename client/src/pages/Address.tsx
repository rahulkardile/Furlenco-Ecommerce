import { ChangeEvent, FormEvent, useState } from "react";
import { InfoInterface } from "../typeScript/FromData";
import { useDispatch } from "react-redux";
import { addAddress } from "../Redux/slices/Address";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const [newAddress, setAddress] = useState<InfoInterface>({
    name: "",
    mobile: 0,
    pin: 0,
    address: "",
    town: "",
    city: "",
    state: "",
    of: "Home",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAddress({
      ...newAddress,
      [id]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addAddress(newAddress));
    navigate("/summary");
  };

  return (
    <section className="flex relative flex-col gap-4 m-auto justify-center items-center">
      <h2 id="recline" className="mt-5 text-2xl uppercase">
        Add Address
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-11/12 md:w-1/3 rounded-lg p-4 border"
      >
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
            name="contact"
            onChange={handleChange}
          />
          <input
            type="tel"
            className="p-[10px] w-[100%] text-xs rounded outline-none border-gray-400 border-[1px]"
            required
            placeholder="Mobile No*"
            maxLength={10}
            id="mobile"
            name="contact"
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-5 flex-col">
          <h2 className="uppercase text-xs font-semibold tracking-wider">
            Address
          </h2>
          <input
            type="tel"
            className="p-[10px] w-[100%] text-xs rounded outline-none border-gray-400 border-[1px]"
            maxLength={6}
            required
            placeholder="Pin Code*"
            id="pin"
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

export default Address;
