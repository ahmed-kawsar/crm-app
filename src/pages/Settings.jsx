export default function Settings() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">General Settings</h2>

          <div className="mb-4">
            <label
              htmlFor="theme"
              className="block text-gray-700 font-bold mb-2"
            >
              Theme:
            </label>
            <select
              id="theme"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="language"
              className="block text-gray-700 font-bold mb-2"
            >
              Language:
            </label>
            <select
              id="language"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              {/* Add more language options as needed */}
            </select>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>

          <div className="mb-4">
            <label
              htmlFor="dataSharing"
              className="block text-gray-700 font-bold mb-2"
            >
              Allow Data Sharing:
            </label>
            <input
              type="checkbox"
              id="dataSharing"
              className="mr-2 leading-tight"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cookies"
              className="block text-gray-700 font-bold mb-2"
            >
              Enable Cookies:
            </label>
            <input
              type="checkbox"
              id="cookies"
              className="mr-2 leading-tight"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
      >
        Save Changes
      </button>
    </div>
  );
}
