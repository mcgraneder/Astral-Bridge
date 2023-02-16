


const ROUTES: string[] = ["Bridge", "Wallet", "Trade", "History"];

const NavLinks = ({ routes }: { routes: string[] }) => {
    return (
        <>
            {routes.map((route: string) => {
                return (
                    <div key={route} className='flex flex-row items-center gap-2'>
                        <span className='m-1 w-full rounded-xl px-7 py-2 text-center hover:cursor-pointer hover:bg-black hover:bg-opacity-20'>{route}</span>
                    </div>
                );
            })}
        </>
    );
};

const BottomNavBar = () => {
    return (
        <div className='flex h-[50px] w-full md:hidden'>
            <div className='my-0 mx-auto flex rounded-2xl border border-tertiary bg-darkBackground'>
                <NavLinks routes={ROUTES} />
            </div>
        </div>
    );
}

export default BottomNavBar