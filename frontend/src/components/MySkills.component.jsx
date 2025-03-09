/**
 * MySkills component displays a horizontally scrolling list of programming skills.
 * Features an infinite scroll animation that pauses on hover.
 * @returns {JSX.Element} A section containing an animated list of skills
 */
import SectionContainer from "./SectionContainer.component";

const MySkills = () => {
    const skills = [
        "Javascript",
        "Java",
        "C#",
        "Python",
        "C",
        "SQL",
        "HTML",
        "CSS",
        "TailwindCSS",
        "React",
        "ASP.NET Core",
        "Express.js",
        "NodeJs",
        "Git",
        "GitHub",
    ];

    return (
        <SectionContainer title="my" activeTitle="skillset">
            <div className="flex items-center w-full overflow-x-hidden hover:[&>*:first-child]:[animation-play-state:paused]">
                <ul className="flex items-center gap-3 self-stretch animate-inf-scroll">
                    {skills.map((s) => (
                        <li
                            key={s}
                            className="py-2 px-4 flex items-center justify-center border text-nowrap rounded-lg border-l-bord-def dark:border-d-bord-def text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def"
                        >
                            {s}
                        </li>
                    ))}
                    {skills.map((s) => (
                        <li
                            key={s}
                            className="py-2 px-4 flex items-center justify-center text-nowrap border rounded-lg border-l-bord-def dark:border-d-bord-def text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def"
                        >
                            {s}
                        </li>
                    ))}
                </ul>
            </div>
        </SectionContainer>
    );
};

export default MySkills;
