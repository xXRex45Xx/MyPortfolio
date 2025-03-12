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
import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import { LineWave } from "react-loader-spinner";
import serverAddress from "../utils/api/server-address.util";

const WorkPage = () => {
    const project = useLoaderData();

    const handleWebsiteClick = () => {
        window.open(project.link, "_blank");
    };
    return (
        <Suspense fallback={<HydrateFallback />}>
            <Await resolve={project}>
                <main className="w-full h-full flex flex-col items-center justify-start gap-4 overflow-auto">
                    <div className="flex items-center gap-3 w-2/3 max-w-4xl">
                        <InfoTag>
                            <IndustrySvg className="transition-colors *:stroke-l-txt-subd-sec-def dark:*:stroke-d-txt-subd-sec-def" />
                            {project.industry}
                        </InfoTag>
                        <InfoTag>
                            <CalendarSvg className="transition-colors *:stroke-l-txt-subd-sec-def dark:*:stroke-d-txt-subd-sec-def" />
                            {new Date(project.endDate).toLocaleDateString(
                                "en-US",
                                {
                                    month: "long",
                                    year: "numeric",
                                }
                            )}
                        </InfoTag>
                    </div>
                    <div className="flex py-3 items-start gap-12 w-2/3 max-w-4xl">
                        <div className="flex flex-col gap-2.5 w-1/2">
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
                        <div className="flex flex-col items-start gap-6 flex-1">
                            <div className="max-w-md overflow-hidden">
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
            </Await>
        </Suspense>
    );
};

export default WorkPage;

export const loader = async ({ params }) => {
    const project = getProject(params.id);
    return project;
};

export const HydrateFallback = () => {
    return (
        <div className={`w-full h-full flex items-center justify-center`}>
            <LineWave
                wrapperClass="[&>*:first-child]:[&>*]:fill-l-ic-prim-def dark:[&>*:first-child]:[&>*]:fill-d-ic-prim-def"
                height={160}
                width={160}
            />
        </div>
    );
};
