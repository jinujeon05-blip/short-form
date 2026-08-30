import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { HistoryProvider } from "./context/HistoryContext";
import Header from "./components/layout/Header";
import GeneratorPage from "./pages/GeneratorPage";
import HistoryPage from "./pages/HistoryPage";
import HistoryDetailPage from "./pages/HistoryDetailPage";

export default function App() {
  return (
    <LanguageProvider>
      <HistoryProvider>
        <BrowserRouter>
          <Header />
          <div style={{ flex: 1, minWidth: 0 }}>
            <Routes>
              <Route path="/" element={<GeneratorPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/history/:id" element={<HistoryDetailPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </HistoryProvider>
    </LanguageProvider>
  );
}
