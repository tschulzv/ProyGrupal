import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import LoginPage from './pages/LoginPage/Login.page';
import RegisterForm from './components/RegisterForm/RegisterForm.component';
import HomePage from './pages/HomePage/Home.page';
import ProfilePage from './pages/ProfilePage/Profile.page';
import CreatePost from './pages/CreatePostPage/CreatePost.page';
import PostDetails from './pages/PostDetailsPage/PostDetails.page';
import SearchPage from './pages/SearchPage/SearchPage.page';

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <BrowserRouter>
        <Routes>
            <Route index={true} path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterForm/>} />
            <Route path="/home" element={<HomePage setUserData={setUserData}/>} />
            <Route path="/profile" element={<ProfilePage userData={userData}/>}/>
            <Route path="/profile/:userId" element={<ProfilePage />}/>
            <Route path="/create-post" element={<CreatePost userData={userData}/>}/>
            <Route path="/posts/:id" element={<PostDetails userData={userData}/>}/>
            <Route path="/search" element={<SearchPage userData={userData}/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
