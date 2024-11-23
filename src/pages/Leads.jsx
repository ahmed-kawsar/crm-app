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

export default function Leads() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadsData, setLeadsData] = useState(
    Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      date: randomDate(startDate, endDate).toISOString().slice(0, 10),
      name: `Lead ${i + 1}`,
      email: `lead${i + 1}@example.com`,
      status: ["New", "Contacted", "Follow Up"][Math.floor(Math.random() * 3)],
      source: ["Website", "Referral", "Social Media"][
        Math.floor(Math.random() * 3)
      ],
    }))
  );

  const [newLead, setNewLead] = useState({
    id: null,
    date: "",
    name: "",
    email: "",
    status: "New",
    source: "Website",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;

  const handleNewEntryClick = () => {
    setNewLead({
      id: null,
      date: "",
      name: "",
      email: "",
      status: "New",
      source: "Website",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewLead({
      id: null,
      date: "",
      name: "",
      email: "",
      status: "New",
      source: "Website",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewLead({ ...newLead, [name]: value });
  };

  const handleEditLead = (leadId) => {
    const leadToEdit = leadsData.find((lead) => lead.id === leadId);
    setNewLead({ ...leadToEdit });
    setIsModalOpen(true);
  };

  const handleDeleteLead = (leadId) => {
    const updatedLeadsData = leadsData.filter((lead) => lead.id !== leadId);
    setLeadsData(updatedLeadsData);
  };

  const handleSaveLead = (event) => {
    event.preventDefault();

    if (newLead.id) {
      setLeadsData(
        leadsData.map((lead) => (lead.id === newLead.id ? newLead : lead))
      );
    } else {
      const newId =
        leadsData.length > 0
          ? Math.max(...leadsData.map((lead) => lead.id)) + 1
          : 1;
      setLeadsData([{ ...newLead, id: newId }, ...leadsData]);
    }

    handleCloseModal();
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = leadsData.slice(offset, offset + itemsPerPage);

  const handleExportData = () => {
    const worksheet = XLSX.utils.json_to_sheet(leadsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads Data");
    XLSX.writeFile(workbook, "leads_data.xlsx");
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
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Source
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((lead) => (
              <tr key={lead.id}>
                <td className="px-6 py-4 whitespace-nowrap">{lead.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.source}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditLead(lead.id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLead(lead.id)}
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
        pageCount={Math.ceil(leadsData.length / itemsPerPage)}
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
              {newLead.id ? "Edit Lead" : "New Lead Entry"}
            </h3>
            <form onSubmit={handleSaveLead}>
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
                  value={newLead.date}
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
                  value={newLead.name}
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
                  value={newLead.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Status:
                </label>
                <select
                  id="status"
                  name="status"
                  value={newLead.status}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Follow Up">Follow Up</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="source"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Source:
                </label>
                <select
                  id="source"
                  name="source"
                  value={newLead.source}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Website">Website</option>
                  <option value="Referral">Referral</option>
                  <option value="Social Media">Social Media</option>
                </select>
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
