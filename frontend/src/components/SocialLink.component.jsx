/**
 * A styled link component for social media links.
 * Features hover effects and opens in a new tab.
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be displayed in the link
 * @param {string} props.href - The URL the link points to
 * @returns {JSX.Element} An anchor tag with consistent styling for social links
 */
import PropTypes from "prop-types";

const SocialLink = ({ children, href }) => (
    <a
        className="transition cursor-pointer text-sm font-semibold text-l-txt-subd-sec-def hover:text-l-txt-subd-sec-hov hover:scale-110 dark:text-d-txt-subd-sec-def dark:hover:text-d-txt-subd-sec-hov"
        target="_blank"
        href={href}
    >
        {children}
    </a>
);

SocialLink.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
};

export default SocialLink;
