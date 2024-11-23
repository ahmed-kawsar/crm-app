import { useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const startDate = new Date(2023, 0, 1);
const endDate = new Date();

export default function Customers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customersData, setCustomersData] = useState(
    Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      date: randomDate(startDate, endDate).toISOString().slice(0, 10),
      name: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      phone: `123-456-789${i}`,
      address: `Address ${i + 1}`,
      totalPurchases: Math.floor(Math.random() * (10000 - 100 + 1)) + 100,
    }))
  );

  const [newCustomer, setNewCustomer] = useState({
    id: null,
    date: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    totalPurchases: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;

  const handleNewEntryClick = () => {
    setNewCustomer({
      id: null,
      date: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      totalPurchases: "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCustomer({
      id: null,
      date: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      totalPurchases: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleEditCustomer = (customerId) => {
    const customerToEdit = customersData.find(
      (customer) => customer.id === customerId
    );
    setNewCustomer({ ...customerToEdit });
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = (customerId) => {
    const updatedCustomersData = customersData.filter(
      (customer) => customer.id !== customerId
    );
    setCustomersData(updatedCustomersData);
  };

  const handleSaveCustomer = (event) => {
    event.preventDefault();

    if (newCustomer.id) {
      setCustomersData(
        customersData.map((customer) =>
          customer.id === newCustomer.id ? newCustomer : customer
        )
      );
    } else {
      const newId =
        customersData.length > 0
          ? Math.max(...customersData.map((customer) => customer.id)) + 1
          : 1;
      setCustomersData([{ ...newCustomer, id: newId }, ...customersData]);
    }

    handleCloseModal();
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = customersData.slice(offset, offset + itemsPerPage);

  const handleExportData = () => {
    const worksheet = XLSX.utils.json_to_sheet(customersData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers Data");
    XLSX.writeFile(workbook, "customers_data.xlsx");
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <button
          onClick={handleNewEntryClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New Entry
        </button>

        <button
          onClick={handleExportData}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Export Data
        </button>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Purchases
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap">{customer.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {customer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {customer.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {customer.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${customer.totalPurchases}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditCustomer(customer.id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCustomer(customer.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(customersData.length / itemsPerPage)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="flex justify-center items-center space-x-3 mt-4 py-2 px-4 rounded-md bg-white shadow-sm"
        pageLinkClassName="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
        previousLinkClassName="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
        nextLinkClassName="px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
        activeLinkClassName="bg-blue-500 text-white border-blue-500 rounded-md"
        disabledClassName="text-gray-400 cursor-not-allowed"
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">
              {newCustomer.id ? "Edit Customer" : "New Customer Entry"}
            </h3>
            <form onSubmit={handleSaveCustomer}>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Date:
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newCustomer.date}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newCustomer.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={newCustomer.phone}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={newCustomer.address}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="totalPurchases"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Total Purchases:
                </label>
                <input
                  type="number"
                  id="totalPurchases"
                  name="totalPurchases"
                  value={newCustomer.totalPurchases}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
