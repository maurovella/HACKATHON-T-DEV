import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';

import NavBar from './components/Navbar';

export default function App() {

  return (
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </Router>
  )
}
