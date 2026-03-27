import { NavLink, Outlet, useNavigate, useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    clearAdminToken,
    getAdminIdentity,
    getStoredTheme,
    saveStoredTheme,
} from "../../utils/auth/admin-token.util";

const navItems = [
    { to: "/admin", label: "Overview", short: "Home" },
    { to: "/admin/profile", label: "Profile", short: "Profile" },
    { to: "/admin/projects", label: "Projects", short: "Projects" },
    { to: "/admin/skills", label: "Skills", short: "Skills" },
    { to: "/admin/social", label: "Social", short: "Social" },
    { to: "/admin/assets", label: "Assets", short: "Assets" },
    { to: "/admin/security", label: "Security", short: "Security" },
];

const getInitialTheme = () => {
    const storedTheme = getStoredTheme();

    if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

const AdminLayout = () => {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        saveStoredTheme(theme);
    }, [theme]);

    const identity = getAdminIdentity();

    const handleLogout = () => {
        clearAdminToken();
        navigate("/admin/login");
    };

    return (
        <div
            data-theme={theme}
            className="relative min-h-screen overflow-hidden bg-l-bg-surf-prim-def text-l-admin-ink transition-colors dark:bg-d-bg-surf-prim-def dark:text-d-admin-ink"
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-72 bg-linear-to-b from-l-admin-accent/10 via-l-admin-accent/4 to-transparent dark:from-d-admin-accent/10 dark:via-d-admin-accent/4" />
                <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-l-admin-accent/10 blur-3xl dark:bg-d-admin-accent/10" />
                <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-l-ic-prim-def/10 blur-3xl dark:bg-d-ic-prim-def/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(123,90,52,0.08),_transparent_32%),linear-gradient(to_right,rgba(123,90,52,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(123,90,52,0.05)_1px,transparent_1px)] bg-[size:auto,32px_32px,32px_32px] dark:bg-[radial-gradient(circle_at_top,_rgba(239,203,104,0.08),_transparent_32%),linear-gradient(to_right,rgba(239,203,104,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(239,203,104,0.05)_1px,transparent_1px)]" />
            </div>

            <div className="relative mx-auto flex min-h-screen max-w-[1600px] flex-col gap-6 px-4 py-4 sm:px-6 lg:flex-row lg:px-8">
                <aside className="animate-admin-rise lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:w-[320px] lg:flex-none">
                    <div className="flex h-full flex-col justify-between rounded-[2rem] border border-l-admin-line/55 bg-l-admin-panel/90 p-5 shadow-[0_20px_70px_rgba(18,20,28,0.08)] backdrop-blur-sm dark:border-d-admin-line/60 dark:bg-d-admin-panel/90">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-l-admin-accent dark:text-d-admin-accent">
                                            Portfolio Desk
                                        </p>
                                        <h1 className="font-display text-4xl leading-none text-l-admin-ink dark:text-d-admin-ink">
                                            Admin
                                        </h1>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setTheme((currentTheme) =>
                                                currentTheme === "dark" ? "light" : "dark"
                                            )
                                        }
                                        className="rounded-full border border-l-admin-line/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-l-admin-ink transition hover:-translate-y-0.5 hover:border-l-admin-accent hover:text-l-admin-accent dark:border-d-admin-line/70 dark:text-d-admin-ink dark:hover:border-d-admin-accent dark:hover:text-d-admin-accent"
                                    >
                                        {theme === "dark" ? "Light" : "Dark"}
                                    </button>
                                </div>
                                <p className="max-w-sm text-sm leading-6 text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                                    A quiet editorial workspace for shaping the public portfolio with the same visual language, sharper tools, and clearer hierarchy.
                                </p>
                            </div>

                            <div className="rounded-[1.6rem] border border-l-admin-line/55 bg-white/50 p-4 dark:border-d-admin-line/60 dark:bg-white/5">
                                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-l-txt-subd-sec-def dark:text-d-txt-subd-prim-def">
                                    Signed in
                                </p>
                                <p className="mt-3 font-display text-3xl leading-none text-l-admin-ink dark:text-d-admin-ink">
                                    {identity.username}
                                </p>
                                <p className="mt-2 text-sm text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                                    Content curator with full editing access.
                                </p>
                            </div>

                            <nav className="space-y-2">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        end={item.to === "/admin"}
                                        className={({ isActive }) =>
                                            `group flex items-center justify-between rounded-[1.2rem] border px-4 py-3 text-sm transition ${
                                                isActive
                                                    ? "border-l-admin-accent/50 bg-l-admin-accent/10 text-l-admin-ink dark:border-d-admin-accent/50 dark:bg-d-admin-accent/12 dark:text-d-admin-ink"
                                                    : "border-transparent text-l-txt-subd-prim-def hover:border-l-admin-line/55 hover:bg-white/50 hover:text-l-admin-ink dark:text-d-txt-subd-prim-def dark:hover:border-d-admin-line/60 dark:hover:bg-white/5 dark:hover:text-d-admin-ink"
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <span className="font-medium uppercase tracking-[0.18em]">
                                                    {item.short}
                                                </span>
                                                <span
                                                    className={`text-[0.65rem] uppercase tracking-[0.32em] ${
                                                        isActive
                                                            ? "text-l-admin-accent dark:text-d-admin-accent"
                                                            : "text-l-txt-subd-sec-def group-hover:text-l-admin-accent dark:text-d-txt-subd-prim-def dark:group-hover:text-d-admin-accent"
                                                    }`}
                                                >
                                                    {item.label}
                                                </span>
                                            </>
                                        )}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>

                        <div className="mt-8 flex items-center justify-between gap-4 border-t border-l-admin-line/45 pt-5 dark:border-d-admin-line/50">
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-full border border-l-admin-line/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-l-admin-ink transition hover:-translate-y-0.5 hover:border-l-admin-accent hover:text-l-admin-accent dark:border-d-admin-line/70 dark:text-d-admin-ink dark:hover:border-d-admin-accent dark:hover:text-d-admin-accent"
                            >
                                Logout
                            </button>
                            <a
                                href="/"
                                className="text-xs font-semibold uppercase tracking-[0.22em] text-l-txt-subd-sec-def transition hover:text-l-admin-accent dark:text-d-txt-subd-prim-def dark:hover:text-d-admin-accent"
                            >
                                View site
                            </a>
                        </div>
                    </div>
                </aside>

                <main className="min-w-0 flex-1 animate-admin-fade">
                    <div className="rounded-[2rem] border border-l-admin-line/45 bg-l-bg-def/70 p-4 backdrop-blur-sm dark:border-d-admin-line/50 dark:bg-d-bg-def/70 sm:p-6 lg:h-[calc(100vh-2rem)] lg:overflow-hidden lg:p-8">
                        <div className="mb-5 flex items-center justify-between gap-4 border-b border-l-admin-line/35 pb-4 dark:border-d-admin-line/40">
                            <div>
                                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-l-admin-accent dark:text-d-admin-accent">
                                    Active desk
                                </p>
                                <p className="mt-1 text-sm text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                                    {navigation.state === "loading"
                                        ? "Loading the next section..."
                                        : "Everything here updates the same portfolio your visitors see."}
                                </p>
                            </div>
                            <div className="rounded-full border border-l-admin-line/45 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-l-txt-subd-sec-def dark:border-d-admin-line/50 dark:text-d-txt-subd-prim-def">
                                {navigation.state === "loading" ? "Working" : "Live"}
                            </div>
                        </div>

                        <div className="h-full overflow-auto pr-1 scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-l-admin-accent/70 dark:scrollbar-thumb-d-admin-accent/70">
                            <Outlet
                                context={{
                                    isDark: theme === "dark",
                                    username: identity.username,
                                    logout: handleLogout,
                                }}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
