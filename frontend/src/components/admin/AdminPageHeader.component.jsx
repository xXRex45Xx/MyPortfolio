const AdminPageHeader = ({ eyebrow, title, description, aside = null }) => (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-l-admin-accent dark:text-d-admin-accent">
                {eyebrow}
            </p>
            <div className="space-y-2">
                <h1 className="font-display text-4xl leading-none text-l-admin-ink dark:text-d-admin-ink sm:text-5xl">
                    {title}
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def sm:text-base">
                    {description}
                </p>
            </div>
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
);

export default AdminPageHeader;
