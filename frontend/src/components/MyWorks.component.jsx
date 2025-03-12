import mockup from "../assets/mockup.png";
import SectionContainer from "./SectionContainer.component";
import Work from "./Work.component";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../main";
import { useContext } from "react";
import serverAddress from "../utils/api/server-address.util";

const MyWorks = () => {
    const { projects } = useContext(DataContext);

    const navigate = useNavigate();

    return (
        <SectionContainer title="discover some of" activeTitle="my works">
            <div className="flex items-center w-full overflow-x-hidden hover:[&>*:first-child]:[animation-play-state:paused]">
                <ul className="flex py-2 items-center gap-6 self-stretch animate-inf-work-scroll">
                    {[...projects, ...projects].map(
                        ({ id, title, shortDescription, imageUrl }, index) => (
                            <Work
                                key={`${id}-${index}`}
                                title={title}
                                imgSrc={`${serverAddress}/${imageUrl}`}
                                description={shortDescription}
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
