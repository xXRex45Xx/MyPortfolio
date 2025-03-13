/**
 * Landing page component that serves as the main entry point of the portfolio website.
 * Displays the about section, skills, and portfolio works in a structured layout.
 * @returns {JSX.Element} Landing page component
 */
import AboutMe from "../components/AboutMe.component";
import MySkills from "../components/MySkills.component";
import MyWorks from "../components/MyWorks.component";

const LandingPage = () => (
    <main className="w-full h-full flex flex-col items-center justify-around gap-10 overflow-auto scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-l-ic-prim-def scrollbar-hover:scrollbar-thumb-l-ic-prim-hov dark:scrollbar-thumb-d-ic-prim-def dark:scrollbar-hover:scrollbar-thumb-d-ic-prim-hov">
        <AboutMe />
        <MySkills />
        <MyWorks />
    </main>
);

export default LandingPage;
