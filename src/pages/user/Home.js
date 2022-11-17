import CardProduct from "../../components/CardProduct";
import Hero from "../../components/Hero";
import { motion } from "framer-motion";
import { Element } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, productSelector } from "../../store/products/ProductSlice";
import { useEffect } from "react";

function Home() {
  const transition = { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] };
  const pageVariants = {
    initial: { scale: 0.2, opacity: 100, },
    in: { scale: 1, opacity: 1,},
    out: {
      scale: 0.2,
      opacity: 0,
      transition: { duration: 1, ...transition },
    },
  };
  
  const { product } = useSelector(productSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
  }, [])

  const listProduct = () => {
    return product?.map((item) => (
      <CardProduct
        id = {item.id}
        title={item.title}
        price={item.price}
        image={item.image}
        category={item.category}
      />
    ));
  }

  return (
    <>
      <motion.div
        className=""
        initial="initial"
        animate="in"
        exit="out"
        transition={ {duration: 0.5, ...transition } }
        variants={pageVariants}
      >
        <div id="home">
          <Hero />
        </div>
        <div className="w-11/12 mx-auto">
          <Element name="productElement" className="my-10" id="products">
            <h2 className="text-center text-xl md:text-2xl font-bold mb-5 text-darkgreen">
              Our Best Seller
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {listProduct()}
            </div>
          </Element>
        </div>
      </motion.div>
    </>
  );
}

export default Home;
