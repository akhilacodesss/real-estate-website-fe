import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import AddProperty from "./property/AddProperty";
import Properties from "./property/Properties";
import EditProperty from "./property/EditProperty";
import PropertyDetails from "./property/PropertyDetails";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/AboutSection";
import Contact from "./components/Contact";
import Messages from "./components/Messages";
import AdminDashboard from "./components/AdminDashboard";
import Wishlist from "./components/Wishlist";
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar><Home /></Navbar>} />
          <Route path="/about" element={<Navbar><About /></Navbar>} />
          <Route path="/contact" element={<Navbar><Contact /></Navbar>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/properties" element={<Navbar> <Properties />  </Navbar>} />
          <Route path="/property/:id" element={<Navbar> <PropertyDetails /> </Navbar>} />
          <Route path="/add" element={<Navbar> <AddProperty />  </Navbar>} />
          <Route path="/update/:id" element={<Navbar>  <EditProperty /> </Navbar>} />
          <Route path="/manage-properties" element={<Navbar> <Dashboard />  </Navbar>} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/admin" element={<Navbar><AdminDashboard /></Navbar>} />
          <Route path="/wishlist" element={<Navbar><Wishlist /></Navbar>}/>
          <Route path="/dashboard" element={<Navbar><Dashboard /></Navbar>}/>
          <Route path="/footer" element={<Navbar><Footer /></Navbar>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}
export default App;