import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import HomeScreen from './screens/HomeScreen';
import ProjectScreen from './screens/ProjectScreen';
import SellScreen from './screens/SellScreen';


import NavBar from './components/Navbar';

export default function App() {

  return (
      <Router>
        <Toaster/>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/projects/:projectId" element={<ProjectScreen />} />
          <Route path="/sell" element={<SellScreen />} />
        </Routes>
      </Router>
  )
}
