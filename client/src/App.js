import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import LoginPage from './pages/LoginPage/Login.page';
import HomePage from './pages/HomePage/Home.page';
import ProfilePage from './pages/ProfilePage/Profile.page';
import CreatePost from './pages/CreatePostPage/CreatePost.page';

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <BrowserRouter>
        <Routes>
            <Route index={true} path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage setUserData={setUserData}/>} />
            <Route path="/profile" element={<ProfilePage userData={userData}/>}/>
            <Route path="/create-post" element={<CreatePost userData={userData}/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
