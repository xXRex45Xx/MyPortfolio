import { useMemo, useState } from "react";
import AdminNotice from "../../components/admin/AdminNotice.component";
import AdminPageHeader from "../../components/admin/AdminPageHeader.component";
import AdminPanel from "../../components/admin/AdminPanel.component";
import {
    uploadProfilePictureAdmin,
    uploadResumeAdmin,
} from "../../utils/api/admin-content-api.util";
import serverAddress from "../../utils/api/server-address.util";

const AdminAssetsPage = () => {
    const [resumeFile, setResumeFile] = useState(null);
    const [profileFile, setProfileFile] = useState(null);
    const [status, setStatus] = useState({ tone: "info", message: "" });
    const [busy, setBusy] = useState({ resume: false, profile: false });

    const profilePreview = useMemo(
        () => (profileFile ? URL.createObjectURL(profileFile) : `${serverAddress}/images/profile.jpg`),
        [profileFile]
    );

    const uploadResume = async (event) => {
        event.preventDefault();

        if (!resumeFile) {
            setStatus({ tone: "error", message: "Choose a PDF file before uploading the resume." });
            return;
        }

        setBusy((currentBusy) => ({ ...currentBusy, resume: true }));

        try {
            await uploadResumeAdmin(resumeFile);
            setStatus({ tone: "success", message: "Resume uploaded to the live portfolio." });
            setResumeFile(null);
        } catch (error) {
            setStatus({ tone: "error", message: error.message ?? "Unable to upload resume." });
        } finally {
            setBusy((currentBusy) => ({ ...currentBusy, resume: false }));
        }
    };

    const uploadProfile = async (event) => {
        event.preventDefault();

        if (!profileFile) {
            setStatus({ tone: "error", message: "Choose an image before uploading the portrait." });
            return;
        }

        setBusy((currentBusy) => ({ ...currentBusy, profile: true }));

        try {
            await uploadProfilePictureAdmin(profileFile);
            setStatus({ tone: "success", message: "Profile picture updated on the live portfolio." });
        } catch (error) {
            setStatus({ tone: "error", message: error.message ?? "Unable to upload profile image." });
        } finally {
            setBusy((currentBusy) => ({ ...currentBusy, profile: false }));
        }
    };

    return (
        <div className="space-y-6 pb-10">
            <AdminPageHeader
                eyebrow="Assets"
                title="Update the portfolio files without breaking the mood."
                description="The backend already serves a public resume and profile image. This screen focuses on calm upload workflows, clear file rules, and visible destination paths."
            />

            <AdminNotice message={status.message} tone={status.tone} />

            <div className="grid gap-6 xl:grid-cols-2">
                <AdminPanel tone="accent" className="p-6 sm:p-8">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                        Resume
                    </p>
                    <p className="mt-3 text-sm leading-6 text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                        Accepts PDF files up to 30MB. The backend publishes it at `/api/files/resume`.
                    </p>
                    <form className="mt-5 space-y-4" onSubmit={uploadResume}>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(event) => setResumeFile(event.target.files?.[0] ?? null)}
                            className="w-full rounded-[1.3rem] border border-dashed border-l-admin-line/60 bg-white/50 px-4 py-5 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-l-admin-accent file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.2em] file:text-white dark:border-d-admin-line/70 dark:bg-white/5 dark:file:bg-d-admin-accent dark:file:text-d-bg-def"
                        />
                        <button
                            type="submit"
                            disabled={busy.resume}
                            className="rounded-full bg-l-admin-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:-translate-y-0.5 hover:bg-l-ic-prim-def disabled:cursor-not-allowed disabled:opacity-70 dark:bg-d-admin-accent dark:text-d-bg-def dark:hover:bg-d-ic-prim-def"
                        >
                            {busy.resume ? "Uploading..." : "Upload resume"}
                        </button>
                    </form>
                </AdminPanel>

                <AdminPanel className="p-6 sm:p-8">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                        Portrait
                    </p>
                    <p className="mt-3 text-sm leading-6 text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                        Accepts JPG or PNG files up to 10MB. The public site reads from `/images/profile.jpg`.
                    </p>
                    <div className="mt-5 overflow-hidden rounded-[1.8rem] border border-l-admin-line/45 bg-white/50 dark:border-d-admin-line/50 dark:bg-white/5">
                        <img src={profilePreview} alt="Profile preview" className="h-72 w-full object-cover" />
                    </div>
                    <form className="mt-5 space-y-4" onSubmit={uploadProfile}>
                        <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png"
                            onChange={(event) => setProfileFile(event.target.files?.[0] ?? null)}
                            className="w-full rounded-[1.3rem] border border-dashed border-l-admin-line/60 bg-white/50 px-4 py-5 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-l-admin-accent file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.2em] file:text-white dark:border-d-admin-line/70 dark:bg-white/5 dark:file:bg-d-admin-accent dark:file:text-d-bg-def"
                        />
                        <button
                            type="submit"
                            disabled={busy.profile}
                            className="rounded-full bg-l-admin-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:-translate-y-0.5 hover:bg-l-ic-prim-def disabled:cursor-not-allowed disabled:opacity-70 dark:bg-d-admin-accent dark:text-d-bg-def dark:hover:bg-d-ic-prim-def"
                        >
                            {busy.profile ? "Uploading..." : "Upload portrait"}
                        </button>
                    </form>
                </AdminPanel>
            </div>
        </div>
    );
};

export default AdminAssetsPage;
