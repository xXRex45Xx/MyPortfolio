/**
 * Header component that displays user information and theme toggle.
 * Includes profile picture, name, description, and a theme switch button.
 * @param {Object} props - Component props
 * @param {boolean} props.isDark - Current theme state
 * @param {Function} props.onThemeChange - Callback function to toggle theme
 * @returns {JSX.Element} Header component
 */
import myPic from "../assets/image.jpg";
import MoonSvg from "../assets/moon.svg?react";
import SunSvg from "../assets/sun.svg?react";
import CustomButton from "../components/CustomButton.component";
import PropTypes from "prop-types";

const Header = ({ isDark, onThemeChange }) => {
    return (
        <header className="flex justify-center pt-5 w-full" role="banner">
            <nav
                className="flex w-2/3 max-w-4xl justify-between"
                role="navigation"
            >
                <div className="flex gap-2.5 items-center justify-center">
                    <img
                        className="w-11 border-2 rounded-full border-l-ic-prim-def dark:border-d-ic-prim-def"
                        src={myPic}
                        alt="Profile picture of Esrom Tadesse"
                    />
                    <div className="flex flex-col items-start">
                        <h1 className="text-l-txt-prim-def text-lg font-semibold dark:text-d-txt-prim-def">
                            esrom_tadesse
                        </h1>
                        <p className="text-l-txt-subd-sec-def text-sm font-normal dark:text-d-txt-subd-prim-def">
                            software engineer with an interest in cyber-security
                            and data science
                        </p>
                    </div>
                </div>
                <CustomButton
                    addClass="hover:scale-110 transition"
                    onClick={onThemeChange}
                    iconSizeClass="w-6"
                    aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
                >
                    {isDark ? (
                        <MoonSvg
                            className="transition-color *:stroke-d-ic-prim-def hover:*:stroke-d-ic-prim-hov"
                            aria-hidden="true"
                            role="img"
                        />
                    ) : (
                        <SunSvg
                            className="transition-color *:stroke-l-ic-prim-def hover:*:stroke-l-ic-prim-hov"
                            aria-hidden="true"
                            role="img"
                        />
                    )}
                </CustomButton>
            </nav>
        </header>
    );
};

Header.propTypes = {
    isDark: PropTypes.bool.isRequired,
    onThemeChange: PropTypes.func.isRequired,
};

export default Header;
