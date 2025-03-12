import { useRouteError } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    const [isDark, _setIsDark] = useState(() => {
        // Initialize theme based on system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    const error = useRouteError();

    return (
        <main
            data-theme={isDark ? "dark" : "light"}
            className="w-full h-full pt-5 gap-5 flex flex-col items-center bg-l-bg-surf-prim-def dark:bg-d-bg-surf-prim-def"
        >
            <h1 className="text-2xl font-bold text-l-txt-prim-def dark:text-d-txt-prim-def  ">
                {error.status === 404 ? "Page Not Found" : "An error occurred"}
            </h1>
            <p className="text-sm text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                {error.message === "Failed to fetch"
                    ? "Error loading data. Please check your internet connection or try again later."
                    : error.message}
            </p>
            <Link
                to="/"
                className="text-sm text-l-txt-subd-sec-def dark:text-d-txt-subd-sec-def hover:text-l-txt-subd-sec-hov dark:hover:text-d-txt-subd-sec-hov hover:scale-105 transition-all duration-300"
            >
                Go back to the home page
            </Link>
        </main>
    );
};

export default ErrorPage;
