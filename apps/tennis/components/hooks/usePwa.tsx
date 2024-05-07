'use client'

import { useEffect, useState } from "react";

export function usePwa() {
    const [showIOSInstallModal, setShowIOSInstallModal] = useState<boolean>(false);
    const [showInstallModal, setShowInstallModal] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<any>(null);

    const isIos = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isFirefox = () => navigator.userAgent.toLowerCase().includes('firefox')
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    useEffect(() => {
        if (isIos() && !isInStandaloneMode()) {
            setShowIOSInstallModal(true);
        } else if (isFirefox()) {
            setShowInstallModal(false)
            return;
        }

        const hasPwa = localStorage.getItem("ab-tenis-installed")
        const getPWAfromLocalStorage = hasPwa ? JSON.parse(hasPwa) : null;

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

        try {
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
        } catch (error) {
            setPrompt(null);
            setShowInstallModal(false);
        }
    }

    const handleCloseModal = () => {
        localStorage.setItem("ab-tenis-installed", 'false')
        setShowInstallModal(false)
        setShowIOSInstallModal(false)
    }

    const handleClickOutsideModal = () => {
        setShowInstallModal(false)
    }

    return [
        {
            showInstallModal,
            showIOSInstallModal
        },
        {
            handleClickOutsideModal,
            handleInstallClick,
            handleCloseModal
        }
    ]

}
