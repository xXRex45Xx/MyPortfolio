import { useEffect, useState } from "react";
import AdminField from "../../components/admin/AdminField.component";
import AdminNotice from "../../components/admin/AdminNotice.component";
import AdminPageHeader from "../../components/admin/AdminPageHeader.component";
import AdminPanel from "../../components/admin/AdminPanel.component";
import {
    createSkillAdmin,
    deleteSkillAdmin,
    updateSkillAdmin,
} from "../../utils/api/admin-content-api.util";
import { getSkills } from "../../utils/api/skill-api.util";

const AdminSkillsPage = () => {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingValue, setEditingValue] = useState("");
    const [status, setStatus] = useState({ tone: "info", message: "" });

    const loadSkills = async () => {
        const data = await getSkills();
        setSkills(data);
    };

    useEffect(() => {
        const initialize = async () => {
            try {
                await loadSkills();
            } catch (error) {
                setStatus({ tone: "error", message: error.message ?? "Unable to load skills." });
            }
        };

        initialize();
    }, []);

    const createSkill = async (event) => {
        event.preventDefault();

        try {
            await createSkillAdmin({ name: newSkill.trim() });
            setNewSkill("");
            setStatus({ tone: "success", message: "Skill added." });
            await loadSkills();
        } catch (error) {
            setStatus({ tone: "error", message: error.message ?? "Unable to add skill." });
        }
    };

    const saveSkill = async (id) => {
        try {
            await updateSkillAdmin(id, { name: editingValue.trim() });
            setEditingId(null);
            setEditingValue("");
            setStatus({ tone: "success", message: "Skill updated." });
            await loadSkills();
        } catch (error) {
            setStatus({ tone: "error", message: error.message ?? "Unable to update skill." });
        }
    };

    const removeSkill = async (id) => {
        try {
            await deleteSkillAdmin(id);
            setStatus({ tone: "success", message: "Skill removed." });
            await loadSkills();
        } catch (error) {
            setStatus({ tone: "error", message: error.message ?? "Unable to delete skill." });
        }
    };

    return (
        <div className="space-y-6 pb-10">
            <AdminPageHeader
                eyebrow="Skills"
                title="Maintain the capability wall."
                description="Skills read as signals of range and focus on the public site. This editor keeps them quick to adjust without losing the portfolio&apos;s polished rhythm."
            />

            <div className="grid gap-6 xl:grid-cols-[0.42fr_0.58fr]">
                <AdminPanel tone="accent" className="p-6 sm:p-8">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                        Add skill
                    </p>
                    <form className="mt-5 space-y-4" onSubmit={createSkill}>
                        <AdminNotice message={status.message} tone={status.tone} />
                        <AdminField
                            label="Skill label"
                            value={newSkill}
                            onChange={(event) => setNewSkill(event.target.value)}
                            placeholder="React"
                            required
                        />
                        <button
                            type="submit"
                            className="rounded-full bg-l-admin-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:-translate-y-0.5 hover:bg-l-ic-prim-def dark:bg-d-admin-accent dark:text-d-bg-def dark:hover:bg-d-ic-prim-def"
                        >
                            Add skill
                        </button>
                    </form>
                </AdminPanel>

                <AdminPanel className="p-6 sm:p-8">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                        Current skills
                    </p>
                    <div className="mt-5 grid gap-3">
                        {skills.map((skill) => (
                            <div
                                key={skill.id}
                                className="rounded-[1.4rem] border border-l-admin-line/45 bg-white/50 p-4 dark:border-d-admin-line/50 dark:bg-white/5"
                            >
                                {editingId === skill.id ? (
                                    <div className="flex flex-col gap-3 sm:flex-row">
                                        <input
                                            value={editingValue}
                                            onChange={(event) => setEditingValue(event.target.value)}
                                            className="flex-1 rounded-full border border-l-admin-line/55 bg-white/70 px-4 py-2.5 text-sm outline-hidden dark:border-d-admin-line/60 dark:bg-white/5"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => saveSkill(skill.id)}
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
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="font-display text-3xl text-l-admin-ink dark:text-d-admin-ink">
                                            {skill.name}
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditingId(skill.id);
                                                    setEditingValue(skill.name);
                                                }}
                                                className="rounded-full border border-l-admin-line/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition hover:border-l-admin-accent hover:text-l-admin-accent dark:border-d-admin-line/60 dark:hover:border-d-admin-accent dark:hover:text-d-admin-accent"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeSkill(skill.id)}
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

export default AdminSkillsPage;
