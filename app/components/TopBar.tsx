export default function TopBar() {
    return (
        <div className="light-border border-b h-14 w-full">
            <div className="w-full flex items-center h-full px-4 md:px-8 lg:px-14">
                <div>
                    <a className="flex" href="/">
                        <img className="w-6 h-6" src="/logo.png"></img>
                        <h1 className="mx-2 text-base font-bold">Udasi</h1>
                    </a>
                </div>
                <div style={{color: "var(--light-text)"}} className="mx-6 text-xs">
                    <nav>
                        <a className="hover-color mx-2" href="/">Home</a>
                        <a className="hover-color mx-2" href="#">Source Code</a>
                    </nav>
                </div>
            </div>
        </div>
    )
}