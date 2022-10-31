function Hero() {
    return (
        <div className="relative flex justify-around items-center w-screen h-[90vh] !bg-dark-plain">
            {/* <img src="/hero3.svg" alt="Hero" className="rounded-full absolute bottom-20" width={90} /> */}
            <div className="text-left">
                {/* <img src="/hero.svg" alt="Hero" className="rounded-full absolute top-20 xl:top-36" width={80} /> */}
                <h1 className="text-4xl text-darkgreen font-bold mb-2">Exclusive Deals of </h1>
                <h1 className="text-4xl text-darkgreen font-bold mb-5">Women's Clothing</h1>
                <p className="text-darkgreen">Explore different categories. Find the best deals.</p>
                <button className="bg-green px-5 py-2 mt-5 rounded-md text-white font-semibold">Shop Now</button>
            </div>
            <div className="flex">
                <img src="/baru.svg" alt="Hero" width={500}  />
                {/* <img src="/hero2.svg" alt="Hero" className="relative right-12" width={254} /> */}
            </div>
        </div>
    )
}

export default Hero;