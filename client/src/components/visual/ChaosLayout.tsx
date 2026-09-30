import React, { useState } from 'react';
import { HallucinatingBackground } from './HallucinatingBackground.js';
import { ChaosNavbar } from '../navigation/ChaosNavbar.js';
import { ChaosFooter } from '../navigation/ChaosFooter.js';
import { Hologram } from '../hologram/Hologram.js';
import { LoginModal } from '../modals/LoginModal.js';
import { FakePaymentModal } from '../modals/FakePaymentModal.js';
import { TokenRewardModal } from '../modals/TokenRewardModal.js';
import { PoorFellowModal } from '../modals/PoorFellowModal.js';
import { ConfusingQuestionModal } from '../modals/ConfusingQuestionModal.js';
import { useChaosState } from '../../hooks/useChaosState.js';

interface ChaosLayoutProps {
  children: React.ReactNode;
}

export const ChaosLayout: React.FC<ChaosLayoutProps> = ({ children }) => {
  const {
    showPaymentModal,
    setShowPaymentModal,
    showTokenRewardModal,
    setShowTokenRewardModal,
    showPoorFellowModal,
    setShowPoorFellowModal,
    showConfusingModal,
    setShowConfusingModal,
  } = useChaosState();

  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Visual background layers: mist, black gradients, noise */}
      <HallucinatingBackground />

      {/* Top Navbar */}
      <ChaosNavbar />

      {/* Main Page Content */}
      <main className="relative z-20 flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>

      {/* Persistent Floating Hologram */}
      <Hologram />

      {/* Bottom Footer with Emergency Reset */}
      <ChaosFooter />

      {/* Modals Orchestration */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <FakePaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />

      <TokenRewardModal
        isOpen={showTokenRewardModal}
        onClose={() => setShowTokenRewardModal(false)}
      />

      <PoorFellowModal
        isOpen={showPoorFellowModal}
        onClose={() => setShowPoorFellowModal(false)}
      />

      <ConfusingQuestionModal
        isOpen={showConfusingModal}
        onClose={() => setShowConfusingModal(false)}
      />
    </div>
  );
};
