import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/routes';
import { HighlightProvider } from './context/HighlightContext'; 
import './App.css';

function App() {
  return (
    <Router>
      <HighlightProvider>
        <AppRoutes />
      </HighlightProvider>
    </Router>
  );
}

export default App;