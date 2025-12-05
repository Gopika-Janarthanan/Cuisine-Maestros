import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';

import Register from './pages/Register';
import ChefList from './pages/ChefList';
import BookingPage from './pages/BookingPage';
import UserDashboard from './pages/UserDashboard';
import ChefDashboard from './pages/ChefDashboard';
import ChefProfile from './pages/ChefProfile';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chefs" element={<ChefList />} />
          <Route path="/book/:chefId" element={<BookingPage />} />
          <Route path="/chef/:id" element={<ChefProfile />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/chef-dashboard" element={<ChefDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
