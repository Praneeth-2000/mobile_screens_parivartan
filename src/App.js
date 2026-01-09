import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeContainer from './components/HomeContainer/HomeContainer';
import PortfolioContainer from './components/PortfolioContainer/Container/PortfolioContainer';
import ServicesShowcase from './components/PortfolioContainer/ServicesShowcase';
import { WhyChooseUs } from './components/WhyChooseUs/WhyChooseUs';
import { FAQ } from './components/FAQ/FAQ';
import Testimonials from './components/Testimonials/Testimonials';
import ContactFooter from './components/ContactFooter/ContactFooter';
import BottomNav from './components/BottomNav/BottomNav';
import PortfolioSection from './components/PortfolioContainer/PortfolioSection/PortfolioSection';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/portfolio" element={<PortfolioSection />} />
          <Route path="/" element={
            <>
              <HomeContainer />
              <PortfolioContainer />
              <ServicesShowcase />
              <WhyChooseUs />
              <FAQ />
              <Testimonials />
              <ContactFooter />
              <BottomNav />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
