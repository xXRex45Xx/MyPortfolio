const toneClasses = {
    error: "border-red-500/35 bg-red-500/8 text-red-900 dark:text-red-200",
    success:
        "border-emerald-500/35 bg-emerald-500/8 text-emerald-900 dark:text-emerald-200",
    info: "border-l-admin-accent/30 bg-l-admin-accent/8 text-l-admin-ink dark:border-d-admin-accent/30 dark:bg-d-admin-accent/10 dark:text-d-admin-ink",
};

const AdminNotice = ({ message, tone = "info" }) => {
    if (!message) {
        return null;
    }

    return (
        <div
            className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${toneClasses[tone]}`}
        >
            {message}
        </div>
    );
};

export default AdminNotice;
