export default function Profile() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <img
            className="w-24 h-24 rounded-full mr-4"
            src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            alt="User Avatar"
          />
          <div>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-4">Personal Information</h3>
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue="John Doe"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue="john.doe@example.com"
              />
            </div>
            {/* Add more personal information fields here */}
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue="123-456-7890"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue="123 Main St"
              />
            </div>
            {/* Add more contact information fields here */}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Change Password</h3>
          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-gray-700 font-bold mb-2"
            >
              Current Password:
            </label>
            <input
              type="password"
              id="currentPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-bold mb-2"
            >
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-bold mb-2"
            >
              Confirm New Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
