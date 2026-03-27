const inputClasses =
    "w-full rounded-[1.1rem] border border-l-admin-line/60 bg-white/70 px-4 py-3 text-sm text-l-admin-ink outline-hidden transition placeholder:text-l-txt-subd-sec-def focus:border-l-admin-accent focus:ring-2 focus:ring-l-admin-accent/15 dark:border-d-admin-line/70 dark:bg-white/5 dark:text-d-admin-ink dark:placeholder:text-d-txt-subd-prim-def dark:focus:border-d-admin-accent dark:focus:ring-d-admin-accent/15";

export const AdminField = ({
    label,
    hint,
    className = "",
    inputClassName = "",
    ...props
}) => (
    <label className={`flex flex-col gap-2 ${className}`}>
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-l-txt-subd-sec-def dark:text-d-txt-subd-prim-def">
            {label}
        </span>
        <input className={`${inputClasses} ${inputClassName}`} {...props} />
        {hint ? (
            <span className="text-xs text-l-txt-subd-sec-def dark:text-d-txt-subd-prim-def">
                {hint}
            </span>
        ) : null}
    </label>
);

export const AdminTextarea = ({
    label,
    hint,
    className = "",
    inputClassName = "",
    ...props
}) => (
    <label className={`flex flex-col gap-2 ${className}`}>
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-l-txt-subd-sec-def dark:text-d-txt-subd-prim-def">
            {label}
        </span>
        <textarea
            className={`${inputClasses} min-h-32 resize-y ${inputClassName}`}
            {...props}
        />
        {hint ? (
            <span className="text-xs text-l-txt-subd-sec-def dark:text-d-txt-subd-prim-def">
                {hint}
            </span>
        ) : null}
    </label>
);

export default AdminField;
