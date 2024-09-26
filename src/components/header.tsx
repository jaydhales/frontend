import Link from "next/link";
import NavItem from "./navItem";
import SideNav from "./sideNav";
import { CustomConnectButton } from "./customConnectButton";
export function Header() {
  return (
    <div className="z-10 grid grid-cols-5 items-center justify-between px-[14px] py-[24px] text-white">
      <Link href={"/"} className="flex items-center gap-x-2">
        {/* <Image src={logo} alt="Sir-Trading Logo" className="h-[60px] w-auto" /> */}
        <h1 className="font-lora text-[32px] font-bold text-gold">
          SIR.TRADING
        </h1>
      </Link>
      <div className="col-span-3 flex justify-center">
        <nav className="hidden lg:block">
          <ul className="flex gap-x-[16px] rounded-md bg-[#0A0A0F] px-[12px] py-[12px] font-semibold text-muted-foreground">
            <div className="flex gap-x-[16px]   rounded-md">
              <NavItem url={"/"}>Leverage</NavItem>
              <NavItem url={"/liquidity"}>Liquidity</NavItem>
              <NavItem url={"/portfolio"}>Portfolio</NavItem>
            </div>
            <NavItem url={"/stake"}>Stake</NavItem>
            <NavItem url={"/create-vault"}>Create Vault</NavItem>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-x-2 justify-end">
        <CustomConnectButton />
        <SideNav />
      </div>
    </div>
  );
}
