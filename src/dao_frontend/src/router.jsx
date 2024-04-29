import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Detailpage from './pages/detailPage';
import Home from './pages/homepage';
import PreviousProposal from './pages/previousProposal';
import OpenProposal from './pages/openProposal';
import CreateProposal from './pages/formPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home should redirect to dashboard */}
        <Route path="/"  element={<Home />} />
        <Route path="/proposal"  element={<App />} />
        <Route path="/proposals"  element={<PreviousProposal />} />
        <Route path="/open-proposals"  element={<OpenProposal />} />
        <Route path="/create-proposal"  element={<CreateProposal />} />
        <Route path='/detail-proposals/:id'  element={<Detailpage />} />
      </Routes>
    </BrowserRouter>
  );
}
