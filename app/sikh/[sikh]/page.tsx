import Timeline from "@/app/components/Timeline";
import { getSikh } from "@/app/utils/datastore";
import TopBar from "@/app/components/TopBar";

export default function Sikh({params, searchParams} : {params: { sikh: string; }; searchParams: {};}) {
    const { sikh } = params;
    let data = getSikh(sikh);
    return (
        <div className="w-full h-full flex flex-col">
            <TopBar/>
            <div className="w-full grow my-12 flex text-center justify-center">
                {data ? <Timeline data={data}></Timeline> : <></>}
            </div>
        </div>
    )
}