import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Navbar from '../components/ui/header/navbar';
import ContactPage from '../pages/contact/ContactPage';
import About from '../pages/about';
import Shop from '../pages/shop/shop';

// Layout component to include Navbar on all pages
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="grow">
                {children}
            </main>
        </div>
    );
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/shop" element={<Shop />} />
        </Routes>
    );
};

export default AppRoutes;
