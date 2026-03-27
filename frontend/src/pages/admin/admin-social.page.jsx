import { useEffect, useState } from "react";
import AdminField from "../../components/admin/AdminField.component";
import AdminNotice from "../../components/admin/AdminNotice.component";
import AdminPageHeader from "../../components/admin/AdminPageHeader.component";
import AdminPanel from "../../components/admin/AdminPanel.component";
import {
    createSocialMediaAdmin,
    deleteSocialMediaAdmin,
    updateSocialMediaAdmin,
} from "../../utils/api/admin-content-api.util";
import { getSocialMediaLinks } from "../../utils/api/social-media-api.util";

const blankEntry = { platform: "", link: "" };

const AdminSocialPage = () => {
    const [links, setLinks] = useState([]);
    const [form, setForm] = useState(blankEntry);
    const [editingId, setEditingId] = useState(null);
    const [editingForm, setEditingForm] = useState(blankEntry);
    const [status, setStatus] = useState({ tone: "info", message: "" });

    const loadLinks = async () => {
        const data = await getSocialMediaLinks();
        setLinks(data);
    };

    useEffect(() => {
        const initialize = async () => {
            try {
                await loadLinks();
            } catch (error) {
                setStatus({ tone: "error", message: error.message ?? "Unable to load links." });
            }
        };

        initialize();
    }, []);

    const createLink = async (event) => {
        event.preventDefault();

        try {
            await createSocialMediaAdmin(form);
            setForm(blankEntry);
            setStatus({ tone: "success", message: "Social link added." });
            await loadLinks();
        } catch (error) {
            setStatus({ tone: "error", message: error.message ?? "Unable to add social link." });
        }
    };

    const saveLink = async (id) => {
        try {
            await updateSocialMediaAdmin(id, editingForm);
            setEditingId(null);
            setEditingForm(blankEntry);
            setStatus({ tone: "success", message: "Social link updated." });
            await loadLinks();
        } catch (error) {
            setStatus({ tone: "error", message: error.message ?? "Unable to update social link." });
        }
    };

    const removeLink = async (id) => {
        try {
            await deleteSocialMediaAdmin(id);
            setStatus({ tone: "success", message: "Social link deleted." });
            await loadLinks();
        } catch (error) {
            setStatus({ tone: "error", message: error.message ?? "Unable to remove social link." });
        }
    };

    return (
        <div className="space-y-6 pb-10">
            <AdminPageHeader
                eyebrow="Social"
                title="Keep the outward links precise."
                description="Social media links are small, but they shape trust. This editor keeps platform labels and URLs clean, legible, and easy to update."
            />

            <div className="grid gap-6 xl:grid-cols-[0.42fr_0.58fr]">
                <AdminPanel tone="accent" className="p-6 sm:p-8">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                        New link
                    </p>
                    <form className="mt-5 space-y-4" onSubmit={createLink}>
                        <AdminNotice message={status.message} tone={status.tone} />
                        <AdminField
                            label="Platform"
                            value={form.platform}
                            onChange={(event) =>
                                setForm((currentForm) => ({
                                    ...currentForm,
                                    platform: event.target.value,
                                }))
                            }
                            placeholder="GitHub"
                            required
                        />
                        <AdminField
                            label="URL"
                            type="url"
                            value={form.link}
                            onChange={(event) =>
                                setForm((currentForm) => ({
                                    ...currentForm,
                                    link: event.target.value,
                                }))
                            }
                            placeholder="https://..."
                            required
                        />
                        <button
                            type="submit"
                            className="rounded-full bg-l-admin-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:-translate-y-0.5 hover:bg-l-ic-prim-def dark:bg-d-admin-accent dark:text-d-bg-def dark:hover:bg-d-ic-prim-def"
                        >
                            Add link
                        </button>
                    </form>
                </AdminPanel>

                <AdminPanel className="p-6 sm:p-8">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                        Current links
                    </p>
                    <div className="mt-5 space-y-3">
                        {links.map((link) => (
                            <div
                                key={link.id}
                                className="rounded-[1.4rem] border border-l-admin-line/45 bg-white/50 p-4 dark:border-d-admin-line/50 dark:bg-white/5"
                            >
                                {editingId === link.id ? (
                                    <div className="space-y-3">
                                        <AdminField
                                            label="Platform"
                                            value={editingForm.platform}
                                            onChange={(event) =>
                                                setEditingForm((currentForm) => ({
                                                    ...currentForm,
                                                    platform: event.target.value,
                                                }))
                                            }
                                        />
                                        <AdminField
                                            label="URL"
                                            type="url"
                                            value={editingForm.link}
                                            onChange={(event) =>
                                                setEditingForm((currentForm) => ({
                                                    ...currentForm,
                                                    link: event.target.value,
                                                }))
                                            }
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => saveLink(link.id)}
                                                className="rounded-full bg-l-admin-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white dark:bg-d-admin-accent dark:text-d-bg-def"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setEditingId(null)}
                                                className="rounded-full border border-l-admin-line/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] dark:border-d-admin-line/60"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <p className="font-display text-3xl text-l-admin-ink dark:text-d-admin-ink">
                                                {link.platform}
                                            </p>
                                            <a
                                                href={link.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mt-2 block break-all text-sm text-l-txt-subd-prim-def underline decoration-l-admin-accent/35 underline-offset-4 dark:text-d-txt-subd-prim-def dark:decoration-d-admin-accent/35"
                                            >
                                                {link.link}
                                            </a>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditingId(link.id);
                                                    setEditingForm({
                                                        platform: link.platform,
                                                        link: link.link,
                                                    });
                                                }}
                                                className="rounded-full border border-l-admin-line/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition hover:border-l-admin-accent hover:text-l-admin-accent dark:border-d-admin-line/60 dark:hover:border-d-admin-accent dark:hover:text-d-admin-accent"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeLink(link.id)}
                                                className="rounded-full border border-red-500/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-700 dark:text-red-300"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </AdminPanel>
            </div>
        </div>
    );
};

export default AdminSocialPage;
