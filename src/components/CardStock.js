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
      return;
    }
  };

  return (
    <>
      <div className="m685:hidden">
        <div className="w-5/6 mx-auto mt-6 ">
          <div className="px-4 md:px-1 py-5 rounded-md bg-white flex justify-center">
            <img
              src={image}
              alt="img"
              className="w-20 h-24  sm:mr-4 md:mr-14 lg:mr-24 my-auto object-contain"
            />
            <div className="w-4/5 md:w-1/2 text-left">
              <div className="flex flex-row">
                <h2 className="text-darkgreen text-base font-bold mb-4 mr-6 line-clamp-2">
                  {title}
                </h2>
                <div className="ml-auto mr-16 hidden lg:block ">
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
                  <div className="text-darkgreen text-xs font-bold mb-5 line-clamp-3 sm:line-clamp-none">
                    {desc}
                  </div>
                </div>
              </div>
              {/* responsive stock */}
              <form onSubmit={updateClick} className="w-20 block lg:hidden">
                <div className="flex text-left ">
                  <label className="font-medium text-base">Stock</label>
                  <input
                    type="number"
                    className="ml-2 px-2  text-base font-semibold rounded-lg w-12 min-[445px]:w-20 border-black border-2"
                    value={getFirstStock()}
                    min="0"
                    pattern="[0-9]"
                    onChange={(e) => stockInput(Number(e.target.value))}
                  ></input>
                  <button
                    className="ml-3 bg-green  text-white font-medium  text-sm rounded-md  px-2 "
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </form>
              <div className="text-[#f70000]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile */}

      <div className="min685:hidden m685:block">
        <div className="w-4/6 mx-auto mt-6 ">
          <div className="px-4 py-5 rounded-md bg-white justify-center">
            <div className="mx-auto">
            <img
              src={image}
              alt="img"
              className="w-20 h-24 mx-auto object-contain"
            />
            <div className="w-6/6 text-center ">
              <div className="flex  mx-auto  ">
                <h2 className="text-darkgreen text-base  mx-auto font-bold mb-4 line-clamp-2">
                  {title}
                </h2>
              </div>
              <div className="flex space-x-20">
                <div className="flex flex-col space-x-3">
                  <div className="text-darkgreen text-xs font-bold mb-5 text-left mx-auto line-clamp-3">
                    {desc}
                  </div>
                  <div className="max540:w-6/6 min540:w-6/6 ">
                  <form onSubmit={updateClick} className=" ">
                    <div className="flex flex-col min540:flex-row mx-auto text-left ">
                      <div className="flex flex-row w-20 ml-auto mr-10 min540:mr-4 max540:mb-4">
                      <label className="font-medium text-base ">Stock</label>
                      <input
                        type="number"
                        className="ml-4 px-2  text-base font-semibold rounded-lg w-16 border-black border-2 "
                        value={getFirstStock()}
                        min="0"
                        pattern="[0-9]"
                        onChange={(e) => stockInput(Number(e.target.value))}
                      ></input>
                      </div>

                      <button
                        className="ml-8  bg-green  max540:w-20 max540:h-6 max540:text-xs max540:ml-auto text-white font-medium  text-sm rounded-md  px-2 "
                        type="submit"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
                </div>
              </div>
              <div className="text-[#f70000]"></div>
            </div>
            </div>
        
          </div>
        </div>
      </div>
    </>
  );
}

export default CardStock;
