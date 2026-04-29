import React from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Home from '../pages/home';
import About from '../pages/about';
import Shop from '../pages/shop/shop';
import Commercial from '../pages/shop/commercial';
import ProductDetailPage from '../pages/shop-detail/ProductDetailPage';
import BlogPage from '../pages/blog';
import BlogDetail from '../pages/blog/BlogDetail';
import Navbar from '../components/ui/header/navbar';
import ContactPage from '../pages/contact/ContactPage';
import IndustryPage from '../pages/industry';
import Footer from '../components/ui/footer/Footer';
import ProfilePage from '../pages/profile/ProfilePage';
import PrivacyPolicy from '../pages/policies/PrivacyPolicy';
import CookiePolicy from '../pages/policies/CookiePolicy';
import TermsConditions from '../pages/policies/TermsConditions';
import ShippingPolicy from '../pages/policies/ShippingPolicy';
import DeliveryPolicy from '../pages/policies/DeliveryPolicy';
import RefundReturnPolicy from '../pages/policies/RefundReturnPolicy';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    return isAuthenticated ? <>{children}</> : <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
};

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
                <Route path="/commercial" element={<Commercial />} />
                <Route path="/shop/:id" element={<ProductDetailPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/industry" element={<IndustryPage />} />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                } />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/delivery-policy" element={<DeliveryPolicy />} />
                <Route path="/refund-return-policy" element={<RefundReturnPolicy />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
