import { BrowserRouter , Routes,Route  } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import AddProperty from "./components/AddProperty";
import Properties from "./components/Properties";
import EditProperty from "./components/EditProperty";
import PropertyDetails from "./components/PropertyDetails";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";

function App() {

  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/properties" element={ <Layout> <Properties />  </Layout> } />
      <Route path="/property/:id" element={ <Layout> <PropertyDetails /> </Layout>  } />
      <Route path= "/add" element= {<Layout> <AddProperty/>  </Layout>  }  />
      <Route path = "/update/:id" element= {<Layout>  <EditProperty /> </Layout> } />
      <Route path="/dashboard" element={<Layout> <Dashboard />  </Layout> } />
    </Routes>
    </BrowserRouter>
    
    </>
  )
}
export default App;