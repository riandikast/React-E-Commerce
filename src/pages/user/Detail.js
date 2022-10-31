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
        <div></div>
    )
}

export default Detail;