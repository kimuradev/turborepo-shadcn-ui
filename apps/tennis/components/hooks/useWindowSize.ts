import { useEffect, useState } from "react";

export function useWindowSize() {
    const [isDesktop, setIsDesktop] = useState(false)

    const checkWindowSize = () => {
        let windowWidth: any;

        if(typeof window !== 'undefined') {
            windowWidth = window.innerWidth;
        }
        if (windowWidth >= 1024) {
            setIsDesktop(true)
        } else{
            setIsDesktop(false)
        }
    }

    useEffect(() => {
        checkWindowSize()
    }, [isDesktop])

    if (typeof window !== 'undefined') {
        window.addEventListener("resize", checkWindowSize)
    }

    return { isDesktop }

}