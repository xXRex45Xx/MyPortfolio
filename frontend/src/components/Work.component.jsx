/**
 * Displays a single work/project item with image and description.
 * @param {Object} props
 * @param {string} props.title - Project title
 * @param {string} props.imgSrc - Project image URL
 * @param {string} props.description - Project description
 * @param {Function} props.onClick - Click handler for project selection
 * @returns {JSX.Element}
 */
import PropTypes from "prop-types";

const Work = ({ title, imgSrc, description, onClick }) => (
    <li className="transition-transform flex flex-col gap-4 w-60">
        <button
            onClick={onClick}
            className="text-left w-full cursor-pointer hover:scale-105"
            aria-label={`View ${title} project details`}
        >
            <div className="transition-colors max-h-40 flex flex-col gap-9 pl-2.5 pt-2.5 self-stretch overflow-hidden border rounded-lg border-l-bord-def bg-l-bg-fill-def dark:border-d-bord-def dark:bg-d-bg-fill-def">
                <h3 className="font-semibold text-l-txt-prim-def dark:text-d-txt-prim-def">
                    {title}
                </h3>
                <img
                    className="rotate-[10deg]"
                    src={imgSrc}
                    alt={`${title} project preview`}
                    loading="lazy"
                />
            </div>
            <p className="text-base text-l-txt-subd-sec-def dark:text-d-txt-subd-sec-def">
                {description}
            </p>
        </button>
    </li>
);

Work.propTypes = {
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Work;
