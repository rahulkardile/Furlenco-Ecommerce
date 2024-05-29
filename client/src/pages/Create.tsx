import { useState } from "react";

const Create = () => {
  const [loading, setLoading] = useState();

  const handleFile = () => {};
  const handleSubmit = () => {};

  return (
    <section className="flex justify-evenly flex-col gap-4 m-auto items-center mt-6 mb-24">
      <h1 className="text-2xl font-semibold">List Your Product</h1>

      <form
        onSubmit={handleSubmit}
        className="flex sm:justify-between w-[77%] sm:[50%] sm:gap-8 flex-col portrait:items-center sm:flex-row"
      >
        <div className="w-full sm:w-[50%] ml-4">
          <div className="flex flex-col w-[95%] gap-1 mb-2">
            <span className="text-xs font-medium">Name</span>
            <input
              type="text"
              id="title"
              //   onChange={(e) => setTitle(e.target.value)}
              className="p-2 w-[100%] border outline-cyan-400 rounded"
              placeholder="Name"
              required
            />
          </div>
          <div className="flex flex-col w-[95%] gap-1 mb-2">
            <span className="text-xs font-medium">Price</span>
            <input
              type="number"
              id="price"
              min={1999}
              defaultValue={1999}
              //   onChange={(e) => setTitle(e.target.value)}
              className="p-2 w-[100%] border outline-cyan-400 rounded"
              placeholder="price"
              required
            />
          </div>
          <div className="flex flex-col w-[95%] gap-1 mb-2">
            <span className="text-xs font-medium">Discount</span>
            <input
              type="number"
              id="discount"
              min={300}
              defaultValue={299}
              //   onChange={(e) => setTitle(e.target.value)}
              className="p-2 w-[100%] outline-cyan-400 border rounded"
              placeholder="discount"
              required
            />
          </div>

          <div className="flex flex-col w-[95%] gap-1 mb-2">
            <span className="text-xs font-medium">Image</span>
            <input
              type="file"
              id="img"
              accept="image/*"
              className="p-2 w-[100%] outline-cyan-400 border rounded bg-white"
              onChange={handleFile}
              required
            />
          </div>
        </div>

        <div className="flex flex-col w-[95%] mt-1 sm:w-[50%]">

          <div className="flex flex-col w-[95%] gap-1 mb-2">
            <span className="text-xs font-medium">Description</span>
            <textarea
              id="description"
              className="p-5 w-[100%] h-32 outline-cyan-400 border rounded"
              placeholder="Description"
              //   onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col w-[95%] gap-1 mb-2">
            <span className="text-xs font-medium">Tags</span>
            <input
              type="text"
              id="tags"
              className="p-2 w-[100%] outline-cyan-400 border rounded"
              placeholder="Add Tags"
              //   onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="p-2 bg-cyan-500 text-white outline-cyan-400 font-semibold disabled:opacity-85 rounded "
          >
            Upload
          </button>
        </div>

      </form>
    </section>
  );
};

export default Create;
