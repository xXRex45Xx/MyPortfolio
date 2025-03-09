/**
 * Detailed view of a single work/project.
 * Displays project information including industry, date, description, features, and preview image.
 * @returns {JSX.Element} A page component showing detailed project information
 */
import InfoTag from "../components/InfoTag.component";
import IndustrySvg from "../assets/industry-icon.svg?react";
import CustomButton from "../components/CustomButton.component";
import CalendarSvg from "../assets/calendar.svg?react";
import mockupImg from "../assets/mockup.png";
import WebsiteSvg from "../assets/website.svg?react";
const WorkPage = () => (
    <main className="w-full h-full flex flex-col items-center justify-start gap-4 overflow-auto">
        <div className="flex items-center gap-3 w-2/3 max-w-4xl">
            <InfoTag>
                <IndustrySvg className="transition-colors *:stroke-l-txt-subd-sec-def dark:*:stroke-d-txt-subd-sec-def" />
                industry_name
            </InfoTag>
            <InfoTag>
                <CalendarSvg className="transition-colors *:stroke-l-txt-subd-sec-def dark:*:stroke-d-txt-subd-sec-def" />
                month year
            </InfoTag>
        </div>
        <div className="flex py-3 items-start gap-12 w-2/3 max-w-4xl">
            <div className="flex flex-col gap-2.5 w-1/2">
                <h1 className="text-3xl font-semibold text-l-txt-prim-def dark:text-d-txt-prim-def">
                    project_name #1
                </h1>
                <p className="whitespace-pre-line text-base font-normal text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def">
                    {`lorem ipsum dolor sit amet consectetur. tristique in in tellus vehicula rhoncus nibh eget ut. id augue blandit laoreet nunc. senectus pulvinar hendrerit posuere eget iaculis a vulputate volutpat.
                    
                    dignissim turpis justo euismod lacus tincidunt eget. hendrerit dapibus eu amet tempus. gravida mauris diam scelerisque sed semper in in. sit vitae sed et malesuada rhoncus urna velit dictum sit. fringilla adipiscing potenti pellentesque malesuada ultrices mauris tincidunt.
                    
                    tincidunt ac nisi tristique fermentum libero. at amet quisque parturient nulla congue convallis.\n\n`}
                    <b>key features and technologies:</b>
                    <ul className="list-disc list-outside">
                        <li>
                            cras a amet dui placerat sapien eleifend lectus
                            velit. porttitor feugiat enim neque duis nunc in
                            quis. non ac vitae diam tortor. feugiat nisl risus
                            quam ut quis sed.
                        </li>
                        <li>
                            commodo turpis in porttitor dolor risus pulvinar
                            non. nunc vitae nunc leo mauris enim id eget id sit.
                        </li>
                        <li>
                            mauris mattis nulla pharetra at ullamcorper congue.
                            vel sed neque egestas iaculis lectus.
                        </li>

                        <li>
                            amet egestas id sed nibh imperdiet molestie donec
                            malesuada pharetra. eros non aliquet ac dis aliquam
                            pellentesque eget rhoncus.
                        </li>
                        <li>
                            volutpat consequat sit nunc est aliquam sit
                            consectetur.
                        </li>
                        <li>
                            nisl pharetra sit pellentesque nibh. placerat
                            bibendum malesuada tellus at elit tortor. in ut
                            ultrices hendrerit viverra cras aliquam ut id.
                        </li>
                    </ul>
                    vitae tellus ut et metus donec leo sit. sapien id sed odio
                    urna. eget lorem habitant in elit fermentum quis risus.
                </p>
            </div>
            <div className="flex flex-col items-start gap-6 flex-1">
                <div className="max-w-md overflow-hidden">
                    <img src={mockupImg} alt="mockup" className="min-w-lg" />
                </div>
                <CustomButton addClass="hover:scale-105" border stretch subdued>
                    <WebsiteSvg className="transition-colors *:stroke-l-ic-prim-def dark:*:stroke-d-ic-prim-def" />
                    explore the website
                </CustomButton>
            </div>
        </div>
    </main>
);

export default WorkPage;
