export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-6 flex justify-between items-center z-50">
      <div>
        <h1 className="text-xl font-bold">Hive CRM</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>

            <span
              className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100   
 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
            >
              3
            </span>
          </button>
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg">
            <img
              className="h-6 w-6 rounded-full inline-block mr-2"
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              alt="User Avatar"
            />
            User Name
          </button>
        </div>
      </div>
    </header>
  );
}
