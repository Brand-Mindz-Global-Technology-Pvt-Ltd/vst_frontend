import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/routes';
import { HighlightProvider } from './context/HighlightContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ScrollToTop from './components/ui/common/ScrollToTop';
import CartModal from './components/ui/cart/CartModal';
import WishlistModal from './components/ui/wishlist/WishlistModal';
import CheckoutModal from './components/ui/checkout/CheckoutModal';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
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