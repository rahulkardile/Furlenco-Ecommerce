import { FormEvent } from "react";
import { LiaSearchSolid } from "react-icons/lia";

const Search = () => {
 
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
    <form onSubmit={handleSubmit} className="flex relative w-[40%] sm:w-[25%] rounded-full p-2 portrait:text-xs sm:p-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] sm:shadow-[0px_0px_21px_2px_#00000024] bg-white gap-2">
      <input
        type="text"
        placeholder="What are you looking for?"
        className="outline-none w-[90%] pl-2 bg-transparent"
      />
      <button className="absolute right-7 top-3 hover:scale-105">
        <LiaSearchSolid className="text-base sm:text-2xl portrait:hidden" />
      </button>
    </form>
  );
};

export default Search;
