function CardStock({
  image,
  stock,
  title,
  price,
  desc,
  category,
  getStock,
  updateClick,
  stockInput,
  isInput,
}) {
  const getFirstStock = () => {
    if (isInput === null) {
      return getStock;
    } else {
      return 
    }
  };

  return (
    <>
      <div className="w-5/6 mx-auto mt-6">
        <div className="px-1 py-5 rounded-md bg-white flex justify-center">
          <img src={image} alt="img" className="w-20 h-24 mr-24 my-auto" />
          <div className="w-1/2 text-left">
            <div className="flex flex-row">
              <h2 className="text-darkgreen text-base font-bold mb-4 mr-8 line-clamp-2">
                {title}
              </h2>
              <div className="ml-auto mr-16">
                <form onSubmit={updateClick} className="w-20">
                  <div className="flex flex-row  text-left ">
                    <label className="font-medium text-base">Stock</label>
                    <input
                      type="number"
                      className="ml-4 px-2  text-base font-semibold rounded-lg w-20 border-black border-2"
                      value={getFirstStock()}
                      min="0"
                      pattern="[0-9]"
                      onChange={(e) => stockInput(Number(e.target.value))}
                    ></input>
                    <button
                      className="ml-4 bg-green  text-white font-medium  text-sm rounded-md  px-2 "
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex space-x-20">
              <div className="flex space-x-3">
                <div className="text-darkgreen text-xs font-bold mb-5">
                  {desc}
                </div>
              </div>
            </div>
            <div className="text-[#f70000]"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardStock;
