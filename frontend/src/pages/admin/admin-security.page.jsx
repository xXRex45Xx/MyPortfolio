import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import AdminField from "../../components/admin/AdminField.component";
import AdminNotice from "../../components/admin/AdminNotice.component";
import AdminPageHeader from "../../components/admin/AdminPageHeader.component";
import AdminPanel from "../../components/admin/AdminPanel.component";
import { resetAdminPassword } from "../../utils/api/admin-auth-api.util";

const AdminSecurityPage = () => {
    const { username } = useOutletContext();
    const [form, setForm] = useState({
        username,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [status, setStatus] = useState({ tone: "info", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (event) => {
        const { name, value } = event.target;
        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            setStatus({ tone: "error", message: "New password and confirmation must match." });
            return;
        }

        setIsSubmitting(true);
        setStatus({ tone: "info", message: "" });

        try {
            await resetAdminPassword(form);
            setStatus({ tone: "success", message: "Password updated successfully." });
            setForm((currentForm) => ({
                ...currentForm,
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            }));
        } catch (error) {
            setStatus({ tone: "error", message: error.message ?? "Unable to update password." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 pb-10">
            <AdminPageHeader
                eyebrow="Security"
                title="Keep credentials current."
                description="The backend exposes a password reset flow using the current username and password. This screen wraps it in stronger guidance and cleaner feedback."
            />

            <div className="grid gap-6 xl:grid-cols-[0.62fr_0.38fr]">
                <AdminPanel tone="accent" className="p-6 sm:p-8">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <AdminNotice message={status.message} tone={status.tone} />
                        <AdminField
                            label="Username"
                            name="username"
                            value={form.username}
                            onChange={updateField}
                            required
                        />
                        <AdminField
                            label="Current password"
                            type="password"
                            name="oldPassword"
                            value={form.oldPassword}
                            onChange={updateField}
                            autoComplete="current-password"
                            required
                        />
                        <AdminField
                            label="New password"
                            type="password"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={updateField}
                            hint="Backend requires at least 8 characters."
                            autoComplete="new-password"
                            required
                        />
                        <AdminField
                            label="Confirm new password"
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={updateField}
                            autoComplete="new-password"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-full bg-l-admin-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:-translate-y-0.5 hover:bg-l-ic-prim-def disabled:cursor-not-allowed disabled:opacity-70 dark:bg-d-admin-accent dark:text-d-bg-def dark:hover:bg-d-ic-prim-def"
                        >
                            {isSubmitting ? "Updating..." : "Update password"}
                        </button>
                    </form>
                </AdminPanel>

                <AdminPanel className="p-6">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                        Security note
                    </p>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                        <li>This backend does not expose refresh tokens, so expired sessions require signing in again.</li>
                        <li>Password reset is verified with the current password, even though the endpoint itself is not JWT-protected.</li>
                        <li>After changing credentials, keep the new values stored somewhere secure outside the app.</li>
                    </ul>
                </AdminPanel>
            </div>
        </div>
    );
};

export default AdminSecurityPage;
