import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Detailpage from './pages/detailPage';
import IcpPage from './pages/icpPage';
import PointSystemPage from './pages/pointSystemPage';
import WhitePaperPage from './pages/whitePaperPage';
import Roadmap from './pages/roadMapPage';
import Scam from './pages/ScamPage';
import Home from './pages/homepage';
import PreviousProposal from './pages/previousProposal';
import OpenProposal from './pages/openProposal';
import ClaimReward from './pages/claimReward';
import CreateProposal from './pages/formPage';
import LoginPage from "./pages/loginPage";
import AdminPanel from "./pages/Dashboard/admin";
import AdminOpenProposal from "./pages/Dashboard/openproposal";
import AdminClosedProposal from "./pages/Dashboard/closedproposal";
import AdminPendingProposal from "./pages/Dashboard/pendingproposal";
import AdminRejectedProposal from "./pages/Dashboard/rejectedproposal";
import AdminDetailPage from "./pages/Dashboard/detailpage";
import AdminScam from './pages/Dashboard/ScamPage';
import AdminScamFormPage from './pages/Dashboard/ScamFormPage';
import { ThemeProvider } from './contexts/ThemeContext';
import AdminPendingDetailPage from './pages/Dashboard/pendingdetailpage'
export default function Router() {
  return (
    <BrowserRouter>
    
    <ThemeProvider>
      <Routes>
        {/* Home should redirect to dashboard */}
        <Route path="/"  element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/proposal"  element={<App />} />
        <Route path="/all-about-icp"  element={<IcpPage />} />
        <Route path="/whitepaper"  element={<WhitePaperPage />} />
        <Route path="/point-system"  element={<PointSystemPage />} />
        <Route path="/roadmap"  element={<Roadmap />} />
        <Route path="/scam-list"  element={<Scam />} />
        <Route path="/proposals"  element={<PreviousProposal />} />
        <Route path="/open-proposals"  element={<OpenProposal />} />
        <Route path="/create-proposal"  element={<CreateProposal />} />
        <Route path='/detail-proposals/:id'  element={<Detailpage />} />
        <Route path='/claim-reward'  element={<ClaimReward />} />
        <Route path="/admin"  element={<AdminPanel />} />
        <Route path="/admin/open-proposal"  element={<AdminOpenProposal />} />
        <Route path="/admin/closed-proposal"  element={<AdminClosedProposal />} />
        <Route path="/admin/pending-proposal"  element={<AdminPendingProposal />} />
        <Route path="/admin/rejected-proposal"  element={<AdminRejectedProposal />} />
        <Route path='/admin/detail-proposals/:id'  element={<AdminDetailPage />} />
        <Route path='/admin/pending-detail-proposals/:id'  element={<AdminPendingDetailPage />} />
        <Route path='/admin/scam-list'  element={<AdminScam />} />
        <Route path='/admin/add-scams'  element={<AdminScamFormPage />} />
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
