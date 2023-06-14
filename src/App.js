import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import LandingPage from './pages/landingPage';
import APNavbar from './components/APNavbar';
import MenuPage from './pages/menuPage';
import AdminPage from './pages/adminPage';
import AdminLandingView from './views/adminLandingView';

function App() {

  const currentUser = false;

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/admin" />
  }

  return (
    <div className="App">

      <APNavbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/admin" element={<AdminPage />} />

        {/* Private Routes */}
        <Route path="/adminLp" element={<RequireAuth><AdminLandingView /></RequireAuth>} />

        
      </Routes>
    </div>
  );
}

export default App;
