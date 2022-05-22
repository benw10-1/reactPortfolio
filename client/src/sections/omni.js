import { AboutMe, Connect, Landing, Projects, Resume } from "./index"

function Omni({ page }) {
    switch(page) {
        case "About Me":
            return <AboutMe/>;
        case "Connect":
            return <Connect/>;
        case "Intro":
            return <Landing/>;
        case "Resume":
            return <Resume/>;
        case "Projects":
            return <Projects/>;
        default:
            return <div>what?</div>
    }
}

export default Omni