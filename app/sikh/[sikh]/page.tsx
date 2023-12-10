import { getSikh } from "@/app/utils/datastore";
import TopBar from "../../components/TopBar";



export default function Sikh({params, searchParams} : {params: { sikh: string; }; searchParams: {};}) {
    const { sikh } = params;
    getSikh(sikh);
    return (
        <div className="w-full h-full flex flex-col">
            <TopBar/>
            <div className="w-full my-12 flex text-center justify-center">
                <div className="max-w-xs md:max-w-lg lg:max-w-3xl">
                    
                </div>
            </div>
        </div>
    )
}