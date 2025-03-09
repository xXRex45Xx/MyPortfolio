/**
 * Footer component that displays social media links.
 * Links are separated by circle separator icons and open in new tabs.
 * @returns {JSX.Element} A footer with social media links
 */
import CircleSeparatorSvg from "../assets/circle-separator.svg?react";
import SocialLink from "./SocialLink.component";

const Footer = () => (
    <footer className="flex justify-center items-center gap-2.5">
        <SocialLink href="https://www.linkedin.com/in/esrom-tadesse-058978269">
            LinkedIn
        </SocialLink>
        <CircleSeparatorSvg />
        <SocialLink href="https://www.instagram.com/esrom_mulugeta_t/">
            Instagram
        </SocialLink>
        <CircleSeparatorSvg />
        <SocialLink href="https://github.com/xXRex45Xx">GitHub</SocialLink>
    </footer>
);

export default Footer;
