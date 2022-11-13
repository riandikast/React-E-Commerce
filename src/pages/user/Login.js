import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emailUser, loginUser} from "../../store/login/LoginSlice";

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [passwordInput, setPasswordInput] = useState();
    const { username, isLogin, token, loading } = useSelector((state) => state.login);

    
    const handleLogin = async(e) => {
        e.preventDefault();
        dispatch(loginUser({username, password: passwordInput}));
    }  
    useEffect(() => {
        isLogin && navigate("/");
    }, [isLogin])

    return (
        <div className="grid grid-cols-2 bg-dark-plain">
            <div className="h-[90vh] flex items-center justify-around relative w-[80%] mx-auto">
                <img src="/banner.svg" alt="banner" className="h-5/6" />

            </div>
            <div className="h-[90vh] w-[80%] mx-auto flex flex-col justify-center items-center">
                <h3 className="text-darkgreen text-2xl font-semibold">Login</h3>
                <form className="w-full" onSubmit={handleLogin}>
                    <div className="flex flex-col text-left my-5">
                        <label htmlFor="email" className="mb-3">Email</label>
                        <input type="email" name="email" className="p-2 w-full rounded-lg" placeholder="John@gmail.com" onChange={(e) => dispatch(emailUser(e.target.value))}></input>
                    </div>
                    <div className="flex flex-col text-left">
                        <label htmlFor="password" className="mb-3">Password</label>
                        <input type="password" name="password" className="p-2 w-full rounded-lg" placeholder="m38rmF$" onChange={(e) => setPasswordInput(e.target.value)}></input>
                    </div>
                    {loading ? (
                        <button 
                            className="bg-green py-2 text-white font-semibold rounded-md w-full mt-8 hover:opacity-70"
                            type="submit" 
                            onClick={handleLogin} disabled
                        >
                        <svg class="animate-spin h-3 w-3 mr-2" viewBox="0 0 24 24">
                            <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                fill="black" className="opacity-75" />
                        </svg>
                        Loading
                      </button>
                    ) : (
                        <button 
                            className="bg-green py-2 text-white font-semibold rounded-md w-full mt-8 hover:opacity-70"
                            type="submit" 
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login;