import CardProduct from "../../components/CardProduct";
import Hero from "../../components/Hero";

function Home() {
    return (
        <>
            <Hero />
            <div className="w-11/12 mx-auto">
                <div className="my-10">
                    <h2 className="text-center text-2xl font-bold mb-5 text-darkgreen">Our Best Seller</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        <CardProduct />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;