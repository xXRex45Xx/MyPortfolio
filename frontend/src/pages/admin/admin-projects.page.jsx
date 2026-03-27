import { useEffect, useMemo, useState } from "react";
import AdminField, { AdminTextarea } from "../../components/admin/AdminField.component";
import AdminNotice from "../../components/admin/AdminNotice.component";
import AdminPageHeader from "../../components/admin/AdminPageHeader.component";
import AdminPanel from "../../components/admin/AdminPanel.component";
import serverAddress from "../../utils/api/server-address.util";
import {
    createProjectAdmin,
    deleteProjectAdmin,
    getProjectAdmin,
    updateProjectAdmin,
} from "../../utils/api/admin-content-api.util";
import { getProjects } from "../../utils/api/project-api.util";

const emptyProject = {
    title: "",
    industry: "",
    shortDescription: "",
    description: "",
    endDate: "",
    keyFeatures: [],
    link: "",
    isSourceCode: false,
};

const AdminProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [selectedId, setSelectedId] = useState("new");
    const [form, setForm] = useState(emptyProject);
    const [featureInput, setFeatureInput] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [status, setStatus] = useState({ tone: "info", message: "" });
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const loadProjects = async () => {
        const nextProjects = await getProjects();
        setProjects(nextProjects);
        return nextProjects;
    };

    useEffect(() => {
        const initialize = async () => {
            try {
                await loadProjects();
            } catch (error) {
                setStatus({ tone: "error", message: error.message ?? "Unable to load projects." });
            }
        };

        initialize();
    }, []);

    const selectedSummary = useMemo(
        () => projects.find((project) => String(project.id) === String(selectedId)),
        [projects, selectedId]
    );

    const imagePreview = useMemo(() => {
        if (selectedImage) {
            return URL.createObjectURL(selectedImage);
        }

        if (selectedSummary?.imageUrl) {
            return `${serverAddress}${selectedSummary.imageUrl}`;
        }

        return "";
    }, [selectedImage, selectedSummary]);

    useEffect(() => {
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview, selectedImage]);

    const updateField = (event) => {
        const { name, value, type, checked } = event.target;
        setForm((currentForm) => ({
            ...currentForm,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const selectProject = async (projectId) => {
        setSelectedId(projectId);
        setSelectedImage(null);
        setStatus({ tone: "info", message: "" });

        if (projectId === "new") {
            setForm(emptyProject);
            return;
        }

        setIsLoading(true);

        try {
            const project = await getProjectAdmin(projectId);
            setForm({
                title: project.title,
                industry: project.industry,
                shortDescription: project.shortDescription,
                description: project.description,
                endDate: project.endDate.slice(0, 10),
                keyFeatures: project.keyFeatures ?? [],
                link: project.link,
                isSourceCode: project.isSourceCode,
            });
        } catch (error) {
            setStatus({ tone: "error", message: error.message ?? "Unable to load project details." });
        } finally {
            setIsLoading(false);
        }
    };

    const addFeature = () => {
        const nextFeature = featureInput.trim();

        if (!nextFeature) {
            return;
        }

        setForm((currentForm) => ({
            ...currentForm,
            keyFeatures: [...currentForm.keyFeatures, nextFeature],
        }));
        setFeatureInput("");
    };

    const removeFeature = (featureToRemove) => {
        setForm((currentForm) => ({
            ...currentForm,
            keyFeatures: currentForm.keyFeatures.filter((feature) => feature !== featureToRemove),
        }));
    };

    const buildFormData = () => {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("industry", form.industry);
        formData.append("shortDescription", form.shortDescription);
        formData.append("description", form.description);
        formData.append("endDate", form.endDate);
        formData.append("link", form.link);
        formData.append("isSourceCode", form.isSourceCode);
        form.keyFeatures.forEach((feature) => formData.append("keyFeatures", feature));

        if (selectedImage) {
            formData.append("image", selectedImage);
        }

        return formData;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus({ tone: "info", message: "" });
        setIsSaving(true);

        try {
            if (!form.keyFeatures.length) {
                throw { message: "Add at least one feature before saving the project." };
            }

            const formData = buildFormData();

            if (selectedId === "new") {
                if (!selectedImage) {
                    throw { message: "Project creation requires an image upload." };
                }

                await createProjectAdmin(formData);
                setStatus({ tone: "success", message: "Project created successfully." });
            } else {
                await updateProjectAdmin(selectedId, formData);
                setStatus({ tone: "success", message: "Project updated successfully." });
            }

            const nextProjects = await loadProjects();
            const nextSelectedId =
                selectedId === "new"
                    ? String(nextProjects.find((project) => project.title === form.title)?.id ?? "new")
                    : selectedId;
            await selectProject(nextSelectedId);
        } catch (error) {
            setStatus({ tone: "error", message: error.message ?? "Unable to save project." });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (selectedId === "new") {
            return;
        }

        const confirmed = window.confirm("Delete this project from the public portfolio?");

        if (!confirmed) {
            return;
        }

        try {
            await deleteProjectAdmin(selectedId);
            setStatus({ tone: "success", message: "Project deleted." });
            await loadProjects();
            await selectProject("new");
        } catch (error) {
            setStatus({ tone: "error", message: error.message ?? "Unable to delete project." });
        }
    };

    return (
        <div className="space-y-6 pb-10">
            <AdminPageHeader
                eyebrow="Projects"
                title="Curate the case-study archive."
                description="Projects are the visual backbone of the public site. This workspace balances a quick list view with a fuller editorial form, so updates still feel intentional instead of mechanical."
            />

            <div className="grid gap-6 xl:grid-cols-[0.42fr_0.58fr]">
                <AdminPanel className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                                Archive
                            </p>
                            <p className="mt-2 text-sm text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                                {projects.length} public entries
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => selectProject("new")}
                            className="rounded-full border border-l-admin-line/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition hover:-translate-y-0.5 hover:border-l-admin-accent hover:text-l-admin-accent dark:border-d-admin-line/60 dark:hover:border-d-admin-accent dark:hover:text-d-admin-accent"
                        >
                            New project
                        </button>
                    </div>

                    <div className="mt-5 space-y-3">
                        {projects.map((project) => (
                            <button
                                key={project.id}
                                type="button"
                                onClick={() => selectProject(project.id)}
                                className={`w-full rounded-[1.5rem] border p-4 text-left transition ${
                                    String(project.id) === String(selectedId)
                                        ? "border-l-admin-accent/45 bg-l-admin-accent/8 dark:border-d-admin-accent/45 dark:bg-d-admin-accent/10"
                                        : "border-l-admin-line/45 bg-white/45 hover:-translate-y-1 hover:border-l-admin-line/80 dark:border-d-admin-line/50 dark:bg-white/5 dark:hover:border-d-admin-line/80"
                                }`}
                            >
                                <p className="font-display text-2xl text-l-admin-ink dark:text-d-admin-ink">
                                    {project.title}
                                </p>
                                <p className="mt-2 text-sm leading-6 text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                                    {project.shortDescription}
                                </p>
                            </button>
                        ))}
                    </div>
                </AdminPanel>

                <AdminPanel tone="accent" className="p-6 sm:p-8">
                    <div className="space-y-5">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-l-admin-accent dark:text-d-admin-accent">
                                    Editor
                                </p>
                                <p className="mt-2 text-sm text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                                    {selectedId === "new" ? "Create a new featured project." : "Update a public project entry."}
                                </p>
                            </div>
                            {selectedId !== "new" ? (
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="rounded-full border border-red-500/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-red-700 transition hover:-translate-y-0.5 hover:bg-red-500/10 dark:text-red-300"
                                >
                                    Delete
                                </button>
                            ) : null}
                        </div>

                        <AdminNotice message={status.message} tone={status.tone} />

                        {isLoading ? (
                            <AdminPanel className="animate-pulse p-10" />
                        ) : (
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="grid gap-5 md:grid-cols-2">
                                    <AdminField label="Title" name="title" value={form.title} onChange={updateField} required />
                                    <AdminField label="Industry" name="industry" value={form.industry} onChange={updateField} required />
                                    <AdminField
                                        label="Completion date"
                                        type="date"
                                        name="endDate"
                                        value={form.endDate}
                                        onChange={updateField}
                                        required
                                    />
                                    <AdminField
                                        label="Destination link"
                                        type="url"
                                        name="link"
                                        value={form.link}
                                        onChange={updateField}
                                        required
                                    />
                                </div>

                                <AdminField
                                    label="Short description"
                                    name="shortDescription"
                                    value={form.shortDescription}
                                    onChange={updateField}
                                    required
                                />

                                <AdminTextarea
                                    label="Long description"
                                    name="description"
                                    value={form.description}
                                    onChange={updateField}
                                    required
                                />

                                <div className="space-y-3">
                                    <div className="flex items-end gap-3">
                                        <AdminField
                                            className="flex-1"
                                            label="Key features"
                                            value={featureInput}
                                            onChange={(event) => setFeatureInput(event.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter") {
                                                    event.preventDefault();
                                                    addFeature();
                                                }
                                            }}
                                            placeholder="React, analytics, dashboard, ..."
                                        />
                                        <button
                                            type="button"
                                            onClick={addFeature}
                                            className="rounded-full border border-l-admin-line/55 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition hover:-translate-y-0.5 hover:border-l-admin-accent hover:text-l-admin-accent dark:border-d-admin-line/60 dark:hover:border-d-admin-accent dark:hover:text-d-admin-accent"
                                        >
                                            Add
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {form.keyFeatures.map((feature) => (
                                            <button
                                                key={feature}
                                                type="button"
                                                onClick={() => removeFeature(feature)}
                                                className="rounded-full border border-l-admin-line/55 bg-white/55 px-3 py-1.5 text-sm transition hover:border-l-admin-accent hover:text-l-admin-accent dark:border-d-admin-line/60 dark:bg-white/5 dark:hover:border-d-admin-accent dark:hover:text-d-admin-accent"
                                            >
                                                {feature} x
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <label className="flex items-center gap-3 rounded-[1.2rem] border border-l-admin-line/45 bg-white/45 px-4 py-3 text-sm dark:border-d-admin-line/50 dark:bg-white/5">
                                    <input
                                        type="checkbox"
                                        name="isSourceCode"
                                        checked={form.isSourceCode}
                                        onChange={updateField}
                                        className="h-4 w-4 accent-[var(--color-l-admin-accent)] dark:accent-[var(--color-d-admin-accent)]"
                                    />
                                    This link points to source code instead of a live site.
                                </label>

                                <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                                    <label className="flex flex-col gap-2">
                                        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-l-txt-subd-sec-def dark:text-d-txt-subd-prim-def">
                                            Project image
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/jpg,image/png"
                                            onChange={(event) => setSelectedImage(event.target.files?.[0] ?? null)}
                                            className="w-full rounded-[1.1rem] border border-dashed border-l-admin-line/60 bg-white/50 px-4 py-4 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-l-admin-accent file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.2em] file:text-white dark:border-d-admin-line/70 dark:bg-white/5 dark:file:bg-d-admin-accent dark:file:text-d-bg-def"
                                        />
                                        <span className="text-xs text-l-txt-subd-sec-def dark:text-d-txt-subd-prim-def">
                                            New projects require a JPG. Updates may also accept PNG files on the backend.
                                        </span>
                                    </label>

                                    <div className="overflow-hidden rounded-[1.6rem] border border-l-admin-line/45 bg-white/45 dark:border-d-admin-line/50 dark:bg-white/5">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Project preview" className="h-56 w-full object-cover" />
                                        ) : (
                                            <div className="flex h-56 items-center justify-center px-6 text-center text-sm text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                                                Upload an image to preview how the project will present in the public archive.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="rounded-full bg-l-admin-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:-translate-y-0.5 hover:bg-l-ic-prim-def disabled:cursor-not-allowed disabled:opacity-70 dark:bg-d-admin-accent dark:text-d-bg-def dark:hover:bg-d-ic-prim-def"
                                >
                                    {isSaving ? "Saving..." : selectedId === "new" ? "Create project" : "Update project"}
                                </button>
                            </form>
                        )}
                    </div>
                </AdminPanel>
            </div>
        </div>
    );
};

export default AdminProjectsPage;
