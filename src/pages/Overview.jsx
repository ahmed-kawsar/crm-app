import { useState, useEffect } from "react";

import SalesChart from "../components/SalesChart";

const leads = [
  { name: "John Doe", email: "john.doe@example.com", status: "New" },
  { name: "Jane Smith", email: "jane.smith@example.com", status: "Contacted" },
  {
    name: "Peter Jones",
    email: "peter.jones@example.com",
    status: "Follow Up",
  },
];

export default function Overview() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Total Customers</h3>
          <p className="text-2xl">1,524</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">New Orders</h3>
          <p className="text-2xl">56</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Revenue</h3>
          <p className="text-2xl">$12,450</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6 flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <h3 className="text-lg font-bold mb-4">Sales Overview</h3>
          <SalesChart />
        </div>
        <div className="lg:w-1/3">
          <h3 className="text-lg font-bold mb-4">Lead List</h3>
          <ul>
            {leads.map((lead) => (
              <li key={lead.email} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-medium">{lead.name}</span>
                  <span className="text-gray-500 text-sm">{lead.status}</span>
                </div>
                <p className="text-gray-600 text-sm">{lead.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
