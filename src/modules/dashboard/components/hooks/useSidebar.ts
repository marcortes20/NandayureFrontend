import { useState, useEffect } from 'react'

export const useSidebarState = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    useEffect(() => {
        const storedState = localStorage.getItem('sidebarOpen');
        if (storedState !== null) {
            setIsOpen(storedState === 'true');
        }
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        localStorage.setItem('sidebarOpen', (!isOpen).toString());
    };

    return { isOpen, toggleSidebar };
}
