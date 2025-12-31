import './App.css';
import SwipeableLayout from './components/SwipeableLayout';
import { DigitalMarketingCard } from './components/DigitalMarketingCard';
import { SeoCard } from './components/SeoCard';
import { AdCampaignsCard } from './components/AdCampaignsCard';
import { ReputationCard } from './components/ReputationCard';

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
