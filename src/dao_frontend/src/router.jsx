import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Detailpage from './pages/detailPage';
import Home from './pages/homepage';
import PreviousProposal from './pages/previousProposal';
import OpenProposal from './pages/openProposal';
import ClaimReward from './pages/claimReward';
import CreateProposal from './pages/formPage';
import { ThemeProvider } from './contexts/ThemeContext';

export default function Router() {
  return (
    <BrowserRouter>
    
    <ThemeProvider>
      <Routes>
        {/* Home should redirect to dashboard */}
        <Route path="/"  element={<Home />} />
        <Route path="/proposal"  element={<App />} />
        <Route path="/all-about-icp"  element={<IcpPage />} />
        <Route path="/whitepaper"  element={<WhitePaperPage />} />
        <Route path="/point-system"  element={<PointSystemPage />} />
        <Route path="/roadmap"  element={<Roadmap />} />
        <Route path="/proposals"  element={<PreviousProposal />} />
        <Route path="/open-proposals"  element={<OpenProposal />} />
        <Route path="/create-proposal"  element={<CreateProposal />} />
        <Route path='/detail-proposals/:id'  element={<Detailpage />} />
        <Route path='/claim-reward'  element={<ClaimReward />} />
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
