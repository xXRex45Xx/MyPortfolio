import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HydrateFallback } from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext } from "react";

const router = createBrowserRouter([
    {
        path: "/",
        lazy: async () => {
            const [
                { default: App, HydrateFallback, loader },
                { default: ErrorPage },
            ] = await Promise.all([
                import("./App.jsx"),
                import("./pages/error.page.jsx"),
            ]);
            return {
                Component: App,
                loader,
                errorElement: <ErrorPage />,
            };
        },
        HydrateFallback,
        children: [
            {
                index: true,
                lazy: async () => {
                    const { default: LandingPage } = await import(
                        "./pages/landing.page.jsx"
                    );
                    return { Component: LandingPage };
                },
            },
            {
                path: "/mywork/:id",
                lazy: async () => {
                    const { default: WorkPage, loader } = await import(
                        "./pages/work.page.jsx"
                    );
                    return { Component: WorkPage, loader };
                },
            },
        ],
    },
    {
        path: "*",
        lazy: async () => {
            const { default: NotFoundPage } = await import(
                "./pages/not-found.page.jsx"
            );
            return { Component: NotFoundPage };
        },
        HydrateFallback,
    },
]);

export const DataContext = createContext({
    myInfo: null,
    projects: [],
    skills: [],
    socialMediaLinks: [],
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
