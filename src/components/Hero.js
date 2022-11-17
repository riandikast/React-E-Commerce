import {scroller } from "react-scroll";
import { useAtom } from 'jotai';
import {navbarState} from './Navbar'
function Hero() {
    const [active, setActive] = useAtom(navbarState)
    const goShop = () => {
        setActive("productActive")
        scroller.scrollTo('productElement',{smooth:true, spy:true, duration:700})
    }
    return (
        <div className="relative flex justify-around items-center w-screen md:w-11/12 lg:w-screen h-[50vh] md:h-[90vh] !bg-dark-plain mx-auto">
            <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-darkgreen font-bold mb-2">Exclusive Deals of </h1>
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-darkgreen font-bold mb-5">Women's Clothing</h1>
                <p className="text-darkgreen">Explore different categories. Find the best deals.</p>
                <button onClick={goShop} className="bg-green px-5 py-2 mt-5 rounded-md text-white font-semibold">Shop Now</button>
            </div>
                <img src="/hero.svg" alt="Hero" className="w-2/5 hidden md:block"/>
        </div>
    )
}

export default Hero;