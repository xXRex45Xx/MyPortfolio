import { useEffect, useState } from "react";
import AdminField, { AdminTextarea } from "../../components/admin/AdminField.component";
import AdminNotice from "../../components/admin/AdminNotice.component";
import AdminPageHeader from "../../components/admin/AdminPageHeader.component";
import AdminPanel from "../../components/admin/AdminPanel.component";
import { getMyInfo } from "../../utils/api/my-info-api.util";
import { updateMyInfoAdmin } from "../../utils/api/admin-content-api.util";

const emptyProfile = {
    name: "",
    title: "",
    email: "",
    phone: "",
    aboutMe: "",
};

const AdminProfilePage = () => {
    const [form, setForm] = useState(emptyProfile);
    const [status, setStatus] = useState({ tone: "info", message: "" });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const profile = await getMyInfo();
                setForm({
                    name: profile?.name ?? "",
                    title: profile?.title ?? "",
                    email: profile?.email ?? "",
                    phone: profile?.phone ?? "",
                    aboutMe: profile?.aboutMe ?? "",
                });
            } catch (error) {
                setStatus({ tone: "error", message: error.message ?? "Unable to load profile." });
            }
        };

        loadProfile();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus({ tone: "info", message: "" });
        setIsSaving(true);

        try {
            await updateMyInfoAdmin(form);
            setStatus({ tone: "success", message: "Profile details updated for the live portfolio." });
        } catch (error) {
            setStatus({ tone: "error", message: error.message ?? "Unable to save profile." });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 pb-10">
            <AdminPageHeader
                eyebrow="Profile"
                title="Edit the opening impression."
                description="This section controls the public identity block visitors meet first: name, role, contact details, and the short biography that sets the tone for the whole portfolio."
            />

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <AdminPanel tone="accent" className="p-6 sm:p-8">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <AdminNotice message={status.message} tone={status.tone} />

                        <div className="grid gap-5 md:grid-cols-2">
                            <AdminField
                                label="Full name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Esrom Tadesse"
                                required
                            />
                            <AdminField
                                label="Title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Software Engineer"
                                required
                            />
                            <AdminField
                                label="Email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                required
                            />
                            <AdminField
                                label="Phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+1 ..."
                                required
                            />
                        </div>

                        <AdminTextarea
                            label="About"
                            name="aboutMe"
                            value={form.aboutMe}
                            onChange={handleChange}
                            placeholder="Write a confident, precise introduction."
                            required
                        />

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="rounded-full bg-l-admin-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:-translate-y-0.5 hover:bg-l-ic-prim-def disabled:cursor-not-allowed disabled:opacity-70 dark:bg-d-admin-accent dark:text-d-bg-def dark:hover:bg-d-ic-prim-def"
                        >
                            {isSaving ? "Saving..." : "Save profile"}
                        </button>
                    </form>
                </AdminPanel>

                <div className="space-y-6">
                    <AdminPanel className="p-6 sm:p-8">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                            Live preview
                        </p>
                        <div className="mt-5 rounded-[1.8rem] border border-l-admin-line/45 bg-white/55 p-6 dark:border-d-admin-line/50 dark:bg-white/5">
                            <p className="text-sm uppercase tracking-[0.18em] text-l-txt-subd-sec-def dark:text-d-txt-subd-prim-def">
                                Public identity block
                            </p>
                            <h2 className="mt-4 font-display text-5xl leading-none text-l-admin-ink dark:text-d-admin-ink">
                                {form.name || "Your name"}
                            </h2>
                            <p className="mt-3 text-xl text-l-admin-accent dark:text-d-admin-accent">
                                {form.title || "Your title"}
                            </p>
                            <p className="mt-6 whitespace-pre-line text-sm leading-7 text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                                {form.aboutMe || "A short introduction will appear here as you write it."}
                            </p>
                        </div>
                    </AdminPanel>

                    <AdminPanel className="p-6">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                            Writing guidance
                        </p>
                        <ul className="mt-4 space-y-3 text-sm leading-6 text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                            <li>Lead with what you build and the kind of problems you like solving.</li>
                            <li>Keep the tone clear and direct so it matches the portfolio&apos;s understated visual style.</li>
                            <li>Use the title to sharpen positioning, then let the biography add nuance.</li>
                        </ul>
                    </AdminPanel>
                </div>
            </div>
        </div>
    );
};

export default AdminProfilePage;
