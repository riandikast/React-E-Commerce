import { useEffect, useState, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser, loginAdmin, reset } from "../../store/login/LoginSlice";
import { motion } from "framer-motion";

function Login() {
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

  const { isLogin, isError, emailUser, emailAdmin, username } = useSelector(
    (state) => state.login
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [role, setRole] = useState(null);
  const [emailInput, setEmailInput] = useState(null);
  const [passwordInput, setPasswordInput] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  
  useEffect(() => {
    if (emailInput === emailAdmin) {
      setRole("admin");
    } else if (emailInput === emailUser) {
      setRole("user");
    } else {
      setRole(null);
    }
  }, [emailAdmin, emailInput, emailUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (role === "user") {
      dispatch(loginUser({ username, password: passwordInput }));
    } else {
      dispatch(loginAdmin({emailInput, passwordInput }));
    }
  };

  useEffect(() => {
    dispatch(reset());
    isLogin
      ? isLogin &&
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Successfully logged in",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        })
      : isError &&
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Email or Password are wrong",
        });
  }, [isLogin, isError]);

  return (
    <motion.div
      className=""
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <div className="flex items-center justify-around bg-dark-plain h-[90vh]">
        <img src="/banner.svg" alt="banner" className="w-1/2 h-5/6 mx-auto hidden md:block xl:w-2/5" />
        <div className="w-8/12 md:w-2/5 mx-auto flex flex-col justify-center items-center">
          <h3 className="text-darkgreen text-2xl font-semibold">Login</h3>
          <form className="w-full">
            <div className="flex flex-col text-left my-5">
              <label htmlFor="email" className="mb-3">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="p-2 w-full rounded-lg"
                placeholder="John@gmail.com / admin@bukapedia.com"
                onChange={(e) => setEmailInput(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col ">
              <label htmlFor="password" className="mb-3 text-left">
                Password
              </label>
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                className="p-2 w-full  rounded-lg"
                placeholder="user: m38rmF$ / admin: admin123"
                onChange={(e) => setPasswordInput(e.target.value)}
              ></input>{" "}
              <div className=" flex flex-col items-end">
                <i
                  onClick={togglePassword}
                  className={
                    passwordShown
                      ? "far fa-eye fixed  -mt-7 mr-5"
                      : "far fa-eye-slash fixed -mt-7 mr-5"
                  }
                  id="togglePassword"
                ></i>
              </div>
            </div>
            <button
              className="bg-green py-2 text-white font-medium rounded-md w-full mt-8"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
