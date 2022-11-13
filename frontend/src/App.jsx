/*
Root App file - should contain nothing but navigation and conditional rendering code. No application logic should persist here.
*/

import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Home from './pages/Home';
import Teapot from './pages/Teapot';
import NoPage from './pages/NoPage';
import './App.css';

// export const lblTheme = createTheme({
//   overrides: {
//     MuiFormControlLabel: {
//       label: {
//         fontSize: '0.875rem',
//       }
//     }
//   }
// });

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#DA1E75" // This is an orange looking color                
    },     
    secondary: {         
      main: "#ffffff" //Another orange-ish color                
   }            
  },
  overrides: {
    MuiFormControlLabel: {
      label: {
        fontSize: '2rem',
      }
    }
  }
});

window.serverURL = "http://127.0.0.1:3000";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Home />} />
            <Route path="404" element={<NoPage />} />
            <Route path="*" element={<Teapot />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
