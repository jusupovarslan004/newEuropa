import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import VacanciesPage from "./pages/Vacancies/VacanciesPage";
import VacancyDetails from "./pages/Vacancies/VacancyDetails";
import Partners from "./pages/Partners/Partners";
import "./assets/styles/reset.scss";
import "./assets/styles/base.scss";
import DataPages from "./pages/DataPages/DataPages";
import { useEffect } from "react";


function App() {
  
  return (
    <Router>
      <div className="app">
        
        <Header />

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/vacancies" element={<VacanciesPage />} />
            <Route path="/vacancies/:id" element={<VacancyDetails />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/form/:link" element={<DataPages />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
