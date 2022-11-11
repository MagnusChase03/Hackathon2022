/*
Root App file - should contain nothing but navigation and conditional rendering code. No application logic should persist here.
*/

import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Teapot from './pages/Teapot';
import NoPage from './pages/NoPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Home />} />
            <Route path="404" element={<NoPage />} />
            <Route path="*" element={<Teapot />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
