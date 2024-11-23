import { BrowserRouter, Route, Routes } from "react-router-dom";
import Overview from "./pages/Overview";
import Sales from "./pages/Sales";
import Leads from "./pages/Leads";
import Customers from "./pages/Customers";
import OnlineBooking from "./pages/OnlineBooking";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Layout from "./Layout";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<Overview />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/booking" element={<OnlineBooking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}
