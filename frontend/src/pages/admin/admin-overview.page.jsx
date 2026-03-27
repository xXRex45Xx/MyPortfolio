import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import AdminNotice from "../../components/admin/AdminNotice.component";
import AdminPageHeader from "../../components/admin/AdminPageHeader.component";
import AdminPanel from "../../components/admin/AdminPanel.component";
import { getAdminOverview } from "../../utils/api/admin-content-api.util";

const quickLinks = [
    { to: "/admin/profile", label: "Refine profile", copy: "Update name, role, contact details, and bio." },
    { to: "/admin/projects", label: "Curate projects", copy: "Maintain the public case-study archive and images." },
    { to: "/admin/assets", label: "Refresh assets", copy: "Upload a new resume or portrait for the live site." },
];

const AdminOverviewPage = () => {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState({ tone: "info", message: "" });

    useEffect(() => {
        const loadOverview = async () => {
            try {
                const overview = await getAdminOverview();
                setData(overview);
            } catch (error) {
                setStatus({
                    tone: "error",
                    message: error.message ?? "Unable to load overview data.",
                });
            }
        };

        loadOverview();
    }, []);

    const metrics = useMemo(() => {
        if (!data) {
            return [];
        }

        return [
            ["Projects", data.projects.length, "Public work entries"],
            ["Skills", data.skills.length, "Visible capability tags"],
            ["Social", data.socialMediaLinks.length, "Connected platforms"],
            ["Profile", data.myInfo?.name ? "Ready" : "Draft", "Hero profile status"],
        ];
    }, [data]);

    return (
        <div className="space-y-6 pb-10">
            <AdminPageHeader
                eyebrow="Overview"
                title="A portfolio dashboard that reads like a curator's desk."
                description="This control room keeps the public site and the editorial tools visually connected: same calm palette, same measured typography, more structure and command."
                aside={
                    <div className="rounded-[1.5rem] border border-l-admin-line/50 bg-l-admin-panel/70 px-5 py-4 dark:border-d-admin-line/50 dark:bg-d-admin-panel/70">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                            Workspace mood
                        </p>
                        <p className="mt-2 font-display text-3xl text-l-admin-ink dark:text-d-admin-ink">
                            Calm control
                        </p>
                    </div>
                }
            />

            <AdminNotice message={status.message} tone={status.tone} />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {metrics.length
                    ? metrics.map(([label, value, copy]) => (
                          <AdminPanel key={label} className="p-5">
                              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                                  {label}
                              </p>
                              <p className="mt-3 font-display text-5xl leading-none text-l-admin-ink dark:text-d-admin-ink">
                                  {value}
                              </p>
                              <p className="mt-3 text-sm leading-6 text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                                  {copy}
                              </p>
                          </AdminPanel>
                      ))
                    : Array.from({ length: 4 }).map((_, index) => (
                          <AdminPanel key={index} className="min-h-40 animate-pulse p-5" />
                      ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
                <AdminPanel tone="accent" className="p-6 sm:p-8">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                        Public portrait
                    </p>
                    <div className="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                        <div className="rounded-[1.8rem] border border-l-admin-line/45 bg-white/60 p-5 dark:border-d-admin-line/50 dark:bg-white/5">
                            <p className="text-sm uppercase tracking-[0.18em] text-l-txt-subd-sec-def dark:text-d-txt-subd-prim-def">
                                Featured identity
                            </p>
                            <h2 className="mt-4 font-display text-5xl leading-none text-l-admin-ink dark:text-d-admin-ink">
                                {data?.myInfo?.name || "Your name here"}
                            </h2>
                            <p className="mt-3 text-lg text-l-admin-accent dark:text-d-admin-accent">
                                {data?.myInfo?.title || "A title still waiting for its final edit"}
                            </p>
                            <p className="mt-5 text-sm leading-7 text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                                {data?.myInfo?.aboutMe ||
                                    "The live profile is still sparse. Start by shaping the opening biography so the public landing page feels intentional from the first line."}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="rounded-[1.8rem] border border-l-admin-line/45 bg-l-bg-fill-def/80 p-5 dark:border-d-admin-line/50 dark:bg-white/5">
                                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-l-admin-accent dark:text-d-admin-accent">
                                    Contact surface
                                </p>
                                <dl className="mt-4 space-y-3 text-sm text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                                    <div className="flex items-start justify-between gap-4">
                                        <dt>Email</dt>
                                        <dd className="text-right text-l-admin-ink dark:text-d-admin-ink">
                                            {data?.myInfo?.email || "Not set"}
                                        </dd>
                                    </div>
                                    <div className="flex items-start justify-between gap-4">
                                        <dt>Phone</dt>
                                        <dd className="text-right text-l-admin-ink dark:text-d-admin-ink">
                                            {data?.myInfo?.phone || "Not set"}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            <div className="rounded-[1.8rem] border border-l-admin-line/45 bg-l-bg-fill-def/80 p-5 dark:border-d-admin-line/50 dark:bg-white/5">
                                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-l-admin-accent dark:text-d-admin-accent">
                                    Editing note
                                </p>
                                <p className="mt-4 text-sm leading-6 text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                                    The backend already supports all core CRUD actions. The admin interface mainly needs to normalize backend errors and make file workflows easier to trust.
                                </p>
                            </div>
                        </div>
                    </div>
                </AdminPanel>

                <div className="space-y-6">
                    <AdminPanel className="p-6">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                            Quick links
                        </p>
                        <div className="mt-4 space-y-3">
                            {quickLinks.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="block rounded-[1.5rem] border border-l-admin-line/45 bg-white/50 p-4 transition hover:-translate-y-1 hover:border-l-admin-accent/45 dark:border-d-admin-line/50 dark:bg-white/5 dark:hover:border-d-admin-accent/45"
                                >
                                    <p className="font-display text-2xl text-l-admin-ink dark:text-d-admin-ink">
                                        {item.label}
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                                        {item.copy}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </AdminPanel>

                    <AdminPanel className="p-6">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                            Operational notes
                        </p>
                        <ul className="mt-4 space-y-3 text-sm leading-6 text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                            <li>Project forms need `multipart/form-data` and repeat `keyFeatures` values.</li>
                            <li>Backend error shapes vary, so this frontend normalizes them before display.</li>
                            <li>Unauthorized API responses clear the saved token and send you back to login.</li>
                        </ul>
                    </AdminPanel>
                </div>
            </div>
        </div>
    );
};

export default AdminOverviewPage;
