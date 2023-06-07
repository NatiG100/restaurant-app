import NavigationMenu from "./NavigationMenu";
import {VscDashboard as DashboardIcon} from 'react-icons/vsc'
import {
  BiDish as OrderIcon,
  BiDrink as DrinkIcon
} from 'react-icons/bi';
import {MdOutlineLunchDining as FoodIcon} from 'react-icons/md'
import {FiUsers as UsersIcon} from 'react-icons/fi';
import {TbBrandAirtable as TableIcon} from 'react-icons/tb';
import {AiOutlineSetting as SettingIcon} from 'react-icons/ai';
import {IoMdStats as StatIcon} from 'react-icons/io'
import logo from '../../assets/svg/Logo.svg'
import Image from "next/image";
import Auth from "../hoc/Auth";

export default function Navigation() {
  return (
    <div className="h-screen w-full overflow-y-auto grid grid-rows-header px-0 md:px-5 ">

      <div className="h-20 gap-2 w-full flex items-center justify-start sticky top-0 left-0 bg-white shadow-md shadow-white">
        <img 
            src={logo} 
            alt="Logo" 
            height={60}
            width={60}
            className="fill-transparent ml-2"
        />
        <div className="flex flex-col justify-center gap-0">
          <p className="text-lg text-indigo-600 font-semibold">Muni</p>
          <p className="text-gray-600">Cafe & Restaurant</p>
        </div>
      </div>

      <div className="h-full w-full flex flex-col gap-6 pt-10 pb-4">
        <div className="w-full px-2 flex flex-col gap-4">
          <Auth requiredPrevilage="View Info">
            <NavigationMenu route="/" only>
              <DashboardIcon size={"22"}/>
              <p className="hidden md:block">Dashboard</p>
            </NavigationMenu>
          </Auth>
          <Auth requiredPrevilage="View Orders">
            <NavigationMenu route="/orders">
              <OrderIcon size={"22"}/>
              <p className="hidden md:block">Orders</p>
            </NavigationMenu>
          </Auth>
          <NavigationMenu route="/foods" defaultRoute="/categories">
            <FoodIcon size={"22"}/>
            <p className="hidden md:block">Foods</p>
          </NavigationMenu>
          <NavigationMenu route="/drinks" defaultRoute="/categories">
            <DrinkIcon size="22"/>
            <p className="hidden md:block">Drinks</p>
          </NavigationMenu>
        </div>

        <hr className="border-indigo-100"/>

        <div className="w-full px-2 flex flex-col gap-4">
          <Auth requiredPrevilage="View Users">
            <NavigationMenu route="/users">
              <UsersIcon size={"22"}/>
              <p className="hidden md:block">Users</p>
            </NavigationMenu>
          </Auth>
          <Auth requiredPrevilage="View Tables">
            <NavigationMenu route="/tables">
              <TableIcon size={"22"}/>
              <p className="hidden md:block">Tables</p>
            </NavigationMenu>
          </Auth>
        </div>

        <hr className="border-indigo-100"/>

        <div className="w-full px-2 flex flex-col gap-4">
          <Auth requiredPrevilage="View Info">
            <NavigationMenu route="/stats">
              <StatIcon size="22"/>
              <p className="hidden md:block">Stats</p>
            </NavigationMenu>
          </Auth>
          <NavigationMenu route="/setting">
            <SettingIcon size="22"/>
            <p className="hidden md:block">Setting</p>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}