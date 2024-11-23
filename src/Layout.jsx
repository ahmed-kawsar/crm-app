import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="flex">
        <main className="ml-64 pt-28 p-6 w-full overflow-y-auto">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
