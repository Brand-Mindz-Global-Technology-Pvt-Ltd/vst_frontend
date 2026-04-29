import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/routes';
import { HighlightProvider } from './context/HighlightContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ScrollToTop from './components/ui/common/ScrollToTop';
import CartModal from './components/ui/cart/CartModal';
import WishlistModal from './components/ui/wishlist/WishlistModal';
// import CheckoutModal from './components/ui/checkout/CheckoutModal';
import CheckoutModal from './components/ui/checkout/CheckoutModal';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: { fontFamily: 'Josefin Sans, sans-serif', fontSize: '14px' },
        }}
        containerStyle={{
          zIndex: 10000,
          top: 80,
        }}
      />
      <AuthProvider>
        <HighlightProvider>
          <WishlistProvider>
            <CartProvider>
              <AppRoutes />
              <CartModal />
              <WishlistModal />
              <CheckoutModal />
            </CartProvider>
          </WishlistProvider>
        </HighlightProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;