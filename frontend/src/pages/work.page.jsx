/**
 * Detailed view of a single work/project.
 * Displays project information including industry, date, description, features, and preview image.
 * @returns {JSX.Element} A page component showing detailed project information
 */
import InfoTag from "../components/InfoTag.component";
import IndustrySvg from "../assets/industry-icon.svg?react";
import CustomButton from "../components/CustomButton.component";
import CalendarSvg from "../assets/calendar.svg?react";
import WebsiteSvg from "../assets/website.svg?react";
import GitHubSvg from "../assets/github.svg?react";
import { getProject } from "../utils/api/project-api.util";
import { useLoaderData } from "react-router-dom";
import serverAddress from "../utils/api/server-address.util";

const WorkPage = () => {
    const project = useLoaderData();

    const handleWebsiteClick = () => {
        window.open(project.link, "_blank");
    };
    return (
        <main className="w-full h-full flex flex-col items-center justify-start gap-4 overflow-auto scrollbar scrollbar-w-1.5 scrollbar-h-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-l-ic-prim-def scrollbar-hover:scrollbar-thumb-l-ic-prim-hov dark:scrollbar-thumb-d-ic-prim-def dark:scrollbar-hover:scrollbar-thumb-d-ic-prim-hov">
            <div className="flex items-center flex-wrap sm:flex-nowrap gap-3 w-2/3 max-w-4xl">
                <InfoTag>
                    <IndustrySvg className="transition-colors *:stroke-l-txt-subd-sec-def dark:*:stroke-d-txt-subd-sec-def" />
                    {project.industry}
                </InfoTag>
                <InfoTag>
                    <CalendarSvg className="transition-colors *:stroke-l-txt-subd-sec-def dark:*:stroke-d-txt-subd-sec-def" />
                    {new Date(project.endDate).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                    })}
                </InfoTag>
            </div>
            <div className="flex flex-wrap md:flex-nowrap py-3 items-start gap-12 w-2/3 max-w-4xl">
                <div className="flex flex-col gap-2.5 sm:min-w-xs md:max-w-xs lg:max-w-md ">
                    <h1 className="text-3xl font-semibold text-l-txt-prim-def dark:text-d-txt-prim-def">
                        {project.title}
                    </h1>
                    <p className="whitespace-pre-line text-base font-normal text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                        {project.description}
                        <br />
                        <br />
                        <b>key features and technologies:</b>
                    </p>
                    <ul className="pl-4 list-disc list-outside whitespace-pre-line text-base font-normal text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                        {project.keyFeatures.map((feature) => (
                            <li key={feature}>{feature}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col items-start gap-6 min-w-0 flex-1 overflow-hidden">
                    <div className="max-w-md">
                        <img
                            src={`${serverAddress}${project.imageUrl}`}
                            alt="mockup"
                            className="min-w-lg rounded-lg"
                        />
                    </div>
                    <CustomButton
                        onClick={handleWebsiteClick}
                        addClass="hover:scale-105"
                        border
                        stretch
                        subdued
                    >
                        {project.isSourceCode ? (
                            <GitHubSvg className="transition-colors *:stroke-l-ic-prim-def dark:*:stroke-d-ic-prim-def" />
                        ) : (
                            <WebsiteSvg className="transition-colors *:stroke-l-ic-prim-def dark:*:stroke-d-ic-prim-def" />
                        )}
                        {project.isSourceCode
                            ? "explore the code"
                            : "explore the website"}
                    </CustomButton>
                </div>
            </div>
        </main>
    );
};

export default WorkPage;

export const loader = async ({ params }) => {
    const project = getProject(params.id);
    return project;
};
