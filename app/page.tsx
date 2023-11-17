import TopBar from "./components/TopBar";

export default function Home() {
    return (
        <div className="w-full h-full flex flex-col">
            <TopBar/>
            <div className="w-full my-12 flex text-center justify-center">
                <div className="max-w-xs md:max-w-lg lg:max-w-3xl">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl">Jeevan of the <span className="font-semibold">Gurus</span> and their beloved <span className="font-semibold">Gursikhs</span>.</h1>
                </div>
            </div>
        </div>
    )
}


//<h1 className="text-5xl font-semibold"><span style={{color: "var(--yellow)"}}>Jeevan</span> of the <span style={{color: "var(--orange)"}}>Gurus</span> and their <span style={{color: "var(--blue)"}}>Gursikhs</span>.</h1>