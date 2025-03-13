/**
 * Footer component that displays social media links.
 * Links are separated by circle separator icons and open in new tabs.
 * @returns {JSX.Element} A footer with social media links
 */
import { useContext } from "react";
import separatorIcon from "../assets/circle-separator.svg";
import SocialLink from "./SocialLink.component";
import { DataContext } from "../main";

const Footer = () => {
    const { socialMediaLinks } = useContext(DataContext);

    return (
        <footer className="flex justify-center items-center gap-2.5">
            {socialMediaLinks.map((sml, idx) =>
                idx == socialMediaLinks.length - 1 ? (
                    <SocialLink key={sml.id} href={sml.link}>
                        {sml.platform}
                    </SocialLink>
                ) : (
                    <>
                        <SocialLink key={sml.id} href={sml.link}>
                            {sml.platform}
                        </SocialLink>
                        <img key={idx} src={separatorIcon} alt="separator" />
                    </>
                )
            )}
        </footer>
    );
};

export default Footer;
