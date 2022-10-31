import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailProduct, productSelector } from "../../store/products/ProductSlice";
function Detail() {
    const {id} = useParams();
    const { product } = useSelector(productSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetailProduct({id}));
    }, [])

    console.log(product);
    return (
        <div className="w-4/6 mx-auto mt-20">
            <div className="px-3 py-5 rounded-md bg-white flex justify-center">
                <img src={product?.image} alt="img" className="w-48 mr-20" />
                <div className="w-1/2 text-left">
                    <h2 className="text-darkgreen text-lg font-bold mb-2">{product?.title}</h2>
                    <p className="text-darkgreen text-base font-bold mb-5">${product?.price}</p>
                    <p>{product?.description}</p>
                    <button className="w-full p-2 bg-green text-white font-semibold font-jost my-5 flex justify-center items-center rounded-md">Add to cart
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Detail;