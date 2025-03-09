/**
 * A container component for sections with a styled title.
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be rendered inside the container
 * @param {string} props.title - The main title text
 * @param {string} props.activeTitle - The highlighted portion of the title
 * @returns {JSX.Element} A section container with styled title and content
 */
import PropTypes from "prop-types";

const SectionContainer = ({ children, title, activeTitle }) => (
    <div className="flex flex-col w-2/3 p-2 gap-5 max-w-4xl">
        <h2 className="text-l-txt-prim-def text-3xl font-semibold dark:text-d-txt-prim-def">
            {title}{" "}
            <span className="text-l-txt-prim-act dark:text-d-txt-prim-act">
                {activeTitle}
            </span>{" "}
            ...
        </h2>
        {children}
    </div>
);

SectionContainer.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    activeTitle: PropTypes.string.isRequired,
};

export default SectionContainer;
