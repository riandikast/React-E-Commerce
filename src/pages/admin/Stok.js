import CardStock from "../../components/CardStock";
import { useEffect, useState, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStock } from "../../store/products/ProductSlice";
import Swal from "sweetalert2";

function Stok() {
  const [stockInput, setStockInput] = useState(null);
  const dispatch = useDispatch();

  const handleUpdateStock = (e, product) => {
    e.preventDefault();

    dispatch(updateStock({ id: product.id, stock: stockInput }));

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Stock Updated",
    });
  };

  const listStock = () => {
    const data = JSON.parse(localStorage.getItem("product"));
    console.log("pol", stockInput);

    if (data !== null) {
      if (data.length !== 0) {
        return data.map((item) => (
          <CardStock
            title={item.title}
            image={item.image}
            stock={item.stock}
            desc={item.desc}
            getStock={item.stock}
            stockInput={setStockInput}
            isInput={stockInput}
            updateClick={(e) => handleUpdateStock(e, item)}
         
          />
        ));
      }
    }
  };

  return (
    <>
      <div className="w-11/12 mx-auto">
        <div className="my-10" id="products">
          <h2 className="mt-20 text-center text-2xl font-bold mb-5 text-darkgreen">
            Product Stock
          </h2>
          <div>{listStock()}</div>
        </div>
      </div>
    </>
  );
}

export default Stok;
