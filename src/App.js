import './App.css';
import SwipeableLayout from './components/MarketingComponents/SwipeableLayout';
import { DigitalMarketingCard } from './components/MarketingComponents/DigitalMarketingCard';
import { SeoCard } from './components/MarketingComponents/SeoCard';
import { AdCampaignsCard } from './components/MarketingComponents/AdCampaignsCard';
import { ReputationCard } from './components/MarketingComponents/ReputationCard';

function App() {
  return (
    <div className="App">
      <SwipeableLayout>
        <DigitalMarketingCard />
        <SeoCard />
        <AdCampaignsCard />
        <ReputationCard />
      </SwipeableLayout>
    </div>
  );
}

export default App;
