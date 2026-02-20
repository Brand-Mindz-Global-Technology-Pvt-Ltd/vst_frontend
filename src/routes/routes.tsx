import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from '../pages/home';
import About from '../pages/about';
import Shop from '../pages/shop/shop';
import ProductDetailPage from '../pages/shop-detail/ProductDetailPage';
import BlogPage from '../pages/blog';
import BlogDetail from '../pages/blog/BlogDetail';
import Navbar from '../components/ui/header/navbar';
import ContactPage from '../pages/contact/ContactPage';
import IndustryPage from '../pages/industry';
import Footer from '../components/ui/footer/Footer';
import ProfilePage from '../pages/profile/ProfilePage';

const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="grow">
                <Outlet />
            </main>
            <Footer />
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
                <Route path="/shop/:id" element={<ProductDetailPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/industry" element={<IndustryPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
