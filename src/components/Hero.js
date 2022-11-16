import {scroller } from "react-scroll";
function Hero() {
    return (
        <div className="relative flex justify-around items-center w-screen h-[90vh] !bg-dark-plain">
            <div className="text-left">
                <h1 className="text-4xl text-darkgreen font-bold mb-2">Exclusive Deals of </h1>
                <h1 className="text-4xl text-darkgreen font-bold mb-5">Women's Clothing</h1>
                <p className="text-darkgreen">Explore different categories. Find the best deals.</p>
                <button onClick={()=>scroller.scrollTo('productElement',{smooth:true, spy:true, duration:700})} className="bg-green px-5 py-2 mt-5 rounded-md text-white font-semibold">Shop Now</button>
            </div>
            <div className="flex">
                <img src="/hero.svg" alt="Hero" width={500}  />
            </div>
        </div>
    )
}

export default Hero;