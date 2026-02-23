import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/routes';
import { HighlightProvider } from './context/HighlightContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import CartModal from './components/ui/cart/CartModal';
import WishlistModal from './components/ui/wishlist/WishlistModal';
import CheckoutModal from './components/ui/checkout/CheckoutModal';
import './App.css';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;