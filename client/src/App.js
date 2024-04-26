import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/Login.page';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route index={true} path="/" element={<LoginPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
