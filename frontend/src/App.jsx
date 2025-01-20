import 'react'; // Import React if using JSX in older versions
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from '../src/pages/Layouts/NavBar'; // Import Navbar
import Home from './pages/home/Home'; // Import Home component
import Form from './pages/form/form'
import Admin from './pages/admin/admin'
import UpdateUser from'./pages/EditForm'
const App = () => {
  return (
    <Router>
      <div>
        <NavBar /> {/* Add Navbar to the layout */}
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/form" element={<Form />} /> 
          <Route path="/admin" element={<Admin />} />
          <Route path="/EditForm/:id" element={<UpdateUser />} />
        </Routes>
      </div>
    </Router>
  );
};

// Fixed: Removed non-breaking space
export default App;
