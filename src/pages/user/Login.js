import { useEffect, useState, React, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emailUser, loginUser, loginAdmin } from "../../store/login/LoginSlice";

function Login() {
  const [refresh, setRefresh] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const { username, isLogin, token, loading } = useSelector(
    (state) => state.login
  );

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const adminCheck = JSON.parse(localStorage.getItem("admin"));

  const handleLogin = async (e) => {
    e.preventDefault();
    setRefresh("Refresh perubahan data")
    dispatch(loginUser({ username, password: passwordInput }));
    dispatch(emailUser(emailInput));

    let loginAsAdmin = {
      emailInput,
      passwordInput,
    };
    dispatch(loginAdmin(loginAsAdmin));

  };
  useEffect(() => {
    isLogin && navigate("/");
  }, [isLogin]);


  useEffect(() => {
    if (adminCheck!==null){
      for (let i = 0; i < adminCheck.length; i++) {
        if (adminCheck[i].admin === true) {
          navigate("/");
        }
      }
    }
  }, [adminCheck]);

  useEffect(() => {
    setRefresh('')
  }, [refresh]);

  return (
    <div className="grid grid-cols-2 bg-dark-plain">
      <div className="h-[90vh] flex items-center justify-around relative w-[80%] mx-auto">
        <img src="/banner.svg" alt="banner" className="h-5/6" />
      </div>
      <div className="h-[90vh] w-[80%] mx-auto flex flex-col justify-center items-center">
        <h3 className="text-darkgreen text-2xl font-semibold">Login</h3>
        <form className="w-full" onSubmit={handleLogin}>
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
  );
}

export default Login;
