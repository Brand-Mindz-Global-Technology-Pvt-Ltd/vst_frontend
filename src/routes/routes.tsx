import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from '../pages/home';
import About from '../pages/about';
import Shop from '../pages/shop/shop';
import BlogPage from '../pages/blog';
import BlogDetail from '../pages/blog/BlogDetail';
import Navbar from '../components/ui/header/navbar';
import ContactPage from '../pages/contact/ContactPage';

const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="grow">
                <Outlet />
            </main>
        </div>
    );
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
