import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddProperty from "./components/AddProperty";
import Properties from "./components/Properties";
import EditProperty from "./components/EditProperty";
import PropertyDetails from "./components/PropertyDetails";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Messages from "./components/Messages";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/properties" element={<Layout> <Properties />  </Layout>} />
          <Route path="/property/:id" element={<Layout> <PropertyDetails /> </Layout>} />
          <Route path="/add" element={<Layout> <AddProperty />  </Layout>} />
          <Route path="/update/:id" element={<Layout>  <EditProperty /> </Layout>} />
          <Route path="/manage-properties" element={<Layout> <Dashboard />  </Layout>} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}
export default App;