'use client'

import PwaModal from "@/components/pwa-modal";
import { usePwa } from "@/components/hooks/usePwa";
import PwaIOSModal from "@/components/pwa-ios-modal";

export default function PWA() {
    // @ts-ignore
    const [{ showIOSInstallModal, showInstallModal }, { handleInstallClick, handleCloseModal, handleClickOutsideModal }] = usePwa();

    return (
        <div>
            {showIOSInstallModal ? (
                <PwaIOSModal show={showInstallModal} onClose={handleCloseModal} />
            ) : (
                <PwaModal show={showInstallModal} onClose={handleCloseModal} onInstall={handleInstallClick} onClickOutside={handleClickOutsideModal} />
            )}
        </div>
    )
}
