import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { HistoryProvider } from "./context/HistoryContext";
import Header from "./components/layout/Header";
import GeneratorPage from "./pages/GeneratorPage";
import HistoryPage from "./pages/HistoryPage";
import HistoryDetailPage from "./pages/HistoryDetailPage";
import TrendsPage from "./pages/TrendsPage";
import PromptStudioPage from "./pages/PromptStudioPage";

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
              <Route path="/trends" element={<Navigate to="/trends/youtube" replace />} />
              <Route path="/trends/:platform" element={<TrendsPage />} />
              <Route path="/prompt" element={<PromptStudioPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </HistoryProvider>
    </LanguageProvider>
  );
}
