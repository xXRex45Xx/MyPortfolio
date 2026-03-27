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
        path: "/admin/login",
        lazy: async () => {
            const [
                { default: AdminLoginPage },
                { loader },
                { default: ErrorPage },
            ] =
                await Promise.all([
                    import("./pages/admin/admin-login.page.jsx"),
                    import("./pages/admin/admin-login.loader.js"),
                    import("./pages/error.page.jsx"),
                ]);

            return {
                Component: AdminLoginPage,
                loader,
                errorElement: <ErrorPage />,
            };
        },
        HydrateFallback,
    },
    {
        path: "/admin",
        lazy: async () => {
            const [
                { default: AdminLayout },
                { loader },
                { default: ErrorPage },
            ] =
                await Promise.all([
                    import("./pages/admin/admin-layout.page.jsx"),
                    import("./pages/admin/admin-layout.loader.js"),
                    import("./pages/error.page.jsx"),
                ]);

            return {
                Component: AdminLayout,
                loader,
                errorElement: <ErrorPage />,
            };
        },
        HydrateFallback,
        children: [
            {
                index: true,
                lazy: async () => {
                    const { default: AdminOverviewPage } = await import(
                        "./pages/admin/admin-overview.page.jsx"
                    );

                    return { Component: AdminOverviewPage };
                },
            },
            {
                path: "profile",
                lazy: async () => {
                    const { default: AdminProfilePage } = await import(
                        "./pages/admin/admin-profile.page.jsx"
                    );

                    return { Component: AdminProfilePage };
                },
            },
            {
                path: "projects",
                lazy: async () => {
                    const { default: AdminProjectsPage } = await import(
                        "./pages/admin/admin-projects.page.jsx"
                    );

                    return { Component: AdminProjectsPage };
                },
            },
            {
                path: "skills",
                lazy: async () => {
                    const { default: AdminSkillsPage } = await import(
                        "./pages/admin/admin-skills.page.jsx"
                    );

                    return { Component: AdminSkillsPage };
                },
            },
            {
                path: "social",
                lazy: async () => {
                    const { default: AdminSocialPage } = await import(
                        "./pages/admin/admin-social.page.jsx"
                    );

                    return { Component: AdminSocialPage };
                },
            },
            {
                path: "assets",
                lazy: async () => {
                    const { default: AdminAssetsPage } = await import(
                        "./pages/admin/admin-assets.page.jsx"
                    );

                    return { Component: AdminAssetsPage };
                },
            },
            {
                path: "security",
                lazy: async () => {
                    const { default: AdminSecurityPage } = await import(
                        "./pages/admin/admin-security.page.jsx"
                    );

                    return { Component: AdminSecurityPage };
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
