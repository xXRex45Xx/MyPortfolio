/**
 * Main application component that handles theme switching and layout structure.
 * Implements a responsive design with dark/light theme support based on user preference.
 * @returns {JSX.Element} The root application component
 */
import "./App.css";
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import { Outlet, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { getMyInfo } from "./utils/api/my-info-api.util";
import { LineWave } from "react-loader-spinner";
import { getProjects } from "./utils/api/project-api.util";
import { DataContext } from "./main";
import { getSkills } from "./utils/api/skill-api.util";

function App() {
    const data = useLoaderData();

    const [myInfo, setMyInfo] = useState(null);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        setMyInfo(data.myInfo);
        setProjects(data.projects);
        setSkills(data.skills);
    }, [data]);

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
        <DataContext.Provider value={{ myInfo, projects, skills }}>
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
        </DataContext.Provider>
    );
}

export default App;

export const loader = async () => {
    const myInfo = getMyInfo();
    const projects = getProjects();
    const skills = getSkills();
    const data = await Promise.all([myInfo, projects, skills]);
    return { myInfo: data[0], projects: data[1], skills: data[2] };
};

export const HydrateFallback = () => {
    const [isDark, _setIsDark] = useState(() => {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    return (
        <div
            data-theme={isDark ? "dark" : "light"}
            className="w-full h-full flex items-center justify-center bg-l-bg-surf-prim-def dark:bg-d-bg-surf-prim-def"
        >
            <LineWave
                color={isDark ? "#efcb68" : "#3d5a80"}
                height={160}
                width={160}
            />
        </div>
    );
};
