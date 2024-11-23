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

export default function SalesList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [salesData, setSalesData] = useState(
    Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      date: randomDate(startDate, endDate).toISOString().slice(0, 10),
      customer: `Customer ${i + 1}`,
      service: ["Restoration", "Cleaning", "Damage Repair"][
        Math.floor(Math.random() * 3)
      ],
      amount: Math.floor(Math.random() * (5000 - 100 + 1)) + 100,
    }))
  );

  const [newSale, setNewSale] = useState({
    id: null,
    date: "",
    customer: "",
    service: "Restoration",
    amount: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;

  const handleNewEntryClick = () => {
    setNewSale({
      id: null,
      date: "",
      customer: "",
      service: "Restoration",
      amount: "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewSale({
      id: null,
      date: "",
      customer: "",
      service: "Restoration",
      amount: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSale({ ...newSale, [name]: value });
  };

  const handleEditSale = (saleId) => {
    const saleToEdit = salesData.find((sale) => sale.id === saleId);
    setNewSale({ ...saleToEdit });
    setIsModalOpen(true);
  };

  const handleDeleteSale = (saleId) => {
    const updatedSalesData = salesData.filter((sale) => sale.id !== saleId);
    setSalesData(updatedSalesData);
  };

  const handleSaveSale = (event) => {
    event.preventDefault();

    if (newSale.id) {
      setSalesData(
        salesData.map((sale) => (sale.id === newSale.id ? newSale : sale))
      );
    } else {
      const newId =
        salesData.length > 0
          ? Math.max(...salesData.map((sale) => sale.id)) + 1
          : 1;
      setSalesData([{ ...newSale, id: newId }, ...salesData]);
    }

    handleCloseModal();
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = salesData.slice(offset, offset + itemsPerPage);

  const totalSales = useMemo(() => {
    return salesData.reduce((sum, sale) => sum + sale.amount, 0);
  }, [salesData]);

  const handleExportData = () => {
    const worksheet = XLSX.utils.json_to_sheet(salesData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");
    XLSX.writeFile(workbook, "sales_data.xlsx");
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
        <div className="text-lg font-medium">Total Sales: ${totalSales}</div>
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
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Service
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((sale) => (
              <tr key={sale.id}>
                <td className="px-6 py-4 whitespace-nowrap">{sale.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sale.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sale.service}</td>
                <td className="px-6 py-4 whitespace-nowrap">${sale.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditSale(sale.id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSale(sale.id)}
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
        pageCount={Math.ceil(salesData.length / itemsPerPage)}
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
              {newSale.id ? "Edit Sale" : "New Sales Entry"}
            </h3>
            <form onSubmit={handleSaveSale}>
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
                  value={newSale.date}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="customer"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Customer:
                </label>
                <input
                  type="text"
                  id="customer"
                  name="customer"
                  value={newSale.customer}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="service"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Service:
                </label>
                <select
                  id="service"
                  name="service"
                  value={newSale.service}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Restoration">Restoration</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Damage Repair">Damage Repair</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Amount:
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={newSale.amount}
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
