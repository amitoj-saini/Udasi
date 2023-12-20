import { sikhTimeline } from "../utils/datastore";

export default function Timeline ({ data } : { data: sikhTimeline }) {
    return (
        <div className="w-full h-full flex p-16 rounded overflow-hidden">
            <div className="h-full w-full columns-2 rounded flex border dark:border-zinc-800 border-zinc-200">
                <div className="w-full h-full rounded-s"></div>
                <div className="w-full h-full max-w-sm dark:bg-zinc-900 bg-zinc rounded-e hidden lg:block"></div>
            </div>
        </div>
    );
}