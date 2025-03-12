/**
 * Displays personal information and contact options.
 * Includes downloadable resume, email contact, and call scheduling options.
 * @returns {JSX.Element}
 */
import CustomButton from "./CustomButton.component";
import DownloadSvg from "../assets/download.svg?react";
import EmailSvg from "../assets/email.svg?react";
import ScheduleSvg from "../assets/schedule.svg?react";
import SectionContainer from "./SectionContainer.component";
import { DataContext } from "../main";
import { useContext } from "react";
import serverAddress from "../utils/api/server-address.util";
const AboutMe = () => {
    const { myInfo } = useContext(DataContext);

    const handleDownloadResume = () => {
        window.open(`${serverAddress}/uploads/Esrom's Resume.pdf`, "_blank");
    };

    const handleEmailClick = () => {
        window.location.href = `mailto:${myInfo?.email}`;
    };

    const handleScheduleCall = () => {
        window.open("your-scheduling-link", "_blank");
    };

    return (
        <SectionContainer title="about" activeTitle="me">
            <p className="text-l-txt-subd-prim-def text-xl font-normal dark:text-d-txt-subd-prim-def">
                {myInfo?.aboutMe}
            </p>
            <div className="flex flex-wrap items-center p-4 gap-4 border-t border-t-l-bord-def">
                <CustomButton
                    onClick={handleDownloadResume}
                    addClass="hover:scale-105 hover:[&>*:first-child]:*:stroke-l-ic-prim-hov dark:hover:[&>*:first-child]:*:stroke-d-ic-prim-hov"
                    iconSizeClass="w-4"
                    ariaLabel="Download resume"
                >
                    <DownloadSvg className="*:stroke-l-ic-prim-def dark:*:stroke-d-ic-prim-def" />
                    download my_resume
                </CustomButton>
                <CustomButton
                    onClick={handleEmailClick}
                    addClass="hover:scale-105 ml-auto hover:[&>*:first-child]:*:stroke-l-ic-prim-hov dark:hover:[&>*:first-child]:*:stroke-d-ic-prim-hov"
                    iconSizeClass="w-5"
                    ariaLabel="Send email"
                >
                    <EmailSvg className="*:stroke-l-ic-prim-def dark:*:stroke-d-ic-prim-def" />
                    email_me
                </CustomButton>
                <CustomButton
                    onClick={handleScheduleCall}
                    addClass="hover:scale-105 hover:[&>*:first-child]:*:stroke-l-ic-prim-hov dark:hover:[&>*:first-child]:*:stroke-d-ic-prim-hov"
                    iconSizeClass="w-5"
                    ariaLabel="Schedule a call"
                >
                    <ScheduleSvg className="*:stroke-l-ic-prim-def dark:*:stroke-d-ic-prim-def" />
                    schedule a call
                </CustomButton>
            </div>
        </SectionContainer>
    );
};

export default AboutMe;
