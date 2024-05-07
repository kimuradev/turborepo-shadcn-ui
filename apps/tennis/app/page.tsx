'use client'

import PwaModal from "@/components/pwa-modal";
import Dashboard from "./dashboard/dashboard";
import { usePwa } from "@/components/hooks/usePwa";

export default function Home() {
  // @ts-ignore
  const [{ showInstallModal }, { handleInstallClick, handleCloseModal, handleClickOutsideModal }] = usePwa();

  return (
    <div className="flex-1 p-0 md:space-y-4 md:p-8 md:pt-6">
      <Dashboard />
      <PwaModal show={showInstallModal} onClose={handleCloseModal} onInstall={handleInstallClick} onClickOutside={handleClickOutsideModal}/>
    </div>
  )
}
