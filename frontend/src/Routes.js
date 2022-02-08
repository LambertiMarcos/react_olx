import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';

import Home from './pages/Home';
import About from './pages/About'; 
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdPage from './pages/AdPage';
import AddAd from './pages/AddAd';

// eslint-disable-next-line import/no-anonymous-default-export
export default ( ) => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/ad/:id" element={<AdPage />} />
            <Route exact path="/post-an-ad" element={<RequireAuth private> <AddAd /> </RequireAuth>} />
            <Route exact path="*" element={<NotFound />} />
        </Routes>
    );
}