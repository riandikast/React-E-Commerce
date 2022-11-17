import { Link } from "react-router-dom";

function CardProduct({
    id,
    title,
    price,
    image,
    category,
  }) {

    return (
        <div key={id} className="p-3 bg-white rounded-md">
            <Link to={`/detail/${id}`}>
                <img src={image} alt="img" className="h-36 object-contain mb-5 mx-auto w-24" />
                <div className="text-left">
                    <p className="text-darkgreen font-bold text-sm line-clamp-1">{title}</p>
                    <p className="text-green text-xs">{category}</p>
                    <p className="text-darkgreen font-bold mt-2">${price}</p>
                </div>
            </Link>
        </div>
    )
}

export default CardProduct;