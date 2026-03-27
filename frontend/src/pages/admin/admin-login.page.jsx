import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAdmin } from "../../utils/api/admin-auth-api.util";
import {
    getStoredTheme,
    saveAdminToken,
    saveStoredTheme,
} from "../../utils/auth/admin-token.util";
import AdminNotice from "../../components/admin/AdminNotice.component";
import AdminField from "../../components/admin/AdminField.component";
import AdminPanel from "../../components/admin/AdminPanel.component";

const getInitialTheme = () => {
    const storedTheme = getStoredTheme();

    if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState(getInitialTheme);
    const [form, setForm] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (event) => {
        const { name, value } = event.target;
        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    };

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        saveStoredTheme(nextTheme);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const data = await loginAdmin(form);
            saveAdminToken(data.token);
            navigate("/admin");
        } catch (error) {
            setErrorMessage(error.message ?? "Unable to sign in.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main
            data-theme={theme}
            className="relative min-h-screen overflow-hidden bg-l-bg-surf-prim-def text-l-admin-ink transition-colors dark:bg-d-bg-surf-prim-def dark:text-d-admin-ink"
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_top_left,_rgba(61,90,128,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(123,90,52,0.14),_transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(239,203,104,0.1),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(61,90,128,0.12),_transparent_30%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(123,90,52,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(123,90,52,0.06)_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(to_right,rgba(239,203,104,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(239,203,104,0.05)_1px,transparent_1px)]" />
            </div>

            <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between gap-10 px-4 py-6 sm:px-6 lg:px-10">
                <div className="flex items-center justify-between">
                    <Link
                        to="/"
                        className="text-xs font-semibold uppercase tracking-[0.34em] text-l-admin-accent transition hover:text-l-ic-prim-def dark:text-d-admin-accent dark:hover:text-d-ic-prim-def"
                    >
                        Back to portfolio
                    </Link>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="rounded-full border border-l-admin-line/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition hover:-translate-y-0.5 hover:border-l-admin-accent hover:text-l-admin-accent dark:border-d-admin-line/60 dark:hover:border-d-admin-accent dark:hover:text-d-admin-accent"
                    >
                        {theme === "dark" ? "Light mode" : "Dark mode"}
                    </button>
                </div>

                <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <section className="animate-admin-rise space-y-8">
                        <div className="space-y-4">
                            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-l-admin-accent dark:text-d-admin-accent">
                                Editorial access
                            </p>
                            <h1 className="max-w-3xl font-display text-6xl leading-[0.92] text-l-admin-ink dark:text-d-admin-ink sm:text-7xl">
                                Shape the portfolio from the same world it belongs to.
                            </h1>
                            <p className="max-w-xl text-base leading-7 text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                                This admin space inherits the portfolio&apos;s calm confidence, then tightens it into a studio for updates, uploads, and content curation.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {[
                                ["Profile", "Refine the public introduction and contact surface."],
                                ["Projects", "Edit the work archive with better structure and faster updates."],
                                ["Assets", "Refresh the resume and portrait without leaving the workspace."],
                            ].map(([title, copy]) => (
                                <AdminPanel key={title} className="p-5">
                                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                                        {title}
                                    </p>
                                    <p className="mt-3 text-sm leading-6 text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                                        {copy}
                                    </p>
                                </AdminPanel>
                            ))}
                        </div>
                    </section>

                    <AdminPanel tone="accent" className="animate-admin-rise p-6 sm:p-8 lg:p-10">
                        <div className="space-y-6">
                            <div>
                                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-l-admin-accent dark:text-d-admin-accent">
                                    Sign in
                                </p>
                                <h2 className="mt-3 font-display text-4xl text-l-admin-ink dark:text-d-admin-ink">
                                    Portfolio Desk Access
                                </h2>
                                <p className="mt-3 text-sm leading-6 text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                                    Use your admin credentials to manage profile content, projects, social links, and uploaded files.
                                </p>
                            </div>

                            <AdminNotice message={errorMessage} tone="error" />

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <AdminField
                                    label="Username"
                                    name="username"
                                    value={form.username}
                                    onChange={updateField}
                                    placeholder="admin"
                                    autoComplete="username"
                                    required
                                />
                                <AdminField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={updateField}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-full bg-l-admin-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:-translate-y-0.5 hover:bg-l-ic-prim-def disabled:cursor-not-allowed disabled:opacity-70 dark:bg-d-admin-accent dark:text-d-bg-def dark:hover:bg-d-ic-prim-def"
                                >
                                    {isSubmitting ? "Entering..." : "Enter Admin Desk"}
                                </button>
                            </form>
                        </div>
                    </AdminPanel>
                </div>
            </div>
        </main>
    );
};

export default AdminLoginPage;
