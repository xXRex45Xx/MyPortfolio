/**
 * A reusable button component with customizable styling and theme support.
 * @param {Object} props
 * @param {Function} props.onClick - Click event handler
 * @param {string} props.addClass - Additional CSS classes
 * @param {React.ReactNode} props.children - Button content
 * @param {boolean} props.border - Whether to show border
 * @param {boolean} props.stretch - Whether to stretch full width
 * @param {boolean} props.subdued - Whether to use subdued text color
 * @returns {JSX.Element}
 */
import PropTypes from "prop-types";

const CustomButton = ({
    onClick,
    addClass = "",
    children,
    border = false,
    stretch = false,
    subdued = false,
    ariaLabel,
}) => (
    <button
        onClick={onClick}
        aria-label={ariaLabel}
        className={`cursor-pointer flex items-center gap-2 transition-transform ${
            subdued
                ? "text-l-txt-subd-prim-def hover:text-l-txt-subd-prim-hov dark:text-d-txt-subd-prim-def dark:hover:text-d-txt-subd-prim-hov"
                : "text-l-txt-prim-def hover:text-l-txt-prim-hov dark:text-d-txt-prim-def dark:hover:text-d-txt-prim-hov"
        } ${addClass} ${
            border ? "border border-l-bord-def rounded-lg p-2.5" : ""
        } ${stretch ? "self-stretch justify-center" : ""}
            `}
    >
        {children}
    </button>
);

CustomButton.propTypes = {
    onClick: PropTypes.func,
    addClass: PropTypes.string,
    children: PropTypes.node.isRequired,
    border: PropTypes.bool,
    stretch: PropTypes.bool,
    subdued: PropTypes.bool,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    ariaLabel: PropTypes.string,
};

export default CustomButton;
