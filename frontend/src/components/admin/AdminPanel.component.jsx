const AdminPanel = ({
    children,
    className = "",
    tone = "default",
}) => {
    const toneClass =
        tone === "accent"
            ? "border-l-admin-accent/35 bg-linear-to-br from-l-admin-panel-strong via-l-admin-panel to-l-bg-fill-def dark:border-d-admin-accent/35 dark:from-d-admin-panel-strong dark:via-d-admin-panel dark:to-d-bg-surf-prim-def"
            : "border-l-admin-line/55 bg-l-admin-panel/80 dark:border-d-admin-line/60 dark:bg-d-admin-panel/80";

    return (
        <section
            className={`rounded-[2rem] border shadow-[0_24px_80px_rgba(24,28,34,0.08)] backdrop-blur-sm ${toneClass} ${className}`}
        >
            {children}
        </section>
    );
};

export default AdminPanel;
