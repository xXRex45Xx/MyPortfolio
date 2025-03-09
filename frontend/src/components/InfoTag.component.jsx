/**
 * A component for displaying tagged information with consistent styling.
 * Used for displaying labels, categories, or status information.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Tag content
 * @returns {JSX.Element}
 */
import PropTypes from "prop-types";

const InfoTag = ({ children }) => (
    <div
        className="py-2 px-4 gap-2 text-l-txt-subd-prim-def text-base font-normal flex justify-center items-center border border-l-bord-def rounded-lg dark:text-d-txt-subd-prim-def dark:border-d-bord-def"
        role="status"
    >
        {children}
    </div>
);

InfoTag.propTypes = {
    children: PropTypes.node.isRequired,
};

export default InfoTag;
