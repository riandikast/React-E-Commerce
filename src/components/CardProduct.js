import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProduct, productSelector } from "../store/products/ProductSlice";

function CardProduct() {
    const { product } = useSelector(productSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProduct());
    }, [])

    // console.log(product);
    return (
        <>
            {product?.map((item, index) => (
                <div key={index} className="p-3 bg-white rounded-md">
                    <Link to={`/detail/${item.id}`}>
                        <img src={item.image} alt="img" className="h-36 object-contain mb-5 mx-auto" />
                        <div className="text-left">
                            <p className="text-darkgreen font-bold text-sm line-clamp-1">{item.title}</p>
                            <p className="text-green text-xs">{item.category}</p>
                            <p className="text-darkgreen font-bold mt-2">${item.price}</p>
                        </div>
                    </Link>
                    </div>

            ))}
        </>
    )
}

export default CardProduct;