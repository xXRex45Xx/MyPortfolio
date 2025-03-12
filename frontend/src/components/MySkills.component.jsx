/**
 * MySkills component displays a horizontally scrolling list of programming skills.
 * Features an infinite scroll animation that pauses on hover.
 * @returns {JSX.Element} A section containing an animated list of skills
 */
import SectionContainer from "./SectionContainer.component";
import { DataContext } from "../main";
import { useContext } from "react";

const MySkills = () => {
    const { skills } = useContext(DataContext);

    return (
        <SectionContainer title="my" activeTitle="skillset">
            <div className="flex items-center w-full overflow-x-hidden hover:[&>*:first-child]:[animation-play-state:paused]">
                <ul className="flex items-center gap-3 self-stretch animate-inf-scroll">
                    {skills.map(({ id, name }) => (
                        <li
                            key={id}
                            className="py-2 px-4 flex items-center justify-center border text-nowrap rounded-lg border-l-bord-def dark:border-d-bord-def text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def"
                        >
                            {name}
                        </li>
                    ))}
                    {skills.map(({ id, name }) => (
                        <li
                            key={id}
                            className="py-2 px-4 flex items-center justify-center text-nowrap border rounded-lg border-l-bord-def dark:border-d-bord-def text-l-txt-subd-prim-def dark:text-d-txt-subd-prim-def"
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
        </SectionContainer>
    );
};

export default MySkills;
