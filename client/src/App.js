import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/Login.page';
import HomePage from './pages/HomePage/Home.page';
import ProfilePage from './pages/ProfilePage/Profile.page';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route index={true} path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
