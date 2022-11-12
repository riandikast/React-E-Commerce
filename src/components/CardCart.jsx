function CardCart({ image, quantity, title, price, increament, decreament }) {
  return (
    <>
      <div className="w-3/6 mx-auto mt-6">
        <div className="px-3 py-5 rounded-md bg-white flex justify-center">
          <img src={image} alt="img" className="w-20 h-24 mr-20" />
          <div className="w-1/2 text-left">
            <h2 className="text-darkgreen text-lg font-bold mb-8">{title}</h2>
            <div className="flex space-x-20">
              <div className="flex space-x-3">
                <div>
                  <button onClick={decreament} className="text-lg w-8 border-2">-</button>
                </div>

                <div className="text-darkgreen text-base font-bold mb-5">
                  {quantity}
                </div>

                <div>
                  <button  onClick={increament} className="text-lg w-8 border-2" >+</button>
                </div>
              </div>

              <div className="text-darkgreen text-base font-bold mb-5">
                ${price}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardCart;
