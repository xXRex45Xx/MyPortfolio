/**
 * Main application component that handles theme switching and layout structure.
 * Implements a responsive design with dark/light theme support based on user preference.
 * @returns {JSX.Element} The root application component
 */
import "./App.css";
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

function App() {
    // State for managing dark/light theme
    const [isDark, setIsDark] = useState(() => {
        // Initialize theme based on system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    // Listen to system theme changes
    const systemPrefersDark = useMediaQuery(
        {
            query: "(prefers-color-scheme: dark)",
        },
        undefined
    );

    // Update theme when system preference changes
    useEffect(() => {
        setIsDark(systemPrefersDark);
    }, [systemPrefersDark]);

    return (
        <>
            <div
                data-theme={isDark ? "dark" : "light"}
                className="transition-colors w-full h-full p-6 flex flex-col items-center justify-between gap-10 bg-l-bg-surf-prim-def dark:bg-d-bg-surf-prim-def"
                role="application"
            >
                <Header
                    isDark={isDark}
                    onThemeChange={() => setIsDark((prev) => !prev)}
                />
                <Outlet />
                <Footer />
            </div>
        </>
    );
}

export default App;
