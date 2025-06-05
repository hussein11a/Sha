import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const API_BASE = process.env.REACT_APP_BACKEND_URL || '';
const API = `${API_BASE}/api`;

const Home = () => {
  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `Error contacting backend API`);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1 className="site-title">سطحة هيدروليك</h1>
        <p className="site-description">خدمة نقل السيارات في أسرع وقت، بأمان واحترافية</p>
        <div className="cta-buttons">
          <a href="tel:0500000000" className="btn call">اتصل الآن</a>
          <a href="https://wa.me/966500000000" className="btn whatsapp" target="_blank" rel="noopener noreferrer">راسلنا واتساب</a>
        </div>
      </header>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
