import mockup from "../assets/mockup.png";
import SectionContainer from "./SectionContainer.component";
import Work from "./Work.component";
import { useNavigate } from "react-router-dom";
const MyWorks = () => {
    const works = [
        {
            id: 1,
            title: "project title #1",
            imgSrc: mockup,
            description:
                "lorem ipsum dolor sit amet consectetur. turpis at morbi dui et morbi amet consequat diam accumsan. luctus volutpat non nunc lorem velit viverra est lacinia.",
        },
        {
            id: 2,
            title: "project title #2",
            imgSrc: mockup,
            description:
                "lorem ipsum dolor sit amet consectetur. turpis at morbi dui et morbi amet consequat diam accumsan. luctus volutpat non nunc lorem velit viverra est lacinia.",
        },
        {
            id: 3,
            title: "project title #3",
            imgSrc: mockup,
            description:
                "lorem ipsum dolor sit amet consectetur. turpis at morbi dui et morbi amet consequat diam accumsan. luctus volutpat non nunc lorem velit viverra est lacinia.",
        },
        {
            id: 4,
            title: "project title #4",
            imgSrc: mockup,
            description:
                "lorem ipsum dolor sit amet consectetur. turpis at morbi dui et morbi amet consequat diam accumsan. luctus volutpat non nunc lorem velit viverra est lacinia.",
        },
    ];

    const navigate = useNavigate();

    return (
        <SectionContainer title="discover some of" activeTitle="my works">
            <div className="flex items-center w-full overflow-x-hidden hover:[&>*:first-child]:[animation-play-state:paused]">
                <ul className="flex py-2 items-center gap-6 self-stretch animate-inf-work-scroll">
                    {[...works, ...works].map(
                        ({ id, title, imgSrc, description }, index) => (
                            <Work
                                key={`${id}-${index}`}
                                title={title}
                                imgSrc={imgSrc}
                                description={description}
                                onClick={() => navigate(`/mywork/${id}`)}
                            />
                        )
                    )}
                </ul>
            </div>
        </SectionContainer>
    );
};

export default MyWorks;
