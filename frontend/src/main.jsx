import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App, {
    loader as myInfoLoader,
    HydrateFallback as AppHydrateFallback,
} from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/landing.page.jsx";
import WorkPage, {
    loader as workLoader,
    HydrateFallback as WorkHydrateFallback,
} from "./pages/work.page.jsx";
import ErrorPage from "./pages/error.page.jsx";
import NotFoundPage from "./pages/not-found.page.jsx";
import { createContext } from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        loader: myInfoLoader,
        HydrateFallback: AppHydrateFallback,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: "/mywork/:id",
                element: <WorkPage />,
                loader: workLoader,
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export const DataContext = createContext({
    myInfo: null,
    projects: [],
    skills: [],
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
