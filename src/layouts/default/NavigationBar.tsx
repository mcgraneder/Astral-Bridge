import Link from "next/link";
import { useRouter } from "next/router";
import ActiveTabIndicator from "public/svgs/active-tab-indicator.svg";
import LogoFull from "public/svgs/logo-full.svg";
import Logo from "public/svgs/logo-icon.svg";
import React from "react";
import Seperator from "../../../public/svgs/seperator.svg";

export type NavItemProps = { route: string; Icon: any; label: string; };

interface INavbar {
  toggleWalletModal: () => void;
}
const NavItem = ({ route, Icon, label}: NavItemProps) => {
  const { pathname } = useRouter();

  return (
    <Link href={route} passHref>
      <a
        className={`relative flex items-center h-full p-4`}>
        {pathname === route && (
          <ActiveTabIndicator className='absolute bottom-0 left-0 right-0 flex w-full self-end mx-auto mt-auto h-[7px]' />
        )}
        <span
          className={`flex  items-center gap-4 text-lg font-semibold ${
            pathname === route && `text-primary`
          }`}>
          <Icon className={`${pathname === route ? "stroke-primary" : " stroke-white"}`}/>
          {label}
        </span>
      </a>
    </Link>
  );
};

function NavigationBar() {
  const router = useRouter();
  const reload = () => {
    router.reload();
  };

  return (
    <nav className='w-full'>
      <div className='relative grid items-center grid-cols-2 lg:grid-cols-[0.5fr_1fr_0.5fr] lg:px-12'>
        <div className='px-3 py-4 xs:px-0 xs:py-6'>
          <div onClick={reload} className='hover:cursor-pointer'>
            <a className='flex items-center w-max'>
              <LogoFull className='hidden xs:block' />
              <Logo className='w-8 h-8 xs:hidden' />
              <Seperator className='' />
              <div className='mx-4'>ANALYTICS</div>
            </a>
          </div>
        </div>
        <div className='relative items-center justify-center hidden h-full lg:gap-10 xl:gap-18 lg:flex'>
          {/* <NavItem
            route={"/swap"}
            Icon={UilSync}
            label={"Swap"}
          />
          <NavItem
            route='/explorerHome'
            Icon={ExplorerIcon}
            label={"Wallet"}
          /> */}
          {/* <NavItem
            route='/names'
            Icon={NamesIcon}
            label={t("navigationLabels.names")}
          /> */}
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
