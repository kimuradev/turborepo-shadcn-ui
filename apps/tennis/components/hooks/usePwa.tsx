'use client'

import { useEffect, useState } from "react";

export function usePwa() {
    const [showInstallModal, setShowInstallModal] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<any>(null);

    useEffect(() => {
        const hasPwa = localStorage.getItem("ab-tenis-installed")
        const getPWAfromLocalStorage = hasPwa ? JSON.parse(hasPwa) : null;

        console.log('getPWAfromLocalStorage: ', getPWAfromLocalStorage)

        const handleBeforeInstallPrompt = (event: any) => {
            event.preventDefault();
            setPrompt(event);
        }

        if (getPWAfromLocalStorage === null && !window.matchMedia("(display-mode: standalone)").matches) {
            setShowInstallModal(true)
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        }

    }, [])

    const handleInstallClick = () => {
        if (prompt) {
            prompt.prompt();
        }

        prompt.userChoice.then((choiceResult: any) => {
            if (choiceResult.outcome === "accepted") {
                console.log('Accepted')
                localStorage.setItem("ab-tenis-installed", 'true')
            } else {
                console.log('Canceled')
            }

            setPrompt(null);
            setShowInstallModal(false);
        })
    }

    const handleCloseModal = () => {
        localStorage.setItem("ab-tenis-installed", 'false')
        setShowInstallModal(false)
    }

    const handleClickOutsideModal = () => {
        setShowInstallModal(false)
    }

    return [
        {
            showInstallModal
        },
        {
            handleClickOutsideModal,
            handleInstallClick,
            handleCloseModal
        }
    ]

}
