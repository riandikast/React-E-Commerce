import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

function Rekap() {
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
  const navigate = useNavigate();

  const rekap = JSON.parse(localStorage.getItem("rekap"));

  const totalPrice = () => {
    let count = 0;
    if (rekap !== null) {
      for (let i = 0; i < rekap.length; i++) {
        const total = rekap[i].quantity * rekap[i].price;
        count += total;
      }
      return count.toFixed(2);
    } else {
      return "-";
    }
  };

  const listRecap = () => {
    const rekap = JSON.parse(localStorage.getItem("rekap"));
    if (rekap !== null) {
      return (
        <>
          <table className="table-auto border-2 border-darkgreen mx-auto bg-white">
            <thead className="border-2 border-darkgreen">
              <tr>
                <th className="text-left px-3 py-2 sm:px-6 sm:py-4 mr-4 text-xs sm:text-base">Product</th>
                <th className="px-2 sm:px-8 text-xs sm:text-base">Price</th>
                <th className="px-2 sm:px-6 text-xs sm:text-base">Sold</th>
                <th className="px-2 sm:px-6 text-xs sm:text-base">Income</th>
              </tr>
            </thead>
            <tbody>
              {rekap.map((item) => (
                <tr key={item.title}>
                  <td className="text-left px-2 pt-2 sm:px-6 sm:pt-4 mb-3 font-semibold text-darkgreen text-xs sm:text-base line-clamp-2 sm:line-clamp-3">
                    {item.title}
                  </td>
                  <td className="p-0 sm:p-4 font-semibold text-darkgreen text-xs sm:text-base">${item.price}</td>
                  <td className="p-0 sm:p-4 font-semibold text-darkgreen text-xs sm:text-base">{item.quantity}</td>
                  <td className="p-0 sm:p-4 font-semibold text-darkgreen text-xs sm:text-base">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="border-2 border-darkgreen">
                <td className="font-bold py-2 text-right text-xs sm:text-base">Total Pendapatan</td>
                <td></td>
                <td></td>
                <td className="font-bold py-2 text-xs sm:text-base">${totalPrice()}</td>
              </tr>
            </tbody>
          </table>
        </>
      );
    } else {
      return (
        <>
          <div className="text-black" >
            <i class="fa fa-newspaper fa-3x mt-16 " aria-hidden="true"></i>
            <div className="text-black mt-2">No recap yet</div>
          </div>
        </>
      );
    }
  };

  let isAdmin = JSON.parse(localStorage.getItem("admin"));
  useEffect(() => {
    isAdmin?.map((admin) => {
      if (admin.admin === true) return true;
      else {
        return (
          Swal.fire({
            title: "",
            text: "Please Login to access this page",
            icon: "warning",
            confirmButtonText: "Oke",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          })
        )
      }
    });
  }, [isAdmin]);

  return (
    <>
      <motion.div
        className=""
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <div className="mt-28 w-11/12 sm:w-5/6 mx-auto">{listRecap()}</div>
      </motion.div>
    </>
  )

}

export default Rekap;
