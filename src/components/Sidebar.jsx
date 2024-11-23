import { Link, useLocation } from "react-router-dom";
import {
  HiHome,
  HiChartBar,
  HiUser,
  HiCog,
  HiUserGroup,
  HiCalendar,
} from "react-icons/hi";

const navItems = [
  { path: "/", icon: <HiHome />, name: "Overview" },
  { path: "/sales", icon: <HiChartBar />, name: "Sales" },
  { path: "/leads", icon: <HiUserGroup />, name: "Leads" },
  { path: "/customers", icon: <HiUser />, name: "Customers" },
  { path: "/booking", icon: <HiCalendar />, name: "Online Booking" },
  { path: "/profile", icon: <HiUser />, name: "Profile" },
  { path: "/settings", icon: <HiCog />, name: "Settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed w-64 bg-gray-800 text-white h-screen overflow-y-auto pt-16">
      <div className="p-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`hover:bg-gray-700 p-2 rounded flex items-center 
                  ${location.pathname === item.path ? "bg-gray-700" : ""}`} // Conditional styling
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
