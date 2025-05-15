import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Toaster position="top-right" />
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;