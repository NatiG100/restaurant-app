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

export default function Navigation() {
  return (
    <div className="h-screen w-full overflow-y-auto grid grid-rows-header px-5 ">

      <div className="h-20 w-full flex items-center justify-start sticky top-0 left-0 bg-white shadow-md shadow-white">
        <p>Logog</p>
      </div>

      <div className="h-full w-full flex flex-col gap-6 pt-10 pb-4">
        <div className="w-full px-2 flex flex-col gap-4">
          <NavigationMenu route="/">
            <DashboardIcon size={"22"}/>
            Dashboard
          </NavigationMenu>
          <NavigationMenu route="/orders">
            <OrderIcon size={"22"}/>
            Orders
          </NavigationMenu>
          <NavigationMenu route="/foods">
            <FoodIcon size={"22"}/>
            Foods
          </NavigationMenu>
          <NavigationMenu route="/drinks">
            <DrinkIcon size="22"/>
            Drinks
          </NavigationMenu>
        </div>

        <hr className="border-indigo-100"/>

        <div className="w-full px-2 flex flex-col gap-4">
          <NavigationMenu route="/users">
            <UsersIcon size={"22"}/>
            Users
          </NavigationMenu>
          <NavigationMenu route="/tables">
            <TableIcon size={"22"}/>
            Tables
          </NavigationMenu>
        </div>

        <hr className="border-indigo-100"/>

        <div className="w-full px-2 flex flex-col gap-4">
          <NavigationMenu route="/stats">
            <StatIcon size="22"/>
            Stats
          </NavigationMenu>
          <NavigationMenu route="/setting">
            <SettingIcon size="22"/>
            Setting
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}