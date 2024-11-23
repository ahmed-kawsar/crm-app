import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Overview from "./pages/Overview";
import Sales from "./pages/Sales";
import Leads from "./pages/Leads";
import Customers from "./pages/Customers";
import OnlineBooking from "./pages/OnlineBooking";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Layout from "./Layout";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn.jsx"; // Import your SignIn component

function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return (
      <>
        <BrowserRouter>
          {user ? (
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
          ) : (
              <SignIn />
          )}
        </BrowserRouter>
      </>
  );
}

export default App;