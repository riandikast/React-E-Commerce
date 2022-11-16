function CardCart({
  image,
  quantity,
  title,
  price,
  increament,
  decreament,
  deleteClick,
  stockMsg,
})

{
  return (
    <>
      <div className="w-3/6 mx-auto mt-6">
        <div className="px-3 py-5 rounded-md bg-white flex justify-center">
          <img src={image} alt="img" className="w-20 h-24 mr-20" />
          <div className="w-1/2 text-left">
            <div className="flex flex-row">
              <h2 className="text-darkgreen text-base font-bold mb-8 mr-8 line-clamp-2">{title}</h2>
              <div className="ml-auto mt-1">
              <button
                onClick={deleteClick}
                className="rounded-md  bg-[#cf6137]  text-white text-xs lg:text-sm font-medium px-1 h-8 w-7"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
              </div>
          
            </div>

            <div className="flex space-x-20">
              <div className="flex space-x-3">
                <div>
                  <button onClick={decreament} className="text-lg w-8 border-2 hover:bg-[#cf6137]">
                    -
                  </button>
                </div>

                <div className="text-darkgreen text-base font-bold mb-5">
                  {quantity}
                </div>

                <div>
                  <button onClick={increament} className="text-lg w-8 border-2 hover:bg-[#cf6137]">
                    +
                  </button>
                </div>
                
              </div>
            
              <div className="text-darkgreen text-base font-bold mb-5">
                ${price}
              </div>
            </div>
            <div className="text-[#f70000]">{stockMsg}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardCart;
