import { ChangeEvent, FormEvent, useState } from "react";
import { FormDataSet } from "../typeScript/FromData";

const Create = () => {
  const [formData, setFormData] = useState<FormDataSet>({
    title: "",
    category: "",
    description: "",
    price: 0,
    discount: 0,
  });

  const [img, setImg] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImg(file);
  };

  const handleFormData = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (formData !== undefined) {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  console.log(img);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form: any = new FormData();

    form.set("name", formData.title);
    form.set("description", formData.description);
    form.set("category", formData.category);
    form.set("price", formData.price);
    form.set("discount", formData.discount);
    form.set("cover", img);

    const res = await fetch("/api/product/create", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    console.log(data);

    setLoading(false);
  };

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
              onChange={(e) => handleFormData(e)}
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
              onChange={(e) => handleFormData(e)}
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
              onChange={(e) => handleFormData(e)}
              className="p-2 w-[100%] outline-cyan-400 border rounded"
              placeholder="discount"
              required
            />
          </div>

          <div className="flex flex-col w-[95%] gap-1 mb-2">
            <span className="text-xs font-medium">Image</span>
            <input
              type="file"
              id="mainImage"
              accept="image/*"
              className="p-2 w-[100%] outline-cyan-400 border rounded bg-white"
              onChange={(e) => handleFile(e)}
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
              onChange={(e) => handleFormData(e)}
              required
            />
          </div>

          <div className="flex flex-col w-[95%] gap-1 mb-2">
            <span className="text-xs font-medium">Tags</span>
            <input
              type="text"
              id="category"
              className="p-2 w-[100%] outline-cyan-400 border rounded"
              placeholder="Add Tags"
              onChange={(e) => handleFormData(e)}
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
