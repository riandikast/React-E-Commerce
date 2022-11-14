import CardProduct from "../../components/CardProduct";
import Hero from "../../components/Hero";
import { motion } from "framer-motion";

function Home() {
  const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };
  const pageVariants = {
    initial: { scale: 0.2, opacity: 100 },
    in: { scale: 1, opacity: 1, transition: { duration: 0.5, ...transition } },
    out: {
      scale: 0.2,
      opacity: 0,
      transition: { duration: 0.5, ...transition },
    },
  };

  return (
    <>
      <motion.div
        className=""
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <Hero />
        <div className="w-11/12 mx-auto">
          <div className="my-10" id="products">
            <h2 className="text-center text-2xl font-bold mb-5 text-darkgreen">
              Our Best Seller
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <CardProduct />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Home;
